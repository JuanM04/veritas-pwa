import React, { useState, useEffect } from 'react'
import Base from 'components/Base'
import Task from 'components/Task'
import TaskModal from 'components/TaskModal'
import nookies from 'nookies'
import fetch from 'isomorphic-unfetch'
import { Button, Container, ListGroup } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { redirectIfNotLoggedIn } from 'utils'
import STATIC_DATA from 'utils/static-data.json'

const Tasks = props => {
  const [tasks, setTasks] = useState(false)
  const [modalData, setModalData] = useState(false)

  useEffect(() => {
    if(typeof window === 'undefined') return

    const func = async () => {
      const cookies = nookies.get()
      const response = await fetch('/api/get-tasks', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: cookies.token, group: cookies.group })
      })
      const res = await response.json()

      const formattedTasks = res.map(task => {
        if(task.subject) task.subject = STATIC_DATA.subjects.find(subject => subject.id === task.subject)
        if(task.professor) task.professor = STATIC_DATA.professors.find(professor => professor.id === task.professor)

        return task
      })
  
      setTasks(formattedTasks)
    }
    func()
  }, [])

  if(!tasks) return <Base currentTab={1}><Container className="center"><span className="spinner-grow" role="status"></span></Container></Base>

  return (
    <Base currentTab={1}>
      <ListGroup className="tasks" flush>
        <Button
          theme="success" pill className="tasks-add"
          onClick={() => setModalData({ createTask: true })}
        >
          <FontAwesomeIcon icon="plus" />
        </Button>
        {
          tasks.map(task => <Task key={task.id} task={task} setModalData={setModalData} />)
        }
      </ListGroup>
      <TaskModal data={modalData} setData={setModalData} />
    </Base>
  )
}



Tasks.getInitialProps = async ctx => {
  await redirectIfNotLoggedIn(ctx)
}



export default Tasks