const fileService = require('../service/file.service')
const movieService = require('../service/movie.service')
const {APP_HOST, APP_PORT} = require('../app/config')

class FileController {
  async savePosterInfo(ctx, next) {
    const { filename, mimetype, size} = ctx.req.file
    const { movieId} = ctx.params

    const result = await fileService.createPoster(filename, mimetype, size, movieId)

    // 海报链接存储到电影表中
    const posterUrl = `${APP_HOST}:${APP_PORT}/movie/${movieId}/poster`
    await movieService.getPosterByMovieId(posterUrl, movieId)

    ctx.body = '上传海报成功'
  }
}

module.exports = new FileController()