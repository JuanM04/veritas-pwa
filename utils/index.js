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