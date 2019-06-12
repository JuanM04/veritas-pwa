import React, { useState } from 'react'
import nookies from 'nookies'
import Router from 'next/router'
import Base from 'components/Base'
import { Container, Button, FormCheckbox, FormSelect, Row } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { redirectIfNotLoggedIn } from 'utils'
import { security, cookies as cookiesData } from 'utils/metadata'

const Settings = props => {
  const { cookies } = props
  const [currentGroup, setCurrentGroup] = useState(cookies.group)

  const handleGroups = e => {
    nookies.set({}, 'group', e.target.value, cookiesData)
    setCurrentGroup(e.target.value)
  }

  const logOut = () => {
    nookies.destroy({}, 'token')
    Router.push(security.pages.safeRedirect)
  }

  
  
  return (
    <Base currentTab={2}>
      <Container className="center settings">
        {/* Group */}
        <Row>
          <FormSelect
            value={currentGroup}
            onChange={handleGroups}
          >
            <option value="2">Grupo 2</option>
            <option value="3">Grupo 3</option>
            <option value="7">Grupo 7</option>
          </FormSelect>
        </Row>
        {/* Dark Mode */}
        <Row>
          <FormCheckbox
            checked={props.darkMode}
            onChange={() => {
              if(props.darkMode) nookies.destroy({}, 'dark')
              else nookies.set({}, 'dark', true, cookiesData)
              props.handleDarkMode()
            }}
          >
            Modo Oscuro
          </FormCheckbox>
        </Row>

        {/* Log Out */}
        <Row>
          <Button outline theme="danger" onClick={logOut}>
            <FontAwesomeIcon icon="sign-out-alt" /> Salir
          </Button>
        </Row>
      </Container>
    </Base>
  )
}



Settings.getInitialProps = async ctx => {
  await redirectIfNotLoggedIn(ctx)

  const cookies = nookies.get(ctx)

  return { cookies }
}



export default Settings
