import React from 'react'
import { Modal, ModalBody, Row } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default ({ data, setData }) => {
  const open = data !== false

  if(!open) return <></>

  const professor = data.professor[data.module.professor || 0]


  return(
    <Modal
      open={open}
      toggle={() => setData(!open)}
      centered
    >
      {
        open
        &&
        <ModalBody style={{ backgroundColor: data.subject.color }} className="schedule-modal rounded">
          <FontAwesomeIcon className="left" icon={data.subject.icon} />
          <Row><span className="subject-name">{data.subject.name}</span></Row>
          <Row><span className="professor-name">{professor.last_name}, {professor.first_name}</span></Row>
          <Row><span className="module-times">{data.module.start_time} - {data.module.end_time}</span></Row>
          <FontAwesomeIcon className="right" icon={data.subject.icon} />
        </ModalBody>
      }
    </Modal>
  )
}