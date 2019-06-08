import React from 'react'
import Base from 'components/Base'

import { redirectIfNotLoggedIn } from 'utils'

const Tasks = props => {
  return (
    <Base currentTab={1}>
      <h1>Tareas</h1>
    </Base>
  )
}



Tasks.getInitialProps = async ctx => {
  await redirectIfNotLoggedIn(ctx)
}



export default Tasks