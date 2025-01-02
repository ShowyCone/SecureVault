import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className='relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer'
      whileTap={{ scale: 0.9 }}
    >
      {/* Sol */}
      <motion.div
        className='absolute left-1 text-yellow-500'
        initial={{ opacity: 1 }}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        ☀️
      </motion.div>

      {/* Luna */}
      <motion.div
        className='absolute right-1 text-blue-500'
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        🌙
      </motion.div>

      {/* Indicador */}
      <motion.div
        className='w-5 h-5 bg-white dark:bg-gray-800 rounded-full z-10'
        layout
        style={{
          x: isDark ? 28 : 0, // Mueve el círculo entre las posiciones
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  )
}

export default ThemeToggle
