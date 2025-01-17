import React, { useState } from 'react'

const ConfirmPasswordModal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    onConfirm(password)
    setPassword('') // Limpiar el input después de la confirmación
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded shadow-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Confirma tu contraseña</h2>
        <input
          type='password'
          placeholder='Ingresa tu contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border w-full p-2 mb-4 rounded'
        />
        <div className='flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='bg-gray-500 text-white px-4 py-2 rounded'
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className='bg-purple-500 text-white px-4 py-2 rounded'
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPasswordModal
