import React from 'react'
import Link from 'next/link'
import {
  Container,
  Col,
  Row,
} from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tabs } from 'utils/metadata'



export default props => (
  <footer className="with-shadows">
    <Container>
      <Row>
        {tabs.map((tab, i) => (
          <Link key={i} href={tab.path} prefetch>
            <Col
              key={i}
              className={'tab' + (props.current === i ? ' current' : '')}
            >
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