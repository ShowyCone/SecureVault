import db from '../config/db.js'

const UserModel = {
  // Buscar usuario por email
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?'
    try {
      const [rows] = await db.execute(query, [email])
      return rows[0] // Retorna los resultados encontrados.
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error)
      throw error // Lanza el error para ser manejado en el controlador o función llamante.
    }
  },

  // Crear un nuevo usuario
  createUser: async (user, callback) => {
    const query = `
      INSERT INTO users (email, password_hash) 
      VALUES (?, ?)
    `
    const result = await db.execute(query, [user.email, user.password_hash])

    return result[0]
  },

  updatePassword: async (email, password) => {
    const query = `
      UPDATE users
      SET password_hash = ?
      WHERE email = ?
    `
    const result = await db.execute(query, [password, email])

    return result[0]
  },

  findById: async (id) => {
    const query = 'SELECT * FROM users WHERE id = ?'

    try {
      const [rows] = await db.execute(query, [id])
      return rows[0]
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error)
      throw error
    }
  },
}

export default UserModel
