import React, { useState } from 'react'
import { FiFolder, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'

const colorOptions = [
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
]

const FolderForm = ({
  onSubmit,
  onClose,
  initialTitle = '',
  initialColor = 'bg-blue-500',
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [color, setColor] = useState(initialColor)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit(title, color)
      onClose()
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className='bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md'
      >
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>
            {initialTitle ? 'Edit Folder' : 'New Folder'}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          >
            <FiX className='w-5 h-5' />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
              Folder Name
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter folder name'
              autoFocus
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Color
            </label>
            <div className='grid grid-cols-3 gap-2'>
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => setColor(option.value)}
                  className={`p-2 rounded-lg flex items-center justify-center ${
                    option.value
                  } ${
                    color === option.value
                      ? 'ring-2 ring-offset-2 ring-blue-500'
                      : ''
                  }`}
                >
                  <FiFolder className='w-6 h-6 text-white' />
                </button>
              ))}
            </div>
          </div>
          <div className='flex justify-end gap-2 mt-6'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
            >
              {initialTitle ? 'Save Changes' : 'Create Folder'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default FolderForm
