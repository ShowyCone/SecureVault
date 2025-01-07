import db from '../config/db.js'
import { encrypt, decrypt, deriveKey } from '../utils/cryptoUtils.js'
import { customAlphabet } from 'nanoid'

const MessageModel = {
  createMessage: async (folderId, content, encryptFlag) => {
    const generateShortId = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      6
    )
    const messageId = generateShortId()
    const query = `INSERT INTO messages (id, folder_id, content, encrypted, encryption_key) VALUES (?, ?, ?, ?, ?)`

    let encryptedContent = content
    let encrypted = 0
    let encryptionKey = null

    // Si se decide cifrar el contenido
    if (encryptFlag) {
      encryptionKey = deriveKey(folderId)
      encryptedContent = encrypt(content, encryptionKey)
      encrypted = 1
    }

    const result = await db.execute(query, [
      messageId,
      folderId,
      encryptedContent,
      encrypted,
      encryptionKey,
    ])
    return result[0]
  },
  getMessage: async (id, decryptFlag) => {
    const query = 'SELECT * FROM messages WHERE folder_id = ?'
    const [rows] = await db.execute(query, [id])

    if (rows.length === 0) {
      return []
    }

    const message = rows
    const decryptedMessages = message.map((msg) => ({
      ...msg,
      content: msg.encrypted ? decrypt(msg.content) : msg.content,
    }))

    return decryptedMessages
  },

  deleteMessage: async (messageId) => {
    const query = 'DELETE FROM messages WHERE id = ?'
    const result = await db.execute(query, [messageId])
    return result[0]
  },

  updateMessage: async (messageId, content, encryptFlag) => {
    const query =
      'UPDATE messages SET content = ?, encrypted = ?, encryption_key = ? WHERE id = ?'
    let encryptedContent = content
    let encrypted = 0
    let encryptionKey = null

    const [[{ folder_id }]] = await db.execute(
      'SELECT folder_id FROM messages WHERE id = ?',
      [messageId]
    )

    // Si se decide cifrar el contenido
    if (encryptFlag) {
      encryptionKey = deriveKey(folder_id)
      encryptedContent = encrypt(content, encryptionKey)
      encrypted = 1
    }

    const result = await db.execute(query, [
      encryptedContent,
      encrypted,
      encryptionKey,
      messageId,
    ])
    return result[0]
  },

  findMessageWithFolder: async (messageId) => {
    const query = `
      SELECT folder_id AS folderId
      FROM messages
      WHERE id = ?
    `
    const [rows] = await db.execute(query, [messageId])
    return rows[0] // Devuelve la relación mensaje-carpeta.
  },

  getMessageCount: async (folderId) => {
    const query =
      'SELECT COUNT(*) AS message_count FROM messages WHERE folder_id = ?'

    const [result] = await db.execute(query, [folderId])

    if (result.length === 0) {
      throw new Error('No messages found for this folder')
    }

    return result[0].message_count
  },
}

export default MessageModel
