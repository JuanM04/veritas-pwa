import React, { useState } from 'react'
import nookies from 'nookies'
import Router from 'next/router'
import Base from 'components/Base'
import { Container, Button, FormSelect, Row } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { redirectIfNotLoggedIn } from 'utils'
import { security } from 'utils/metadata'

const Settings = props => {
  const [currentGroup, setCurrentGroup] = useState(props.group)

  const handleGroups = e => {
    nookies.set({}, 'group', e.target.value, { path: '/' })
    setCurrentGroup(e.target.value)
  }

  const logOut = () => {
    nookies.destroy({}, 'token')
    Router.push(security.pages.safeRedirect)
  }

  
  
  return (
    <Base currentTab={2}>
      <Container className="center settings">
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

  return { group: cookies.group }
}



export default Settings