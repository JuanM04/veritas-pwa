import React from 'react'
import { Container } from 'shards-react'
import Tabs from 'components/tabs'



export default props => (
  <>
    <Container>
      {props.children}
    </Container>
    <Tabs current={props.currentTab} />
  </>
)