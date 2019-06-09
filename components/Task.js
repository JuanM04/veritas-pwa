import React from 'react'
import TaskBadge from 'components/TaskBadge'
import moment from 'moment'
import { ListGroupItem } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default props => {
  const { task, setModalData } = props
  const now = moment(new Date())
  const date = moment(task.date)
  let relativeDate = date.fromNow()
  if(date.diff(now, 'days') === 0) relativeDate = 'hoy'
  if(date.diff(now, 'days') === 1) relativeDate = 'mañana'

  let content = {}

  switch (task.type) {
    case 'EXAM':
      content = { prefix: 'Examen de', data: task.subject.name }
      break
    case 'HOMEWORK':
      content = { prefix: 'Tarea de', data: task.subject.name }
      break
    case 'MISSING':
      content = { prefix: 'Falta', data: task.professor.last_name }
      break
    case 'OTHER':
      content = { prefix: null, data: task.title }
      break
    default:
      break
  }

  return(
    <ListGroupItem onClick={() => setModalData(task)} >
      {content.prefix} {task.subject ? <FontAwesomeIcon icon={task.subject.icon} color={task.subject.color} /> : ''} {content.data}
      {''} <span style={{ fontWeight: 'bold' }}>{relativeDate}</span>
      {''} <TaskBadge type={task.type} />
    </ListGroupItem>
  )
}