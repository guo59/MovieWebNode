const Router = require('koa-router')

const movieRouter = new Router({prefix: '/movie'})

const {
  list,
  remove,
  detail,
  update,
  create,
  movieInfo,
  comment,
  movieComment
} = require('../controller/movie.controller')


movieRouter.get('/', list)
movieRouter.delete('/:movieId', remove)
movieRouter.get('/:movieId', detail)
movieRouter.patch('/:movieId', update)
movieRouter.post('/', create)
movieRouter.get('/:movieId/poster', movieInfo)
movieRouter.get('/:movieId/comment', movieComment)
movieRouter.get('/comment', comment)


module.exports = movieRouter