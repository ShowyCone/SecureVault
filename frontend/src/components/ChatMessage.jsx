import { FiLock } from 'react-icons/fi'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import MessageActions from './MessageActions'
import { useState } from 'react'

const ChatMessage = ({ message, onEdit, onDelete, triggerReload }) => {
  const [hideMessage, setHideMessage] = useState('***************')
  const [isShowMessage, setIsShowMessage] = useState(false)

  const toggleMessageVisibility = () => {
    setIsShowMessage(!isShowMessage)
    if (isShowMessage) {
      setHideMessage('**********')
    } else {
      setHideMessage(message.content)
    }
  }

  return (
    <div className='flex items-start gap-2 p-4'>
      <div className='flex-1 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm'>
        <div className='flex items-center gap-2'>
          {message.isEncrypted != 0 && (
            <FiLock className='w-4 h-4 text-green-500' />
          )}

          {message.isEncrypted != 0 && (
            <button
              onClick={toggleMessageVisibility}
              className='focus:outline-none'
            >
              {isShowMessage ? (
                <FiEyeOff className='w-4 h-4 text-gray-500' />
              ) : (
                <FiEye className='w-4 h-4 text-gray-500' />
              )}
            </button>
          )}
          <p className='text-gray-800 dark:text-gray-200'>
            {message.isEncrypted != 0 ? hideMessage : message.content}
          </p>
        </div>
        {/*
        <span className='text-xs text-gray-500 mt-1'>
          {message.timestamp.toLocaleTimeString()}
        </span>
        */}
        <MessageActions
          content={message}
          triggerReload={() => triggerReload((prev) => !prev)}
          editButtonActive={!isShowMessage && message.isEncrypted}
        />
      </div>
    </div>
  )
}

export default ChatMessage
