import db from '../config/db.js'
import { customAlphabet } from 'nanoid'

const FolderModel = {
  createFolder: async (userId, name, color) => {
    const generateShortId = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      6
    )
    const query =
      'INSERT INTO folders (id, user_id, name, color) VALUES (?, ?, ?, ?)'
    const folderId = generateShortId()
    try {
      const [result] = await db.execute(query, [folderId, userId, name, color])
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

    const [rows] = await db.execute(query, [folderId, userId])
    if (rows.length === 0) {
      return []
    }
    return rows[0]
  },

  deleteFolder: async (folderId) => {
    const deleteMessagesQuery = 'DELETE FROM messages WHERE folder_id = ?'
    const deleteFolderQuery = 'DELETE FROM folders WHERE id = ?'

    try {
      await db.execute(deleteMessagesQuery, [folderId])

      const [result] = await db.execute(deleteFolderQuery, [folderId])

      return result
    } catch (err) {
      console.error('Error al eliminar la carpeta:', err)
      throw err
    }
  },

  updateFolder: async (folderId, name, color) => {
    const query = 'UPDATE folders SET name = ?, color = ? WHERE id = ?'
    const result = await db.execute(query, [name, folderId, color])
    return result[0]
  },
}

export default FolderModel
