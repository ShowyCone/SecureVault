import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import UserModel from '../models/userModel.js'
import sendEmail from '../utils/emailUtils.js'

const UserController = {
  register: async (req, res) => {
    const { email, password } = req.body

    try {
      const existingUser = await UserModel.findByEmail(email)
      if (existingUser) {
        return res.status(400).json({ message: 'El email ya está registrado.' })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = {
        email,
        password_hash: hashedPassword,
      }

      const result = await UserModel.createUser(newUser)
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        userId: result.insertId,
      })
    } catch (err) {
      res.status(500).json({ message: 'Error al registrar el usuario' })
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await UserModel.findByEmail(email)
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' })
      }

      const isMatch = await bcrypt.compare(password, user.password_hash)
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta.' })
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      res.json({ message: 'Inicio de sesión exitoso', token })
    } catch (err) {
      res.status(500).json({ message: 'Error en el inicio de sesión' })
    }
  },
  sendTemporaryPassword: async (req, res) => {
    const { email } = req.body

    try {
      // Validar si el usuario existe
      const user = await UserModel.findByEmail(email)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const tempPassword = crypto.randomBytes(8).toString('hex')
      const hashedPassword = await bcrypt.hash(tempPassword, 10)

      await UserModel.updatePassword(email, hashedPassword)

      // Enviar la contraseña temporal al correo
      await sendEmail({
        to: email,
        subject: 'Temporary Password',
        text: `Your temporary password is: ${tempPassword}. Please log in and reset your password.`,
      })

      res.status(200).json({ message: 'Temporary password sent to your email' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'An error occurred' })
    }
  },
  resetPassword: async (req, res) => {
    const { email, currentPassword, newPassword } = req.body

    try {
      const user = await UserModel.findByEmail(email)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Verificar la contraseña actual (temporal)
      const isMatch = await bcrypt.compare(currentPassword, user.password_hash)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid current password' })
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      await UserModel.updatePassword(email, hashedPassword)
      res.status(200).json({ message: 'Password reset successfully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'An error occurred' })
    }
  },
}

export default UserController
