;(function redirectApiDocsHash() {
  function getRedirectRoute(hash) {
    switch(hash) {
      case '#introduction': return '/developers/api'
      case '#authentication': return '/developers/api/authentication'
      case '#api-keys':
      case '#key-restrictions': return `/developers/api/authentication${hash}`
      default: return undefined
    }
  }

  if (window.location.pathname.match(/^\/developers\/api\/?$/)
    && window.location.hash
    && getRedirectRoute(window.location.hash)) {
    window.location.assign(getRedirectRoute(window.location.hash))
  }
})()
