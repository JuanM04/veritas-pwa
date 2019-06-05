const path = require('path')
const { parsed: localEnv } = require('dotenv').config()
const withSASS = require('@zeit/next-sass')

module.exports = withSASS({
  webpack: config => {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['utils'] = path.join(__dirname, 'utils')
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')

    return config
  },
  
  serverRuntimeConfig: {
    ...localEnv
  },

  target: 'serverless'
})