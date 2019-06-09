import React from 'react'
import { Badge } from 'shards-react'



export default ({ type }) => {
  let content = {}

  switch (type) {
    case 'EXAM':
      content = { theme: 'danger', text: 'examen' }
      break
    case 'HOMEWORK':
      content = { theme: 'warning', text: 'tarea' }
      break
    case 'MISSING':
      content = { theme: 'success', text: 'falta' }
      break
    case 'OTHER':
      content = { theme: 'primary', text: 'otro' }
      break
    default:
      break
  }

  return <Badge theme={content.theme}>{content.text}</Badge>
}