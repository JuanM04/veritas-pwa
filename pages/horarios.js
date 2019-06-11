import React, { useState, useEffect } from 'react'
import Base from 'components/Base'
import nookies from 'nookies'
import { Container, Col, Row } from 'shards-react'
import ScheduleItem from 'components/ScheduleItem'
import ScheduleModal from 'components/ScheduleModal'
import _range from 'lodash/range'

import { setPixelsMultiplier, START_MINUTES, redirectIfNotLoggedIn } from 'utils'
import getData from 'utils/data'

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI']



const Schedule = props => {
  // 1 hour = 90px; 1 min = 1.5px
  const [multiplier, setMultiplier] = useState(1.5)
  const [modalData, setModalData] = useState(false)
  const timePxs = time => (time * 60 - START_MINUTES) * multiplier



  let classroom = getData(true).classroom
  let group = props.group ? getData(true).groups[props.group] : false
  let colsByDay = {
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
  }


  classroom.concat(group).forEach(subject => {
    let obj = {
      subject: subject.subject,
      professor: subject.professor
    }

    subject.modules.forEach(module => {
      colsByDay[module.day].push({ ...obj, module })
    })
  })

  useEffect(() => { setPixelsMultiplier(multiplier, setMultiplier) })


  return(
    <Base currentTab={0}>
      <Row className="schedule">
        {days.map(day => (
          <Col key={day}>
            {colsByDay[day].map(item => <ScheduleItem key={`${day}-${item.module.start_time}`} {...item} setModalData={setModalData} />)}
          </Col>
        ))}
      </Row>
      <Container fluid className="schedule-times">
        {
          _range(8, 22 + 1).map(time => (
            <div className="schedule-time" key={`hr-${time}`}>
              <span style={{ top: timePxs(time) - 22.5 * multiplier }}>{time}</span>
              <hr style={{ top: timePxs(time) }} />
            </div>
          ))
        }
      </Container>
      <ScheduleModal data={modalData} setData={setModalData} />
    </Base>
  )
}



Schedule.getInitialProps = async (ctx) => {
  await redirectIfNotLoggedIn(ctx)

  const cookies = nookies.get(ctx)

  return { group: cookies.group }
}



export default Schedule
