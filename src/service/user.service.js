const connection = require('../app/database')

class UserService {
  async getUserList() {
    const statement = `SELECT id, name, createAt FROM user;`
    const result = await connection.execute(statement)
    return result[0]
  }

  async deleteUserById(id) {
    const statement = `DELETE FROM user WHERE id = ?;`
    const result = await connection.execute(statement, [id])
    return result[0]
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }

  async getUserById(id) {
    const statement = `SELECT name, DATE_FORMAT(createAt,'%Y-%m-%d') as createTime FROM user WHERE id = ?;`
    const result = await connection.execute(statement, [id])
    return result[0]
  }

  async updateUserById(id, name, password) {
    const statement = `UPDATE user SET name = ?, password = ? WHERE id = ?;`
    const result = await connection.execute(statement, [name, password, id])
    return result[0]
  }
}

module.exports = new UserService()