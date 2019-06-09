import React, { useState, useEffect } from 'react'
import Base from 'components/Base'
import Task from 'components/Task'
import TaskModal from 'components/TaskModal'
import nookies from 'nookies'
import fetch from 'isomorphic-unfetch'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { Alert, Button, Container, ListGroup } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { redirectIfNotLoggedIn, formatTasks } from 'utils'

const Tasks = props => {
  const [tasks, setTasks] = useState(false)
  const [modalData, setModalData] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  const getTasks = async () => {
    const cookies = nookies.get()

    let res
    if(navigator.onLine) {
      const response = await fetch('/api/get-tasks', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: cookies.token, group: cookies.group })
      })
      res = await response.json()
      localStorage.setItem('tasks', JSON.stringify(res))
    } else {
      res = JSON.parse(localStorage.getItem('tasks'))
    }
    
    setTasks(formatTasks(res))
  }


  useEffect(() => {
    if(typeof window === 'undefined') return
    getTasks()

    setIsOnline(navigator.onLine)
    window.addEventListener('online', () => setIsOnline(true))
    window.addEventListener('offline', () => setIsOnline(false))
  }, [])




  if(!tasks) return <Base currentTab={1}><Container className="center"><span className="spinner-grow" role="status"></span></Container></Base>

  return (
    <Base currentTab={1}>
      <ListGroup className="tasks" flush>
        {
          isOnline
          ?
          <Button
            theme="success" pill className="tasks-add"
            onClick={() => setModalData({ createTask: true })}
          >
            <FontAwesomeIcon icon="plus" />
          </Button>
          :
          <Alert theme="warning" className="tasks-alert">
            Última vez en línea: <span className="time">{moment(props.tokenPayload.lastOnline).fromNow()}</span>
          </Alert>
        }

        {
          tasks.length >= 1
          ?
          tasks.map(task => <Task key={task.id} task={task} setModalData={setModalData} />)
          :
          <span className="empty">No hay tareas</span>
        }
      </ListGroup>
      <TaskModal data={modalData} setData={setModalData} setTasks={setTasks} isOnline={isOnline} />
    </Base>
  )
}



Tasks.getInitialProps = async ctx => {
  await redirectIfNotLoggedIn(ctx)

  const cookies = nookies.get(ctx)
  return { tokenPayload: await jwt.decode(cookies.token) }
}



export default Tasks