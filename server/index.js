const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const Bunyan = require('bunyan')
const config = require('../config')

const log = Bunyan.createLogger({ name: 'dev-center-server' })
const app = express()

const isProduction = process.env.NODE_ENV === 'production'

log.info('Starting server')

app.use(cookieParser())

app.use((req, res, next) => {
  log.info(`${req.method} ${req.originalUrl}`)
  next()
})

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
    req.url = `${req.url.replace(/\/$/, '')}/index.html`
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

// Graceful Shutdown

function gracefulShutdown() {
  console.log('Received signal, shutting down gracefully.')

  server.close(() => {
    console.log('Closed out remaining connections.')
    process.exit()
  })

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
