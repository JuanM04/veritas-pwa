import React from 'react'
import { Container } from 'shards-react'
import Tabs from 'components/Tabs'



export default props => (
  <>
    <Container className="main">
      {props.children}
    </Container>
    <Tabs current={props.currentTab} />
  </>
)