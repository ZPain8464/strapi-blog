module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'POST',
        path: '/stream-token',
        handler: 'stream-token.getToken',
      },
    ]
  }