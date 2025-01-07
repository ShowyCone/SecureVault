import { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError(null)

    if (!email) {
      setError('Please enter your email')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await axios.post(
        'https://securevault-7jjj.onrender.com/auth/forgot-password',
        { email }
      )
      if (response.data.message) {
        setMessage('A temporary password has been sent to your email.')
      } else {
        setError('Could not send temporary password. Please try again.')
      }
    } catch (error) {
      setError('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='h-full flex flex-col'>
      <label className='mb-2 text-gray-700 dark:text-gray-300'>Email</label>
      <input
        type='email'
        placeholder='Enter your email'
        className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {message && <div className='mb-4 text-green-500'>{message}</div>}
      {error && <div className='mb-4 text-red-500'>{error}</div>}

      <button
        type='submit'
        disabled={isSubmitting}
        className='mt-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition disabled:bg-gray-400'
      >
        {isSubmitting ? 'Sending...' : 'Send Temporary Password'}
      </button>
    </form>
  )
}

export default ForgotPassword
