const Register = () => {
  return (
    <form className='h-full flex flex-col'>
      <div className='flex-1 flex flex-col justify-start'>
        <label className='mb-2 text-gray-700 dark:text-gray-300'>
          Username
        </label>
        <input
          type='text'
          placeholder='Enter your username'
          className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
        />
        <label className='mb-2 text-gray-700 dark:text-gray-300'>Email</label>
        <input
          type='email'
          placeholder='Enter your email'
          className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
        />
        <label className='mb-2 text-gray-700 dark:text-gray-300'>
          Password
        </label>
        <input
          type='password'
          placeholder='Enter your password'
          className='mb-4 p-2 border rounded dark:bg-gray-800 outline-slate-800 dark:text-gray-200'
        />
      </div>

      <button
        type='submit'
        className='mt-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition'
      >
        Register
      </button>
    </form>
  )
}

export default Register
