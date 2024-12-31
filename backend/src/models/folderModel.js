import db from '../config/db.js'
import { customAlphabet } from 'nanoid'

const FolderModel = {
  createFolder: async (userId, name) => {
    const generateShortId = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      6
    )
    const query = 'INSERT INTO folders (id, user_id, name) VALUES (?, ?, ?)'
    const folderId = generateShortId()
    try {
      const [result] = await db.execute(query, [folderId, userId, name])
      return result
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error)
      throw error
    }
  },

  getFoldersByUserId: async (userId) => {
    const query = 'SELECT * FROM folders WHERE user_id = ?'

    try {
      const [results] = await db.execute(query, [userId])
      return results
    } catch (err) {
      console.error(err)
      throw err
    }
  },

  findByIdAndUser: async (folderId, userId) => {
    const query = 'SELECT * FROM folders WHERE id = ? AND user_id = ?'

    try {
      const [rows] = await db.execute(query, [folderId, userId])
      return rows[0]
    } catch (err) {
      console.error(err)
      throw err
    }
  },

  deleteFolder: async (folderId) => {
    const query = 'DELETE FROM folders WHERE id = ?'
    const result = await db.execute(query, [folderId])
    return result[0]
  },

  updateFolder: async (folderId, name) => {
    const query = 'UPDATE folders SET name = ? WHERE id = ?'
    const result = await db.execute(query, [name, folderId])
    return result[0]
  },
}

export default FolderModel
