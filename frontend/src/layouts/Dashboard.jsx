import React, { useState, useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import { color, motion } from 'framer-motion'
import axios from 'axios'
import Header from '../components/Header'
import FolderCard from '../components/FolderCard'
import Chat from '../pages/Chat'
import FolderForm from '../components/FolderForm'
import useTheme from '../hooks/useTheme'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const Dashboard = () => {
  const { isDark, toggleTheme } = useTheme()
  const [folders, setFolders] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [showFolderForm, setShowFolderForm] = useState(false)
  const [editingFolder, setEditingFolder] = useState(null)

  // Fetch folders from the API
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          'https://securevault-7jjj.onrender.com/folders',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        const apiFolders = response.data.map((folder) => ({
          id: folder.id,
          title: folder.name,
          itemCount: 0,
          color: folder.color,
        }))
        setFolders(apiFolders)
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }
    fetchFolders()
  }, [folders])

  const handleCreateFolder = async (title, colorF) => {
    try {
      const response = await axios.post(
        'https://securevault-7jjj.onrender.com/folders/create',
        { name: title, color: colorF },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      const newFolder = {
        id: response.data.id,
        title: response.data.name,
        itemCount: 0,
        color: response.data.color,
      }
      setFolders([...folders, newFolder])
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  const handleEditFolder = async (title, colorF) => {
    if (editingFolder) {
      try {
        await axios.put(
          `https://securevault-7jjj.onrender.com/folders/${editingFolder.id}`,
          { name: title, color: colorF },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setFolders(
          folders.map((folder) =>
            folder.id === editingFolder.id ? { ...folder, title } : folder
          )
        )
        setEditingFolder(null)
      } catch (error) {
        console.error('Error updating folder:', error)
      }
    }
  }

  const handleDeleteFolder = async (id) => {
    try {
      await axios.delete(
        `https://securevault-7jjj.onrender.com/folders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setFolders(folders.filter((folder) => folder.id !== id))
    } catch (error) {
      console.error('Error deleting folder:', error)
    }
  }

  const openFolderForm = (folder) => {
    setEditingFolder(folder || null)
    setShowFolderForm(true)
  }

  return (
    <div className='min-h-screen bg-gray-300 dark:bg-gray-900 transition-colors'>
      <Header isDark={isDark} onThemeToggle={toggleTheme} />
      <main className='px-4 sm:px-8 py-6'>
        {selectedFolder ? (
          <Chat
            folderInfo={selectedFolder}
            onBack={() => setSelectedFolder(null)}
          />
        ) : (
          <>
            <div className='flex justify-end mb-6'>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => openFolderForm()}
                className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
              >
                <FiPlus className='w-5 h-5' />
                New Folder
              </motion.button>
            </div>
            <motion.div
              variants={container}
              initial='hidden'
              animate='show'
              className='grid grid-cols-auto-fit gap-6 justify-items-center'
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              }}
            >
              {folders.map((folder) => (
                <motion.div
                  key={folder.id}
                  variants={item}
                  className='relative group'
                >
                  <div
                    onClick={() => setSelectedFolder(folder)}
                    className='cursor-pointer'
                  >
                    <FolderCard
                      title={folder.title}
                      folderId={folder.id}
                      color={folder.color}
                      onEdit={() => openFolderForm(folder)}
                      onDelete={() => handleDeleteFolder(folder.id)}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </main>
      {showFolderForm && (
        <FolderForm
          onSubmit={editingFolder ? handleEditFolder : handleCreateFolder}
          onClose={() => {
            setShowFolderForm(false)
            setEditingFolder(null)
          }}
          initialTitle={editingFolder?.title}
          initialColor={editingFolder?.color}
        />
      )}
    </div>
  )
}

export default Dashboard
