import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill in both fields')
      return
    }

    setIsSubmitting(true)
    try {
      // Enviar la solicitud de login
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      })

      if (response.data.success) {
        // Si el login es exitoso, redirige al Dashboard
        navigate('/dashboard')
      } else {
        setError(response.data.message) // Muestra el error del servidor
      }
    } catch (error) {
      setError('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false) // Permite enviar nuevamente
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
      </div>

      {/* Mensaje de error */}
      {error && <div className='mb-4 text-red-500'>{error}</div>}

      <button
        type='submit'
        disabled={isSubmitting}
        className='mt-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition disabled:bg-gray-400'
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      <div className='mt-4 flex justify-between'>
        <a
          href='/forgot-password'
          className='text-sm text-purple-500 hover:underline'
        >
          Forgot password?
        </a>
        <NavLink
          to='/register'
          className='text-sm text-purple-500 hover:underline'
        >
          Don't have an account? Register
        </NavLink>
      </div>
    </form>
  )
}

export default Login
