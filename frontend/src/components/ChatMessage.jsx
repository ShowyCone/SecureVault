import { FiLock } from 'react-icons/fi'
import MessageActions from './MessageActions'

const ChatMessage = ({ message, onEdit, onDelete, triggerReload }) => {
  return (
    <div className='flex items-start gap-2 p-4'>
      <div className='flex-1 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm'>
        <div className='flex items-center gap-2'>
          {message.isEncrypted != 0 && (
            <FiLock className='w-4 h-4 text-green-500' />
          )}
          <p className='text-gray-800 dark:text-gray-200'>{message.content}</p>
        </div>
        {/*
        <span className='text-xs text-gray-500 mt-1'>
          {message.timestamp.toLocaleTimeString()}
        </span>
        */}
        <MessageActions
          content={message}
          onEdit={(newContent) => onEdit(message.id, newContent)}
          onDelete={() => onDelete(message.id)}
          triggerReload={() => triggerReload((prev) => !prev)}
        />
      </div>
    </div>
  )
}

export default ChatMessage
