import express from 'express'
import MessageController from '../controllers/messageController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, MessageController.createMessage)
router.get('/:folderId', authMiddleware, MessageController.getMessagesByFolder)
router.delete('/:messageId', authMiddleware, MessageController.deleteMessage)
router.put('/:messageId', authMiddleware, MessageController.updateMessage)

export default router
