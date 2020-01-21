const tracingMiddleware = require('lib/dist/services/tracing').default

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  nodeID: isProd ? process.env.HOSTNAME : 'ocr',
  namespace: process.env.RELEASE,
  logLevel: 'info',
  tracking: {
    enabled: isProd,
    shutdownTimeout: 30000,
  },
  // transporter: process.env.TRANSPORTER_URL,
  middlewares: [tracingMiddleware],
}
