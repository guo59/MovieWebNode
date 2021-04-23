const connection = require('../app/database')

class MovieService {
  async getMovieList() {
    const statement = `SELECT id, name, DATE_FORMAT(releasedate,'%Y-%m-%d') as releasedate, type, director, introduction, poster_url FROM movie;`
    const result = await connection.execute(statement)
    return result[0]
  }

  async deleteMovieById(id) {
    const statement = `DELETE FROM movie WHERE id = ?;`
    const result = await connection.execute(statement, [id])
    return result[0]
  }

  async getMovieById(id) {
    const statement = `SELECT name, DATE_FORMAT(releasedate,'%Y-%m-%d') as releasedate, type, director, introduction, poster_url FROM movie WHERE id = ?;`
    const result = await connection.execute(statement, [id])
    return result[0]
  }

  async updateMovieById(id, name, releasedate, type, director, introduction) {
    const statement = `UPDATE movie SET
                       name = ?, releasedate = ?, type = ?, director = ?, introduction = ? WHERE id = ?;`
    const result = await connection.execute(statement, [name, releasedate, type, director, introduction, id])
    return result
  }

  async addMovie(name, releasedate, type, director, introduction) {
    const statement = `INSERT INTO movie (name, releasedate, type, director, introduction)
                      VALUES (?, ?, ?, ?, ?);`
    const result = await connection.execute(statement, [name, releasedate, type, director, introduction])
    return result
  }

  async getPosterByMovieId(posterUrl, movieId) {
    const statement = `UPDATE movie SET poster_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [posterUrl, movieId])
    return result
  }

  async getComment() {
    const statement = 
      `SELECT m.id, m.name, u.name username, c.content, DATE_FORMAT(c.createAt,'%Y-%m-%d') as createTime
      FROM movie m
      LEFT JOIN comment c ON c.movie_id = m.id
      LEFT JOIN user u ON u.id = c.user_id;`
    const result = await connection.execute(statement)
    return result
  }

  async getCommentById(id) {
    const statement = 
      `SELECT c.content, m.name
      FROM comment c
      LEFT JOIN user u ON c.user_id = u.id
      LEFT JOIN movie m ON c.movie_id = m.id
      WHERE u.id = ?;`
    const result = await connection.execute(statement, [id])
    return result
  }

  async getCommentByMovieId(id) {
    const statement = 
      `SELECT c.content, u.name, DATE_FORMAT(c.createAt,'%Y-%m-%d') as createTime
      FROM comment c
      LEFT JOIN user u ON c.user_id = u.id
      LEFT JOIN movie m ON c.movie_id = m.id
      WHERE m.id = ?;`
    const result = await connection.execute(statement, [id])
    return result
  }
}

module.exports = new MovieService()