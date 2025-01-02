import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeToggle from '../components/ThemeToggle'

const AuthLayout = () => {
  const location = useLocation()

  const isLogin = location.pathname === '/login'

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800'>
      <motion.div
        className='absolute top-4 right-4'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ThemeToggle />
      </motion.div>

      <motion.div
        className='w-full max-w-md h-[500px] bg-white p-6 rounded-md shadow-md flex flex-col dark:bg-gray-900 dark:shadow-gray-900'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className='relative flex justify-between mb-6'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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

          {/* Barra subrayada animada */}
          <motion.div
            className='absolute bottom-0 h-[2px] bg-purple-500'
            initial={{ width: '50%', x: isLogin ? '0%' : '100%' }}
            animate={{ x: isLogin ? '0%' : '100%' }}
            transition={{ duration: 0.3 }}
            style={{ width: '50%' }}
          />
        </motion.div>

        {/* Contenido dinámico con animación */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className='flex-1'
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AuthLayout
