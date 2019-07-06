import React from 'react'
import moment from 'moment'
import { ListGroupItem } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { taskTypes } from 'utils/metadata'



export default props => {
  const { task, setModalData } = props
  const relativeDate = getRelativeDate(task.date)
  const relativeEndDate = task.endDate ? getRelativeDate(task.endDate) : false

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
      {task.subject && <FontAwesomeIcon icon={task.subject.icon} color={task.subject.color} />} {data}
      {' '}
      {
        relativeEndDate
        ?
        <span className="date">
          {relativeDate} <span>y termina</span> {relativeEndDate}
        </span>
        :
        <span className="date">{relativeDate}</span>
      }
    </ListGroupItem>
  )
}



const getRelativeDate = date => {
  const now = moment().startOf('day')
  const momentDate = moment(date)
  let relativeDate = momentDate.from(now)
  if(momentDate.diff(now, 'days') === 0) relativeDate = 'hoy'
  if(momentDate.diff(now, 'days') === 1) relativeDate = 'mañana'

  return relativeDate
}