import { useState } from 'react'
import axios from 'axios'

const ResetPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage('')

    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/auth/reset-password',
        {
          email,
          currentPassword,
          newPassword,
        }
      )

      if (response.data.success) {
        setMessage('Password reset successfully')
        setEmail('')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setTimeout(onClose, 2000) // Cierra el modal tras 2 segundos
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError('An error occurred. Please try again later.')
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
        >
          &times;
        </button>
        <h2 className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4'>
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label className='mb-2 text-gray-700 dark:text-gray-300'>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='mb-2 text-gray-700 dark:text-gray-300'>
            Current Password
          </label>
          <input
            type='password'
            placeholder='Enter your current password'
            className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label className='mb-2 text-gray-700 dark:text-gray-300'>
            New Password
          </label>
          <input
            type='password'
            placeholder='Enter your new password'
            className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className='mb-2 text-gray-700 dark:text-gray-300'>
            Confirm New Password
          </label>
          <input
            type='password'
            placeholder='Confirm your new password'
            className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {message && <div className='mb-4 text-green-500'>{message}</div>}
          {error && <div className='mb-4 text-red-500'>{error}</div>}

          <button
            type='submit'
            className='py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordModal
