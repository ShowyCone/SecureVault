import { motion } from 'framer-motion'
import { FiFolder, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'

const FolderCard = ({ title, folderId, color, onEdit, onDelete }) => {
  const [messageCount, setMessageCount] = useState('0')

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit?.()
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete?.()
  }

  useEffect(() => {
    const fetchMessageCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/messages/count/${folderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setMessageCount(response.data.messageCount)
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }
    fetchMessageCount()
  }, [])

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='w-[200px] h-[200px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative group'
    >
      {(onEdit || onDelete) && (
        <div className='absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
          {onEdit && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className='p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors'
            >
              <FiEdit2 className='w-4 h-4' />
            </motion.button>
          )}
          {onDelete && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className='p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors'
            >
              <FiTrash2 className='w-4 h-4' />
            </motion.button>
          )}
        </div>
      )}
      <div
        className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-4`}
      >
        <FiFolder className='w-8 h-8 text-white' />
      </div>
      <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-2'>
        {title}
      </h3>
      <p className='text-gray-500 dark:text-gray-400'>
        {messageCount} messages
      </p>
    </motion.div>
  )
}

export default FolderCard
