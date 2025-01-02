import { useState } from 'react'
import Header from '../components/Header'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900'>
      <Header toggleSidebar={toggleSidebar} />

      <div className='flex flex-1'>
        {sidebarOpen && <div className='w-64 bg-gray-800 text-white p-4'></div>}

        <main className='flex-1 p-6'>{/* Contenido principal aquí */}</main>
      </div>
    </div>
  )
}

export default Dashboard
