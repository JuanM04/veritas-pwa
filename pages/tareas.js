import React from 'react'
import Router from 'next/router'
import Base from 'components/Base'

import { checkTokenClient, setTokenClient } from 'utils'
import { security } from 'utils/metadata'

const Tasks = props => {
  if(props.token) setTokenClient(props.token)
  
  return (
    <Base currentTab={1}>
      <h1>Tareas</h1>
    </Base>
  )
}



Tasks.getInitialProps = async ctx => {
  if(typeof window !== 'undefined') return

  const token = await checkTokenClient(ctx)
  if(!token) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: security.pages.safeRedirect })
      ctx.res.end()
    }
    else Router.push(security.pages.safeRedirect)
  } else {
    return { token }
  }
}



export default Tasks