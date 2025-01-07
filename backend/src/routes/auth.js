import express from 'express'
import UserController from '../controllers/authController.js'

const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/forgot-password', UserController.sendTemporaryPassword)
router.post('/reset-password', UserController.resetPassword)

export default router
