const Multer = require('koa-multer')
const {
  POSTER_PATH
} = require('../constants/file-path')

const posterUpload = Multer({
  dest: POSTER_PATH
})
const posterHandler = posterUpload.single('poster')

module.exports = {
  posterHandler
}