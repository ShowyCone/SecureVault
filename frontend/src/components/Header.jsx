import { FaBars, FaCog, FaPlus } from 'react-icons/fa' // Iconos de react-icons
import ThemeToggle from './ThemeToggle'

const Header = ({ toggleSidebar }) => {
  return (
    <header className='flex justify-between items-center p-4 bg-gray-800 text-white shadow-md'>
      <div className='flex items-center space-x-4'>
        <button
          onClick={toggleSidebar}
          className='p-2 rounded-full bg-purple-500 hover:bg-purple-400 transition-colors'
        >
          <FaBars className='w-5 h-5 text-white' />
        </button>
        <button className='p-2 rounded-full bg-purple-500 hover:bg-purple-400 transition-colors'>
          <FaPlus className='w-5 h-5 text-white' />
        </button>
      </div>
      <div className='flex items-center space-x-4'>
        <button className='p-2 rounded-full bg-purple-500 hover:bg-purple-400 transition-colors'>
          <FaCog className='w-5 h-5 text-white' />
        </button>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
