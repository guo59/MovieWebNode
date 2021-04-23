const Router = require('koa-router')

const {
  posterHandler
} = require('../middleware/file.middleware')
const {
  savePosterInfo
} = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/:movieId/poster', posterHandler, savePosterInfo)

module.exports = fileRouter