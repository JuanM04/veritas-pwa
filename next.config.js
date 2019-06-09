const path = require('path')
const withSASS = require('@zeit/next-sass')
const withOffline = require('next-offline')

module.exports = withSASS(withOffline({
  webpack: config => {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['utils'] = path.join(__dirname, 'utils')
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')

    return config
  },

  target: 'serverless',

  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}))