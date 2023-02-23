import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <div className='flex items-center justify-evenly'>
      <div className='w-6/12 flex justify-end'>
        <img className='w-[500px] fixed top-20' src='/images/laptop.png' alt='auth-img' />
      </div>
      <div className='w-6/12 p-8'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
