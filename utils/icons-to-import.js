const METADATA = require('utils/metadata')
const STATIC_DATA = require('utils/static-data.json')

let iconsToImport = []



const formatter = str => {
  if(typeof str !== 'string' || str.length === 0) return ''

  let parts = str.split('-')
  parts = parts.map(part => part[0].toUpperCase() + part.substring(1))

  return parts.reduce((str, part) => str + part, 'fa')
}

const getIconsFromObjects = (arr, key='icon') => arr.map(obj => obj[key])

const addIcons = arr => {
  arr.forEach(icon => {
    let formatted = formatter(icon)

    if(iconsToImport.indexOf(formatted) !== -1) return
    else iconsToImport.push(formatted)
  })
}



addIcons(getIconsFromObjects(METADATA.tabs))
addIcons(getIconsFromObjects(STATIC_DATA.subjects))



module.exports = iconsToImport