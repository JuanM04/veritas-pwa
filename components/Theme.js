import React from 'react'

const white = '#FFFFFF'
const light = 'rgb(233, 236, 239)'
const dark = '#212529'

const lightOpacity = a => `rgba(233, 236, 239, ${a})`



export default props => {
  if(!props.darkMode) return <></>

  return(
    <style jsx global>{`
      body,
      footer,
      .modal-content,
      .form-control, .form-control:focus,
      .task
      {
        background: ${dark} !important
      }

      :not(svg, path), textarea:focus {
        color: ${white} !important
      }

      .modal-body,
      footer,
      .tasks,
      .form-control, .form-control:focus
      {
        color: ${white}
      }

      .list-group-item {
        border: 1px solid ${lightOpacity(0.125)}
      }

      .schedule-time {
        color: ${light}
      }
    
      hr {
        border-top: 1px solid ${lightOpacity(0.1)}
      }
    `}</style>
  )
}