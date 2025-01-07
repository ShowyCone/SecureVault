import { FiSend, FiLock, FiUnlock } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMessageContext } from '../context/MessagesContext'

const ChatInput = ({ folderId, triggerReload }) => {
  const [message, setMessage] = useState('')
  const [isEncrypted, setIsEncrypted] = useState(false)
  const { createMessage } = useMessageContext() // Acceso al contexto

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (message.trim()) {
      try {
        await createMessage({
          folder_id: folderId,
          content: message,
          encryptFlag: isEncrypted ? 1 : 0,
        })
        setMessage('')
        triggerReload()
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center gap-2 p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700'
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        type='button'
        onClick={() => setIsEncrypted(!isEncrypted)}
        className={`p-2 rounded-lg transition-colors ${
          isEncrypted
            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}
        aria-label='Toggle encryption'
      >
        {isEncrypted ? (
          <FiLock className='w-5 h-5' />
        ) : (
          <FiUnlock className='w-5 h-5' />
        )}
      </motion.button>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder='Type your message...'
        className='flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        type='submit'
        className='p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors'
        disabled={!message.trim()}
      >
        <FiSend className='w-5 h-5' />
      </motion.button>
    </form>
  )
}

export default ChatInput
