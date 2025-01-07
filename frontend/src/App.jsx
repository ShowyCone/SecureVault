import { Routes, Route } from 'react-router-dom'
import { MessageProvider } from './context/MessagesContext'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthLayout from './layouts/AuthLayout'
import Dashboard from './layouts/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './components/ForgotPassword'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
      </Route>
      <Route
        path='dashboard'
        element={
          <ProtectedRoute>
            <MessageProvider>
              <Dashboard />
            </MessageProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
