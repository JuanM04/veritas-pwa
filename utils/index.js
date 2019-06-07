const jwt = require('jsonwebtoken')
const nextCookies = require('next-cookies')
const Cookies = require('js-cookie')
const { useEffect } = require('react')



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
  const cookies = nextCookies(ctx)

  return checkToken(process.env.JWT_SECRET, cookies.token)
}

export const setTokenClient = (token, cb=false, withUseEffect=true) => {
  const func = () => {
    Cookies.set('token', token, { expires: 2, path: '/' })
    if(cb) cb()
  }
  
  if(withUseEffect) useEffect(func)
  else func()
}