import React, { useState } from 'react'
import moment from 'moment'
import nookies from 'nookies'
import fetch from 'isomorphic-unfetch'
import _findIndex from 'lodash/findIndex'
import TaskBadge from 'components/TaskBadge'
import { Button, Col, DatePicker, FormCheckbox, FormInput, FormRadio, FormTextarea, Modal, ModalBody, ModalFooter, Row } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { formatTask, formatTasks } from 'utils'
import getData from 'utils/data'
import { da } from 'date-fns/esm/locale';



export default ({ data, setData, setTasks, isOnline }) => {
  const open = data !== false
  if(!open) return <></>
  
  const DATA = getData(true)
  const cookies = nookies.get({})
  const [editing, setEditing] = useState(data.createTask || false)
  const [toDelete, setToDelete] = useState(false)
  const [toEdit, setToEdit] = useState(false)
  const [loading, setLoading] = useState(false)


  const [editType, setEditType] = useState(data.type || 'HOMEWORK')
  const [editDate, setEditDate] = useState(data.date ? new Date(data.date) : new Date())
  const [editGroup, setEditGroup] = useState(data.group ? data.group !== 'CLASSROOM' : false)
  const [editSubject, setEditSubject] = useState(data.subject ? data.subject.id : false)
  const [editProfessor, setEditProfessor] = useState(data.professor ? data.professor.id : false)
  const [editTitle, setEditTitle] = useState(data.title || '')
  const [editDescription, setEditDescription] = useState(data.description || '')

  const dataToMap = editGroup ? DATA.groups[cookies.group] : DATA.classroom

  const handleEditing = () => {
    setEditing(!editing)
  }

  const handleToDelete = () => {
    if(!toDelete) return setToDelete(true)

    const func = async () => {
      await fetch('/api/delete-task', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: cookies.token, taskId: data.id })
      })
    }
    
    setLoading(true)
    func()
    alert('Tarea eliminada')
    let newTasks = JSON.parse(localStorage.getItem('tasks'))
    newTasks.splice(_findIndex(newTasks, { id: data.id }), 1)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
    setTasks(formatTasks(newTasks))
    setData(false)
  }

  const handleToEdit = () => {
    let taskData = {
      type: editType,
      group: editGroup ? cookies.group : 'CLASSROOM',
      date: editDate,
      description: editDescription || null
    }

    switch (editType) {
      case 'EXAM':
      case 'HOMEWORK':
        if(editSubject) taskData.subject = editSubject
        else return alert('Elegí una materia')
        break
      case 'MISSING':
          if(editProfessor) taskData.professor = editProfessor
          else return alert('Elegí una profesor')
          break
      case 'OTHER':
          if(editTitle) taskData.title = editTitle
          else return alert('Elegí una materia')
          break
      default:
        break
    }

    const func = async () => {
      let response
      if(data.id) {  
        response = await fetch('/api/update-task', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: cookies.token, taskData, taskId: data.id })
        })
      } else {
        response = await fetch('/api/create-task', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: cookies.token, taskData })
        })
      }

      const res = await response.json()

      const sync = () => {
        let newTasks = JSON.parse(localStorage.getItem('tasks'))
        if(data.id) newTasks[_findIndex(newTasks, { id: data.id })] = res
        else newTasks.push(res)
        localStorage.setItem('tasks', JSON.stringify(newTasks))
        
        setTasks(formatTasks(newTasks, true))
        setData(formatTask(res))
        
        setToEdit(false)
        setEditing(false)
        setLoading(false)
      }
      
      await sync()
    }
    
    setLoading(true)
    func()
  }



  return(
    <Modal
      open={open}
      toggle={() => setData(!open)}
      centered
    >
      {
        open
        &&
        (
          editing
          ?
          <>
            <ModalBody className="task-modal-edit">
              <Row className="type">
                {
                  ['EXAM', 'HOMEWORK', 'MISSING', 'OTHER'].map(type => (
                    <Col key={type}>
                      <FormRadio
                        name="type"
                        checked={editType === type}
                        onChange={() => setEditType(type)}
                        disabled={loading}
                      >
                        <TaskBadge type={type} />
                      </FormRadio>
                    </Col>
                  ))
                }
              </Row>
              <hr/>
              <Row className="date">
                <Col>
                  <DatePicker
                    selected={editDate}
                    dropdownMode="select"
                    dateFormat="MMMM d"
                    minDate={new Date()}
                    onChange={date => {
                      if(moment(date).diff(moment().startOf('day'), 'days') < 0) return alert('No podés hacer una tarea para ayer')
                      else setEditDate(new Date(date))
                    }}
                    disabled={loading}
                  />
                </Col>
                <Col xl="auto">
                  <FormCheckbox
                    checked={editGroup}
                    onChange={() => {
                      setEditSubject(false)
                      setEditProfessor(false)
                      setEditGroup(!editGroup)
                    }}
                    disabled={loading}
                  >
                    Grupo {cookies.group}
                  </FormCheckbox>
                </Col>
              </Row>
              <hr/>
              <Row className="subject-professor-title">
                <Col>
                  { (editType === 'EXAM' || editType === 'HOMEWORK') && dataToMap.map(({ subject }) => (
                    <FormRadio
                      key={subject.id}
                      name="subject"
                      checked={editSubject === subject.id}
                      onChange={() => setEditSubject(subject.id)}
                      disabled={loading}
                    >
                      <FontAwesomeIcon icon={subject.icon} color={subject.color} /> {subject.name}
                    </FormRadio>
                  )) }
                  { (editType === 'MISSING') && dataToMap.map(({ professor }) => professor.map(professor => (
                    <FormRadio
                      key={professor.id}
                      name="professor"
                      checked={editProfessor === professor.id}
                      onChange={() => setEditProfessor(professor.id)}
                      disabled={loading}
                    >
                      {professor.last_name}, {professor.first_name}
                    </FormRadio>
                  ))) }
                  { (editType === 'OTHER') && (
                    <FormInput
                      placeholder="Título"
                      value={editTitle}
                      maxLength="50"
                      onChange={e => setEditTitle(e.target.value)}
                      disabled={loading}
                    />
                  ) }
                </Col>
              </Row>
              <hr/>
              <Row className="description">
                <Col>
                  <FormTextarea
                    placeholder="Descripción (opcional)"
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                    disabled={loading}
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                outline pill theme="success"
                onClick={handleToEdit}
                disabled={loading}
              >
                <FontAwesomeIcon icon="check" /> {toEdit && '¿Seguro?'}
              </Button>
              <Button
                outline pill theme="danger"
                onClick={handleEditing}
                disabled={!data.id || loading}
              >
                <FontAwesomeIcon icon="times" />
              </Button>
            </ModalFooter>
          </>



          :



          <>
            <ModalBody className="task-modal">
              <Row className="top">
                <Col className="left">
                  { data.subject && <><FontAwesomeIcon icon={data.subject.icon} color={data.subject.color} /> {data.subject.name}</>  }
                  { data.professor && <>{data.professor.last_name}, {data.professor.first_name}</>}
                  { data.title }
                </Col>
                <Col className="right" xl="auto">
                  <TaskBadge type={data.type} />
                </Col>
              </Row>
              <Row className="bottom">
                <Col className="left">{moment(data.date).format('dddd D [de] MMMM')}</Col>
                <Col className="right">{data.group === 'CLASSROOM' ? '4º 5ª' : `Grupo ${data.group}`}</Col>
              </Row>
              {
                data.description && <Row className="description"><Col>{data.description}</Col></Row>
              }
            </ModalBody>
            <ModalFooter>
              <Button
                outline pill theme="info"
                onClick={handleEditing}
                disabled={!isOnline}
              >
                <FontAwesomeIcon icon="edit" />
              </Button>
              <Button
                outline pill theme="danger"
                onClick={handleToDelete}
                disabled={!isOnline}
              >
                <FontAwesomeIcon icon="trash-alt" /> {toDelete && '¿Seguro?'}
              </Button>
            </ModalFooter>
          </>
        )
      }
    </Modal>
  )
}