import { FiSun, FiMoon } from 'react-icons/fi'
import { motion } from 'framer-motion'

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700'
      aria-label='Toggle theme'
    >
      {isDark ? (
        <FiSun className='w-5 h-5 text-yellow-500' />
      ) : (
        <FiMoon className='w-5 h-5 text-gray-600' />
      )}
    </motion.button>
  )
}

export default ThemeToggle
