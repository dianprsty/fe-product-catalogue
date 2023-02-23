import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  return (
    <form className='w-6/12 mx-auto flex flex-col gap-4'>
      <div className='mb-4'>
        <h1 className='text-center text-4xl font-bold text-blue-500'>Login</h1>
      </div>
      <div className='flex flex-col gap-2'>
        <label>Email</label>
        <input
          className='border border-blue-500 rounded-lg h-9'
          type={'email'} />
        <p></p>
      </div>
      <div className='flex flex-col gap-2'>
        <label>Password</label>
        <input
          className='border border-blue-500 rounded-lg h-9'
          type={'password'} />
        <p></p>
      </div>
      <div className='w-full pt-2 gap-2 flex flex-col'>
        <button className='bg-blue-600 text-white font-bold p-2 w-full rounded-3xl'>Login</button>
        <p className='text-xs'>Don't have an account? 
          <Link to='/register' ><span className='text-blue-500'>  Register</span></Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
