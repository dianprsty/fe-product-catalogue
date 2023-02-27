import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    
    <div className='flex items-center flex-col md:flex-row justify-evenly '>
      <div className='w-full lg:w-6/12 flex lg:justify-end justify-center'>
        <img className='w-[500px] lg:fixed lg:top-20' src='/images/laptop.png' alt='auth-img' />
      </div>
      <div className=' w-full lg:w-6/12 p-8'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
