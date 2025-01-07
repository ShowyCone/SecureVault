import { FiArrowLeft } from 'react-icons/fi'
import { motion } from 'framer-motion'

const BackButton = ({ onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className='flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
  >
    <FiArrowLeft className='w-5 h-5' />
    <span>Back to Dashboard</span>
  </motion.button>
)

export default BackButton
