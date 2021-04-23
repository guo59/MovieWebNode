const errorType = require('../constants/error-type')
const userService = require('../service/user.service')

const verifyLogin = async (ctx, next) => {
  const { name, password} = ctx.request.body

  // 用户名不存在
  const result = await userService.getUserByName(name)
  const user = result[0]
  if(!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXITSTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 密码不正确
  if(password !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCURRENT)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user
  await next()
}

module.exports = {
  verifyLogin
}