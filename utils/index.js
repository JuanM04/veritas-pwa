const jwt = require('jsonwebtoken')
const nookies = require('nookies').default
const { useEffect } = require('react')
const Router = require('next/router').default
const fetch = require('isomorphic-unfetch')

const { tabs, security, cookies: cookiesData } = require('./metadata')
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



export const getToken = JWT_SECRET => jwt.sign({ lastOnline: Date.now() }, JWT_SECRET, { expiresIn: '7d' })

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
    nookies.set(ctx, 'token', token, cookiesData) // 7 days
    if(cb) cb()
  }
  
  if(withUseEffect) useEffect(func)
  else func()
}



export const setInitialSettings = (ctx, token=false, cb=false) => {
  const cookies = nookies.get(ctx)

  if(!cookies.group) nookies.set(ctx, 'group', '2')
  if(!localStorage.getItem('tasks')) localStorage.setItem('tasks', '[]')
  if(token) setTokenClient(ctx, token)

  async function addToCache(urls) {
    const myCache = await window.caches.open('https-calls')
    await myCache.addAll(urls)
  }
  
  const tabsPath = tabs.map(tab => tab.path)
  addToCache(tabsPath.concat(['/', '/acceder']))

  if(cb) cb()
}



export const redirectIfNotLoggedIn = async ctx => {
  let token = false

  if(typeof window === 'undefined') {
    token = await checkTokenClient(ctx)
  } else {
    const cookies = nookies.get(ctx)

    if(cookies.token) {
      if(navigator.onLine) {
        const response = await fetch('/api/check-token', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: cookies.token })
        })
        const res = await response.json()
        token = res.token
      } else {
        token = cookies.token
      }
    }
  }

  if(!token) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: security.pages.safeRedirect })
      ctx.res.end()
    }
    else Router.push(security.pages.safeRedirect)
  } else {
    setTokenClient(ctx, token)
  }
}