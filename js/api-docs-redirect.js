;(function redirectApiDocsHash() {
  function getRedirectRoute(hash) {
    switch(hash) {
      case '#introduction': return '/developers/api'
      case '#authentication': return '/developers/api/authentication'
      case '#api-keys':
      case '#key-restrictions': return `/developers/api/authentication${hash}`
      case '#api-specification': return '/developers/api/api-specification'
      case '#call-an-algorithm':
      case '#input-output':
      case '#query-parameters':
      case '#error-handling': return `/developers/api/api-specification${hash}`
      case '#data-api-specification': return '/developers/api/data-api-specification'
      case '#data-uri':
      case '#directories':
      case '#listing-a-directory':
      case '#creating-a-directory':
      case '#updating-a-directory':
      case '#deleting-a-directory':
      case '#files':
      case '#getting-a-file':
      case '#check-if-file-exists':
      case '#upload-a-file':
      case '#deleting-a-file': return `/developers/api/data-api-specification${hash}`
      default: return undefined
    }
  }

  if (window.location.pathname.match(/^\/developers\/api\/?$/)
    && window.location.hash
    && getRedirectRoute(window.location.hash)) {
    window.location.assign(getRedirectRoute(window.location.hash))
  }
})()
