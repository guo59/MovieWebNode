const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

const {
  detail,
  remove,
  login,
  profile,
  update
} = require('../controller/user.controller')

const {
  verifyLogin
} = require('../middleware/user.middleware')

userRouter.get('/', detail)
userRouter.get('/:userId', profile)
userRouter.delete('/:userId', remove)
userRouter.post('/login', verifyLogin, login)
userRouter.post('/:userId', update)
module.exports = userRouter