import { useState, useEffect } from 'react'
import { MutatingDots } from 'react-loader-spinner'
import ChatInput from '../components/ChatInput'
import ChatMessage from '../components/ChatMessage'
import BackButton from '../components/BackButton'
import axios from 'axios'

const Chat = ({ folderInfo, onBack }) => {
  const [reloadFlag, setReloadFlag] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const handleSendMessage = (content, isEncrypted) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      isEncrypted,
    }
    setMessages([...messages, newMessage])
  }

  const handleEditMessage = (id, newContent) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, content: newContent } : msg
      )
    )
  }

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id))
  }

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true) // Mostrar loader
      try {
        const response = await axios.get(
          `https://securevault-7jjj.onrender.com/messages/${folderInfo.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )

        const apiMessages = response.data.map((folder) => ({
          id: folder.id,
          content: folder.content,
          isEncrypted: folder.encrypted,
        }))
        setMessages(apiMessages)
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setIsLoading(false) // Ocultar loader
      }
    }
    fetchMessages()
  }, [reloadFlag, folderInfo.id])

  return (
    <div className='flex flex-col h-[calc(100vh-10rem)]'>
      <div className='p-4 border-b dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <BackButton onClick={onBack} />
          <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>
            {folderInfo.title}
          </h2>
          <div className='w-[100px]' />
        </div>
      </div>
      <div className='flex-1 overflow-y-auto p-4 custom-scrollbar'>
        {isLoading ? (
          <div className='flex justify-center items-center h-full'>
            <MutatingDots
              visible={true}
              height='100'
              width='100'
              color='#3b82f6'
              secondaryColor='#2563eb'
              radius='12.5'
              ariaLabel='mutating-dots-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
              triggerReload={() => setReloadFlag((prev) => !prev)}
            />
          ))
        )}
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        folderId={folderInfo.id}
        triggerReload={() => setReloadFlag((prev) => !prev)}
      />
    </div>
  )
}

export default Chat
