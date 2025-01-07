import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const MessageContext = createContext()

export const useMessageContext = () => {
  return useContext(MessageContext)
}

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  const fetchMessages = async (folderId) => {
    try {
      const response = await axios.get(
        `https://securevault-7jjj.onrender.com/messages/${folderId}`
      )
      setMessages(response.data)
    } catch (error) {
      console.error('Error al obtener mensajes:', error)
    }
  }

  const fetchMessagesCount = async (folderId) => {
    try {
      const response = await axios.get(
        `https://securevault-7jjj.onrender.com/messages/count/${folderId}`
      )
      setMessages(response)
    } catch (error) {
      console.error('Error al obtener mensajes:', error)
    }
  }

  const createMessage = async (newMessage) => {
    try {
      const response = await axios.post(
        'https://securevault-7jjj.onrender.com/messages',
        newMessage,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setMessages((prevMessages) => [...prevMessages, response.data])
    } catch (error) {
      console.error('Error al crear el mensaje:', error)
    }
  }

  const updateMessage = async (messageId, updatedContent) => {
    try {
      const response = await axios.put(
        `https://securevault-7jjj.onrender.com/messages/${messageId}`,
        updatedContent,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, ...response.data } : msg
        )
      )
    } catch (error) {
      console.error('Error al actualizar el mensaje:', error)
    }
  }

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(
        `https://securevault-7jjj.onrender.com/messages/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, ...response.data } : msg
        )
      )
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error)
    }
  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        fetchMessages,
        updateMessage,
        deleteMessage,
        createMessage,
        fetchMessagesCount,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
