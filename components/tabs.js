import React from 'react'
import Link from 'next/link'
import { Container, Col, Row } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tabs as TABS } from 'utils/metadata'



export default props => (
  <footer className="with-shadows">
    <Container>
      <Row>
        {TABS.map((tab, i) => (
          <Link key={i} href={tab.path} prefetch={props.current === i}>
            <Col key={i} className={'tab' + (props.current === i ? ' current' : '')}>
              <FontAwesomeIcon icon={tab.icon} size="lg" />
              <br/>
              <span>{tab.name}</span>
            </Col>
          </Link>
        ))}
      </Row>
    </Container>
  </footer>
)