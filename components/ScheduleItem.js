import React, { useState, useEffect } from 'react'
import { Card } from 'shards-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { toMinutes, setPixelsMultiplier, START_MINUTES } from 'utils'



export default props => {
  const { subject, module } = props
  // 1 hour = 90px; 1 min = 1.5px
  const [multiplier, setMultiplier] = useState(1.5)

  useEffect(() => { setPixelsMultiplier(multiplier, setMultiplier) })

  return(
    <Card
      className="schedule-item"
      style={{
        backgroundColor: subject.color,
        top: (toMinutes(module.start_time) - START_MINUTES) * multiplier,
        height: (toMinutes(module.end_time) - toMinutes(module.start_time)) * multiplier
      }}
      onClick={() => props.setModalData(props)}
    >
      <FontAwesomeIcon icon={subject.icon} />
    </Card>
  )
}