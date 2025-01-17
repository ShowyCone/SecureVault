import React, { useState } from 'react'
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useMessageContext } from '../context/MessagesContext'
import ConfirmPasswordModal from './ConfirmPasswordModal'
import { toast } from 'react-toastify'
import axios from 'axios'

const MessageActions = ({ content, triggerReload, editButtonActive }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content.content)
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const { updateMessage, deleteMessage } = useMessageContext()

  const handleSave = async () => {
    if (editedContent.trim()) {
      setIsLoading(true)
      await updateMessage(content.id, {
        content: editedContent,
        encryptFlag: content.isEncrypted,
      })
      setIsEditing(false)
      setIsLoading(false)
      triggerReload()
    }
  }

  const handleConfirmPassword = async (password) => {
    try {
      const response = await axios.post(
        'https://securevault-7jjj.onrender.com/auth/confirm-password',
        { password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (response.data.passwordMatch) {
        // Contraseña validada: eliminar mensaje
        setIsLoading(true)
        await deleteMessage(content.id)
        triggerReload()
        toast.success('¡Mensaje eliminado correctamente!', {
          position: 'top-center',
        })
      } else {
        // Contraseña incorrecta
        toast.error('Contraseña incorrecta. Inténtalo de nuevo.', {
          position: 'top-center',
        })
      }
    } catch (error) {
      console.error('Error al verificar la contraseña:', error)
      toast.error('Hubo un error al eliminar el mensaje.', {
        position: 'top-center',
      })
    } finally {
      setIsPasswordModalOpen(false)
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditedContent(content.content)
    setIsEditing(false)
  }

  return isEditing ? (
    <div className='flex items-center gap-2 mt-2'>
      <input
        type='text'
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className='flex-1 p-1 text-sm rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white'
        autoFocus
        disabled={isLoading}
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        disabled={isLoading}
        className={`p-1 text-green-500 hover:bg-green-100 dark:hover:bg-green-900 rounded ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <FiCheck className='w-4 h-4' />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleCancel}
        disabled={isLoading}
        className={`p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <FiX className='w-4 h-4' />
      </motion.button>
    </div>
  ) : (
    <div className='flex items-center gap-2 mt-2'>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsEditing(true)}
        className={`p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded ${
          editButtonActive ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={editButtonActive}
      >
        <FiEdit2 className='w-4 h-4' />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPasswordModalOpen(true)}
        className='p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded'
      >
        <FiTrash2 className='w-4 h-4' />
      </motion.button>

      {/* Modal de confirmación de contraseña */}
      <ConfirmPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handleConfirmPassword}
      />
    </div>
  )
}

export default MessageActions
