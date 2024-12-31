import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'

const UserController = {
  register: async (req, res) => {
    const { username, email, password } = req.body

    try {
      const existingUser = await UserModel.findByEmail(email)
      if (existingUser) {
        return res.status(400).json({ message: 'El email ya está registrado.' })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = {
        username,
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
}

export default UserController
