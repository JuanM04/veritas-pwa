import React from 'react'
import Router from 'next/router'
import { Container, Col, Row } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tabs as TABS } from 'utils/metadata'



export default props => {
  const redirect = i => {
    if(props.current !== i) Router.push(TABS[i].path)
  }

  return(
    <footer className="with-shadows">
      <Container>
        <Row>
          {TABS.map((tab, i) => (
            <Col
              key={i}
              className={'tab' + (props.current === i ? ' current' : '')}
              onClick={() => redirect(i)}
            >
              <FontAwesomeIcon icon={tab.icon} size="lg" />
              <br/>
              <span>{tab.name}</span>
            </Col>
          ))}
        </Row>
      </Container>
    </footer>
  )
}