import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones básicas
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError(null) // Limpiamos cualquier error previo
    setIsSubmitting(true)

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        email,
        password,
      })
      if (response.data.userId) {
        setSuccess('Registration successful! Redirecting...')
        setTimeout(() => navigate('/login'), 3000) // Redirigir después de 3 segundos
      } else {
        setError('An error occurred. Please try again later.')
      }
    } catch (error) {
      setError('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='h-full flex flex-col'>
      <div className='flex-1 flex flex-col justify-start'>
        <label className='mb-2 text-gray-700 dark:text-gray-300'>Email</label>
        <input
          type='email'
          placeholder='Enter your email'
          className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className='mb-2 text-gray-700 dark:text-gray-300'>
          Password
        </label>
        <input
          type='password'
          placeholder='Enter your password'
          className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className='mb-2 text-gray-700 dark:text-gray-300'>
          Confirm Password
        </label>
        <input
          type='password'
          placeholder='Confirm your password'
          className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <div className='mb-4 text-red-500'>{error}</div>}
      {success && <div className='mb-4 text-green-500'>{success}</div>}

      <button
        type='submit'
        disabled={isSubmitting}
        className='mt-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition disabled:bg-gray-400'
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>

      <div className='mt-4 text-center'>
        <NavLink
          to='/login'
          className='text-sm text-purple-500 hover:underline'
        >
          Already have an account? Login
        </NavLink>
      </div>
    </form>
  )
}

export default Register
