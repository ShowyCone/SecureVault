import React, { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useMessageContext } from '../context/MessagesContext'

const MessageActions = ({ content, triggerReload, editButtonActive }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content.content)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const { updateMessage, deleteMessage } = useMessageContext()

  const handleDeleteConfirm = () => {
    setDeleteConfirm(!deleteConfirm)
  }

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

  const handleDelete = async () => {
    setIsLoading(true)
    await deleteMessage(content.id)
    triggerReload()
    setIsLoading(false)
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
        onClick={handleDeleteConfirm}
        className='p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded'
      >
        <FiTrash2 className='w-4 h-4' />
      </motion.button>
      {deleteConfirm && (
        <div className='w-screen h-screen top-0 left-0 absolute bg-gray-900 bg-opacity-50'>
          <div className='flex justify-center items-center w-full h-full flex-col'>
            <h1 className='text-white text-lg'>Are you sure?</h1>
            <div className='flex justify-center items-center gap-2 mt-2'>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className='p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded flex justify-center items-center w-24 h-10 border-2 border-red-800'
              >
                <FiCheck className='w-4 h-4' />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteConfirm}
                className='p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded flex justify-center items-center w-24 h-10 border-2 border-blue-800'
              >
                <FiX className='w-4 h-4' />
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageActions
