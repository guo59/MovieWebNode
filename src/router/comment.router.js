const Router = require('koa-router')

const commentRouter = new Router({prefix: '/comment'})

const {
  comment,
  usercomment
} = require('../controller/movie.controller')

commentRouter.get('/', comment)
commentRouter.get('/:userId', usercomment)

module.exports = commentRouter