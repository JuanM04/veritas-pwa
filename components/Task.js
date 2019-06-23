import React from 'react'
import moment from 'moment'
import { ListGroupItem } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { taskTypes } from 'utils/metadata'



export default props => {
  const { task, setModalData } = props
  const now = moment().startOf('day')
  const date = moment(task.date)
  let relativeDate = date.from(now)
  if(date.diff(now, 'days') === 0) relativeDate = 'hoy'
  if(date.diff(now, 'days') === 1) relativeDate = 'mañana'

  let data = ''

  switch (task.type) {
    case 'EXAM':
      data = task.subject.name
      break
    case 'HOMEWORK':
      data = task.subject.name
      break
    case 'MISSING':
      data = task.professor.last_name
      break
    case 'OTHER':
      data = task.title
      break
    default:
      break
  }

  return(
    <ListGroupItem
      onClick={() => setModalData(task)}
      className={`task ${taskTypes[task.type].theme}`}
    >
      {task.subject ? <FontAwesomeIcon icon={task.subject.icon} color={task.subject.color} /> : ''} {data}
      {' '}
      <span className="date" >{relativeDate}</span>
    </ListGroupItem>
  )
}