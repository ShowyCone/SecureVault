import FolderModel from '../models/folderModel.js'

const folderController = {
  // Crear una carpeta
  createFolder: async (req, res) => {
    try {
      const { name, color } = req.body
      const userId = req.user.id

      const newFolder = await FolderModel.createFolder(userId, name, color)
      if (newFolder) {
        res.status(201).json({
          message: 'Carpeta creada exitosamente',
          name: name,
          id: userId,
          color: color,
        })
      } else {
        res.status(400).json({ message: 'Error al crear la carpeta' })
      }
    } catch (error) {
      console.error('Error al crear la carpeta:', error)
      res.status(500).json({
        message: 'Error al crear la carpeta',
        error: error.message,
      })
    }
  },

  // Obtener las carpetas del usuario
  getFolders: async (req, res) => {
    try {
      const userId = req.user.id

      // Obtener las carpetas del usuario
      const folders = await FolderModel.getFoldersByUserId(userId)
      res.status(200).json(folders)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al obtener las carpetas' })
    }
  },

  deleteFolder: async (req, res) => {
    try {
      const folderId = req.params.folderId
      const userId = req.user.id // Desde el middleware de autenticación.

      // Verifica si la carpeta pertenece al usuario.
      const folder = await FolderModel.findByIdAndUser(folderId, userId)
      if (!folder) {
        return res
          .status(403)
          .json({ message: 'No tienes permiso para borrar esta carpeta.' })
      }

      // Elimina la carpeta.
      const result = await FolderModel.deleteFolder(folderId)
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Carpeta eliminada exitosamente.' })
      } else {
        res.status(404).json({ message: 'La carpeta no existe.' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al eliminar la carpeta.' })
    }
  },

  updateFolder: async (req, res) => {
    try {
      const folderId = req.params.folderId
      const userId = req.user.id // Desde el middleware de autenticación.
      const { name, color } = req.body

      // Verifica si la carpeta pertenece al usuario.
      const folder = await FolderModel.findByIdAndUser(folderId, userId)
      if (!folder) {
        return res
          .status(403)
          .json({ message: 'No tienes permiso para actualizar esta carpeta.' })
      }

      // Actualiza el nombre de la carpeta.
      const result = await FolderModel.updateFolder(folderId, name, color)
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Carpeta actualizada exitosamente.' })
      } else {
        res.status(404).json({ message: 'La carpeta no existe.' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al actualizar la carpeta.' })
    }
  },
}

export default folderController
