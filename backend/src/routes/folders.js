import express from 'express'
import folderController from '../controllers/folderController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create', authMiddleware, folderController.createFolder)
router.get('/', authMiddleware, folderController.getFolders)
router.delete('/:folderId', authMiddleware, folderController.deleteFolder)
router.put('/:folderId', authMiddleware, folderController.updateFolder)

export default router
