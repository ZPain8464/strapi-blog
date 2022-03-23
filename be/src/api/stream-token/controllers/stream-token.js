let stream = require('getstream');
const { runInContext } = require('lodash/fp');
require('dotenv').config()

module.exports = {
    async getToken(ctx, next) { 
        const userName = ctx.request.body.user
        let client = stream.connect(process.env.STREAM_KEY, process.env.STREAM_SECRET);
        let userToken = client.createUserToken(userName);
      ctx.send(userToken)
    },
  };