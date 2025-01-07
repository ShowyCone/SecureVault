import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeToggle from '../components/ThemeToggle'
import useTheme from '../hooks/useTheme'

const AuthLayout = () => {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const AnimationSettings = {
    transition: { duration: 0.5 },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-300 dark:bg-gray-800'>
      <motion.div
        className='absolute top-4 right-4'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </motion.div>

      <div className='w-full max-w-md h-[500px] bg-white p-6 rounded-md shadow-md flex flex-col dark:bg-gray-900 dark:shadow-gray-900'>
        <div className='relative flex justify-between mb-6'>
          <NavLink
            to='/login'
            className='w-1/2 py-2 text-center font-semibold text-gray-500 dark:text-gray-100'
          >
            Login
          </NavLink>
          <NavLink
            to='/register'
            className='w-1/2 py-2 text-center font-semibold text-gray-500 dark:text-gray-100'
          >
            Register
          </NavLink>

          <motion.div
            className='absolute bottom-0 h-[2px] bg-purple-500'
            initial={{ width: '50%', x: isLogin ? '0%' : '100%' }}
            animate={{ x: isLogin ? '0%' : '100%' }}
            transition={{ duration: 0.3 }}
            style={{ width: '50%' }}
          />
        </div>

        <motion.div
          className='flex-1'
          key={location.pathname}
          {...AnimationSettings}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout
