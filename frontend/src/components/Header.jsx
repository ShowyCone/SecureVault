import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import ResetPasswordModal from './ResetPasswordModal'

const Header = ({ isDark, onThemeToggle }) => {
  const { logout } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)

  return (
    <header className='flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-6 bg-white dark:bg-gray-800 transition-colors min-h-24'>
      <h1 className='text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0'>
        SecureVault
      </h1>
      <div className='flex flex-wrap items-center gap-4 sm:gap-6'>
        {/* <div className='relative'>
          <input
            type='text'
            placeholder='Search folders...'
            className='w-full sm:w-auto pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
          />
          <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
        </div> */}
        <div className='flex items-center gap-4'>
          <button
            onClick={toggleModal}
            className='px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 transition'
          >
            Reset Password
          </button>

          {isModalOpen && <ResetPasswordModal onClose={toggleModal} />}
        </div>
        <div className='flex items-center gap-4'>
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
        </div>
        <div>
          <button>
            <NavLink
              to='/login'
              onClick={logout}
              className='py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
            >
              Logout
            </NavLink>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
