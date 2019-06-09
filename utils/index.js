const jwt = require('jsonwebtoken')
const nookies = require('nookies').default
const { useEffect } = require('react')

const { security } = require('./metadata')
const STATIC_DATA = require('./static-data.json')



export const START_MINUTES = 420 // 7 hours
export const BREAKPOINT = 576 // xs



export const toMinutes = time => {
  let [hours, minutes] = time.split(':')
  return parseInt(hours) * 60 + parseInt(minutes)
}

export const setPixelsMultiplier = (multiplier, setMultiplier) => {
  let newMultiplier = (window.innerWidth - (5*2 + 5*10)) / 5 / 60
  if(window.innerWidth < BREAKPOINT && multiplier !== newMultiplier) setMultiplier(newMultiplier)
}



export const formatTask = task => {
  if(typeof task.subject === 'string') task.subject = STATIC_DATA.subjects.find(subject => subject.id === task.subject)
  if(typeof task.professor === 'string') task.professor = STATIC_DATA.professors.find(professor => professor.id === task.professor)

  return task
}

export const formatTasks = (tasks, sortByDate=false) => {
  if(sortByDate) tasks.sort((a, b) => new Date(a.date) - new Date(b.date))
  return tasks.map(formatTask)
}



export const getToken = JWT_SECRET => jwt.sign({ lastOnline: Date.now() }, JWT_SECRET, { expiresIn: '2d' })

export const checkToken = (JWT_SECRET, token) => {
  if(!token) return false

  let res = false
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) return
    res = getToken(JWT_SECRET)
  })

  return res
}



export const getTokenClient = () => {
  return getToken(process.env.JWT_SECRET)
}

export const checkTokenClient = ctx => {
  const cookies = nookies.get(ctx)

  return checkToken(process.env.JWT_SECRET, cookies.token)
}

export const setTokenClient = (ctx, token, cb=false, withUseEffect=false) => {
  const func = () => {
    nookies.set(ctx, 'token', token, { maxAge: 2 * 24 * 60 * 60, path: '/' }) // 2 days
    if(cb) cb()
  }
  
  if(withUseEffect) useEffect(func)
  else func()
}



export const setInitialSettings = (ctx, token=false, cb=false) => {
  const cookies = nookies.get(ctx)

  if(!cookies.group) nookies.set(ctx, 'group', '2')
  if(token) setTokenClient(ctx, token)

  if(cb) cb()
}



export const redirectIfNotLoggedIn = ctx => {
  if(typeof window !== 'undefined') return

  const token = checkTokenClient(ctx)
  if(!token) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: security.pages.safeRedirect })
      ctx.res.end()
    }
    else Router.push(security.pages.safeRedirect)
  } else {
    setTokenClient(token)
  }
}