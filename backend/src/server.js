import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import folderRoutes from './routes/folders.js'
import messageRoutes from './routes/messages.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/folders', folderRoutes)
app.use('/messages', messageRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
