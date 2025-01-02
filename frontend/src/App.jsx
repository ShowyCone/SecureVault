import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthLayout from './layouts/AuthLayout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
