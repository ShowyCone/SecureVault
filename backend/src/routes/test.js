import express from 'express'
import db from '../config/db.js'

const router = express.Router()

router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error al obtener usuarios')
    } else {
      res.json(results)
    }
  })
})

router.get('/folders/:userId', (req, res) => {
  const { userId } = req.params

  db.query(
    'SELECT * FROM folders WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error al obtener carpetas')
      } else {
        res.json(results)
      }
    }
  )
})

router.get('/messages/:id', (req, res) => {
  const messageId = req.params.id

  const query = `
    SELECT 
      messages.id AS message_id,
      messages.content AS message_content,
      folders.id AS folder_id,
      folders.name AS folder_name,
      users.id AS user_id,
      users.username AS user_name,
      users.email AS user_email
    FROM messages
    JOIN folders ON messages.folder_id = folders.id
    JOIN users ON folders.user_id = users.id
    WHERE messages.id = ?;
  `

  db.query(query, [messageId], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error al obtener detalles del mensaje')
    } else if (results.length === 0) {
      res.status(404).send('Mensaje no encontrado')
    } else {
      res.json(results[0]) // Retorna el primer resultado
    }
  })
})

export default router
