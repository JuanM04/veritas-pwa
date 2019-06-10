import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormInput,
  InputGroup,
  InputGroupAddon
} from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { checkTokenClient, setInitialSettings } from 'utils'
import { security } from 'utils/metadata'



const Login = props => {
  const [password, setPassword] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [invalid, setInvalid] = useState(false)

  
  const handleChange = e => {
    if(invalid) setInvalid(false)
    setPassword(e.target.value)
  }

  const checkPassword = async () => {
    setWaiting(true)
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    const res = await response.json()
    
    if(res.token) {
      setInitialSettings({}, res.token, () => Router.push(security.pages.redirectWhenLogged))
    } else {
      setWaiting(false)
      setInvalid(true)
    }
  }

  useEffect(() => {
    const func = async () => {
      const { token } = await nookies.get()
      if(!token) return
      setWaiting(true)
  
      let res = {}
      if(navigator.onLine) {
        const response = await fetch('/api/check-token', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })
        res = await response.json()
      } else {
        const payload = await jwt.decode(token)
        if(payload) {
          const diff = moment().diff(moment(payload.lastOnline), 'days')
          if(diff <= 7 && diff >= 0) res.token = token
        }
      }
  
      if(res.token) setInitialSettings({}, res.token, () => Router.push(security.pages.redirectWhenLogged))
      else setWaiting(false)
    }
    func()
  }, [])



  return(
    <Container className="center login">
      <Card>
        <CardHeader>Acceder</CardHeader>
        <CardBody>
          <InputGroup>
            <FormInput
              placeholder="Clave de Acceso"
              type="password"
              value={password}
              onChange={handleChange}
              invalid={invalid}
              disabled={waiting}
              onKeyPress={e => { if(e.which === 13 || e.keyCode === 13) checkPassword() }}
            />
            <InputGroupAddon type="append">
              <Button
                onClick={checkPassword}
                disabled={waiting}
              >
                {
                  waiting
                  ?
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  :
                    <FontAwesomeIcon icon="check-circle" />
                }
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </CardBody>
      </Card>
    </Container>
  )
}

Login.getInitialProps = async ctx => {
  if(typeof window !== 'undefined') return
  
  const token = await checkTokenClient(ctx)
  if(token) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: security.pages.redirectWhenLogged })
      ctx.res.end()
    }
    else Router.push(security.pages.redirectWhenLogged)
  }
}



export default Login