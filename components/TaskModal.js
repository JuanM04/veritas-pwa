import React, { useState } from 'react'
import moment from 'moment'
import nookies from 'nookies'
import TaskBadge from 'components/TaskBadge'
import { Button, Col, DatePicker, FormCheckbox, FormInput, FormRadio, FormTextarea, Modal, ModalBody, ModalFooter, Row } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import getData from 'utils/data'



export default ({ data, setData }) => {
  const open = data !== false
  if(!open) return <></>
  
  const DATA = getData(true)
  const cookies = nookies.get({})
  const [editing, setEditing] = useState(data.createTask || false)
  const [toDelete, setToDelete] = useState(false)
  const [toEdit, setToEdit] = useState(false)


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
    // TODO: Delete
  }

  const handleToEdit = () => {
    if((editType === 'EXAM' || editType === 'HOMEWORK') && !editSubject) return alert('Elegí una materia')
    if((editType === 'MISSING') && !editProfessor) return alert('Elegí una profesor')
    if((editType === 'OTHER') && !editTitle) return alert('Poné un título')
    if(!toEdit) return setToEdit(true)
    // TODO: Edit
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
                    onChange={date => {
                      if(moment(date).diff(moment().startOf('day'), 'days') < 0) return alert('No podés hacer una tarea para ayer')
                      else setEditDate(new Date(date))
                    }}
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
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                outline pill theme="success"
                onClick={handleToEdit}
              >
                <FontAwesomeIcon icon="check" /> {toEdit && '¿Seguro?'}
              </Button>
              <Button
                outline pill theme="danger"
                onClick={handleEditing}
              >
                <FontAwesomeIcon icon="times" />
              </Button>
            </ModalFooter>
          </>



          :



          <>
            <ModalBody className="task-modal">
              <Row className="top">
                  {
                    (data.subject || data.professor) && (
                      <Col className="left">
                        { data.subject && <><FontAwesomeIcon icon={data.subject.icon} color={data.subject.color} /> {data.subject.name}</>  }
                        { data.professor && <>{data.professor.last_name}, {data.professor.first_name}</>}
                      </Col>
                    )
                  }
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
              >
                <FontAwesomeIcon icon="edit" />
              </Button>
              <Button
                outline pill theme="danger"
                onClick={handleToDelete}
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