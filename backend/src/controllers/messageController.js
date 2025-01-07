import MessageModel from '../models/messageModel.js'
import FolderModel from '../models/folderModel.js'

const MessageController = {
  createMessage: async (req, res) => {
    try {
      const { folder_id, content, encryptFlag } = req.body
      const userId = req.user.id // Desde el middleware.

      const folder = await FolderModel.findByIdAndUser(folder_id, userId)
      if (!folder) {
        return res
          .status(403)
          .json({ message: 'Acceso denegado a la carpeta.' })
      }

      const result = await MessageModel.createMessage(
        folder_id,
        content,
        encryptFlag
      )

      res.status(201).json({
        message: 'Mensaje creado exitosamente',
        messageId: result.insertId,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al crear el mensaje' })
    }
  },

  getMessagesByFolder: async (req, res) => {
    try {
      console.log('req: ', req.params)
      console.log('res: ', req.user)

      const folderId = req.params.folderId
      const userId = req.user.id // Desde el middleware.

      const folder = await FolderModel.findByIdAndUser(folderId, userId)
      console.log('folder: ', folder)
      if (!folder) {
        return res
          .status(403)
          .json({ message: 'Acceso denegado a la carpeta.' })
      }

      const messages = await MessageModel.getMessage(folderId)

      console.log(messages)
      res.json(messages)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al obtener mensajes' })
    }
  },

  getMessageCount: async (req, res) => {
    try {
      const folderId = req.params.folderId

      const folder = await FolderModel.findByIdAndUser(folderId, req.user.id)

      if (!folder) {
        return res
          .status(403)
          .json({ message: 'Acceso denegado a la carpeta.' })
      }

      const messageCount = await MessageModel.getMessageCount(folderId)

      res.json({ messageCount })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ message: 'Error al obtener el conteo de mensajes' })
    }
  },

  deleteMessage: async (req, res) => {
    try {
      const messageId = req.params.messageId
      const userId = req.user.id

      const message = await MessageModel.findMessageWithFolder(messageId)
      if (!message) {
        return res.status(404).json({ message: 'Mensaje no encontrado.' })
      }

      const folder = await FolderModel.findByIdAndUser(message.folderId, userId)
      if (!folder) {
        return res
          .status(403)
          .json({ message: 'No tienes permiso para borrar este mensaje.' })
      }

      const result = await MessageModel.deleteMessage(messageId)
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Mensaje eliminado exitosamente.' })
      } else {
        res.status(404).json({ message: 'No se pudo eliminar el mensaje.' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al eliminar el mensaje.' })
    }
  },

  updateMessage: async (req, res) => {
    try {
      const messageId = req.params.messageId
      const { content, encryptFlag } = req.body
      const userId = req.user.id // Obtenido desde el middleware.

      const message = await MessageModel.findMessageWithFolder(messageId)
      if (!message) {
        return res.status(404).json({ message: 'Mensaje no encontrado.' })
      }

      const folder = await FolderModel.findByIdAndUser(message.folderId, userId)
      if (!folder) {
        return res
          .status(403)
          .json({ message: 'No tienes permiso para actualizar este mensaje.' })
      }

      const result = await MessageModel.updateMessage(
        messageId,
        content,
        encryptFlag
      )
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Mensaje actualizado exitosamente.' })
      } else {
        res.status(400).json({ message: 'No se pudo actualizar el mensaje.' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al actualizar el mensaje.' })
    }
  },
}

export default MessageController
