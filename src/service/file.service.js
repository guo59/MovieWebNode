const connection = require('../app/database')

class FileService {
  async createPoster(filename, mimetype, size, movieId) {
    const statement = `INSERT INTO picture (filename, mimetype, size, movie_id) VALUES (?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, movieId])
    return result
  }

  async getPosterByMovieId(movieId) {
    const statement = `SELECT * FROM picture WHERE movie_id = ?;`
    const [result] = await connection.execute(statement, [movieId])
    return result[0]
  }

}

module.exports = new FileService()