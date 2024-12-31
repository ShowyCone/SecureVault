import MessageModel from '../models/messageModel.js'
import FolderModel from '../models/folderModel.js'

const MessageController = {
  createMessage: async (req, res) => {
    try {
      const { folder_id, content, encryptFlag } = req.body
      const userId = req.user.id // Desde el middleware.

      // Verificar si la carpeta pertenece al usuario autenticado.
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
      console.log('req: ', req.params.folderId)
      console.log('res: ', req.user)

      const folderId = req.params.folderId
      const userId = req.user.id // Desde el middleware.

      // Verificar si la carpeta pertenece al usuario autenticado.
      const folder = await FolderModel.findByIdAndUser(folderId, userId)

      if (!folder) {
        return res
          .status(403)
          .json({ message: 'Acceso denegado a la carpeta.' })
      }

      // Obtener los mensajes de la carpeta.
      const messages = await MessageModel.getMessage(folderId)
      console.log(messages)
      res.json(messages)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al obtener mensajes' })
    }
  },

  deleteMessage: async (req, res) => {
    try {
      const messageId = req.params.messageId
      const userId = req.user.id // Del middleware de autenticación.

      // Paso 1: Encuentra el mensaje y verifica su carpeta.
      const message = await MessageModel.findMessageWithFolder(messageId)
      if (!message) {
        return res.status(404).json({ message: 'Mensaje no encontrado.' })
      }

      // Paso 2: Verifica si la carpeta pertenece al usuario.
      const folder = await FolderModel.findByIdAndUser(message.folderId, userId)
      if (!folder) {
        return res
          .status(403)
          .json({ message: 'No tienes permiso para borrar este mensaje.' })
      }

      // Elimina el mensaje.
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
      const { content, encryptFlag } = req.body // Datos enviados en el cuerpo de la petición.
      const userId = req.user.id // Obtenido desde el middleware.

      // Paso 1: Verificar si el mensaje existe y obtener su carpeta.
      const message = await MessageModel.findMessageWithFolder(messageId)
      if (!message) {
        return res.status(404).json({ message: 'Mensaje no encontrado.' })
      }

      // Paso 2: Verificar si la carpeta pertenece al usuario.
      const folder = await FolderModel.findByIdAndUser(message.folderId, userId)
      if (!folder) {
        return res
          .status(403)
          .json({ message: 'No tienes permiso para actualizar este mensaje.' })
      }

      // Paso 3: Actualizar el mensaje.
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
