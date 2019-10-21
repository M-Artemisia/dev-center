const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const querystring = require('querystring')
const Bunyan = require('bunyan')
const config = require('../config')
const prometheus = require('prom-client')
const { monitor } = require('./prometheus')

const log = Bunyan.createLogger({ name: 'dev-center-server' })
const app = express()

const metricsInterval = prometheus.collectDefaultMetrics()
monitor.routes(app)

const isProduction = process.env.NODE_ENV === 'production'

log.info('Starting server')

app.use(cookieParser())

// Add security headers to all responses
app.use((req, res, next) => {
  if (!config.env.disableXXSSProtection) {
    res.setHeader('X-XSS-Protection', 1)
  }
  if (!config.env.disableXContentTypeOptions) {
    res.setHeader('X-Content-Type-Options', 'nosniff')
  }
  if (!config.env.disableXFrameOptions) {
    res.setHeader('X-Frame-Options', 'deny')
  }
  if (!config.env.disableHSTS) {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=86400; includeSubDomains'
    )
  }
  next()
})

// Kubernetes readiness probe

app.use('/ping', (req, res) => {
  res.status(200).end('ok')
})

// Prometheus

app.get('/metrics', (req, res, next) => {
  const auth = req.headers.authorization || ''
  const segments = auth.split(' ')
  const expectedToken = config.env.stage.prometheusToken

  // In addition to checking that the tokens match, we also check that the
  // token has been set in the env. This lets us prevent a case where the
  // token is an empty string and the user gains access by submitting an
  // empty bearer token.
  if (expectedToken && segments.length === 2 && segments[1] === expectedToken) {
    res.set('Content-Type', prometheus.register.contentType)
    res.end(prometheus.register.metrics())
  } else {
    next()
  }
})

// Log all requests, but ignore Kubernetes and Prometheus requests for waaaaaay
// less noise.

app.use((req, res, next) => {
  log.info(`${req.method} ${req.originalUrl}`)
  next()
})

// API Docs - resolve before trailing slash redirect so assets don't break

const buildPath = isProduction ? '../docs/' : '../api-docs/build/'
app.use(
  '/developers/api',
  express.static(path.join(__dirname, buildPath), {
    redirect: false
  })
)

// Remove trailing slashes, UNLESS
// A) We're in local dev mode, in which case we need the slashes to communicate with the Jekyll server
// B) Request is for an API docs landing, which needs the slash to not break assets
// If A or B is true, ensure trailing slash is there

const hasTrailingSlash = reqPath => /.+\/$/.test(reqPath)
const isApiDocs = reqPath => /^\/developers\/api\/?$/.test(reqPath)
app.get('*', (req, res, next) => {
  if (hasTrailingSlash(req.path) && !(!isProduction || isApiDocs(req.path))) {
    res.redirect(req.path.replace(/\/$/, ''))
  } else if (
    !hasTrailingSlash(req.path) &&
    (!isProduction || isApiDocs(req.path))
  ) {
    res.redirect(`${req.path}/`)
  } else {
    next()
  }
})

// Local Development - Proxy requests to local hot-reloading Jekyll server

if (!isProduction) {
  const devCenterProxyConfig = {
    target: config.env.stage.devCenterUrl,
    changeOrigin: true
  }
  app.use(require('http-proxy-middleware')(devCenterProxyConfig))
}

// Dev Center

const isDirectory = devCenterPath => !/\w+\.\w+$/.test(devCenterPath)
app.use(/^\/developers/, (req, res, next) => {
  const usePublic = req.cookies['x-public-marketplace-documentation'] === 'true'

  if (isDirectory(req.path)) {
    const qs = querystring.stringify(req.query)
    const newPath = `${req.path.replace(/\/$/, '')}/index.html`
    const newQs = qs ? `?${qs}`: ''
    req.url = `${newPath}${newQs}`
  }

  const options = {
    redirect: false,
    maxAge: isProduction ? '1y' : '0'
  }

  const basePath = path.join(
    __dirname,
    `../sites/${usePublic ? 'public' : 'enterprise'}`,
    'developers'
  )

  express.static(basePath, options)(req, res, next)
})

app.get('*', (req, res) => {
  res.status(404).end()
})

// Initialization

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
  log.info(`Server started on port ${PORT}.`)
})

monitor.server(server)

// Graceful Shutdown

function gracefulShutdown() {
  console.log('Received signal, shutting down gracefully.')

  server.close(() => {
    console.log('Closed out remaining connections.')
    process.exit()
  })

  clearInterval(metricsInterval)
  const gracePeriod = isProduction ? 10 : 1

  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down'
    )
    process.exit()
  }, gracePeriod * 1000)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
