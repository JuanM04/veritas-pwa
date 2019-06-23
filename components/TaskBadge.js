import React from 'react'
import { Badge } from 'shards-react'

import { taskTypes } from 'utils/metadata'



export default ({ type }) => {
  const content = taskTypes[type]

  return <Badge theme={content.theme}>{content.text}</Badge>
}