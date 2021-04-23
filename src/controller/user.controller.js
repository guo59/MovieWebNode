const userService = require('../service/user.service')

class UserController {
  async detail(ctx, next) {
    const result = await userService.getUserList()
    ctx.body = result
  }

  async remove(ctx, next) {
    const {userId} = ctx.params
    const result = await userService.deleteUserById(userId)
    ctx.body = result
  }

  async login(ctx, next) {
    const { id,name} = ctx.user
    ctx.body = { id, name}
  }

  async profile(ctx, next) {
    const { userId} = ctx.params
    const result = await userService.getUserById(userId)
    ctx.body = result[0]
  }

  async update(ctx, next) {
    const { userId} = ctx.params
    const { name, password} = ctx.request.body
    const result = await userService.updateUserById(userId, name, password)
    ctx.body = result
  }
}

module.exports = new UserController()