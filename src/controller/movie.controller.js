const fs = require('fs')

const movieService = require('../service/movie.service')
const fileService = require('../service/file.service')
const {
  POSTER_PATH
} = require('../constants/file-path')

class MovieController {
  async list(ctx, next) {
    const result = await movieService.getMovieList()
    ctx.body = result
  }

  async remove(ctx, next) {
    const {movieId} = ctx.params
    const result = await movieService.deleteMovieById(movieId)
    ctx.body = result
  }

  async detail(ctx, next) {
    const {movieId} = ctx.params
    const [result] = await movieService.getMovieById(movieId)
    ctx.body = result
  }

  async update(ctx, next) {
    const {movieId} = ctx.params
    const {name, releasedate, type, director, introduction} = ctx.request.body
    const [result] = await movieService.updateMovieById(movieId, name, releasedate, type, director, introduction)
    ctx.body = result
  }

  async create(ctx, next) {
    const {name, releasedate, type, director, introduction} = ctx.request.body
    const [result] = await movieService.addMovie(name, releasedate, type, director, introduction)
    ctx.body = result
  }

  async movieInfo(ctx, next) {
    const { movieId} = ctx.params
    const movieInfo = await fileService.getPosterByMovieId(movieId)
    ctx.response.set('content-type', movieInfo.mimetype)
    ctx.body = fs.createReadStream(`${POSTER_PATH}/${movieInfo.filename}`)
  }

  async comment(ctx, next) {
    const [result] = await movieService.getComment()
    ctx.body = result
  }

  async usercomment(ctx, next) {
    const { userId} = ctx.params
    const result = await movieService.getCommentById(userId)
    ctx.body = result[0]
  }

  async movieComment(ctx, next) {
    const { movieId} = ctx.params
    const result = await movieService.getCommentByMovieId(movieId)
    ctx.body = result[0]
  }
}

module.exports = new MovieController()