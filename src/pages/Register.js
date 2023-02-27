import React from 'react'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  return (
    <div className='flex items-center flex-col md:flex-row justify-evenly'>
      <div className='w-full lg:w-6/12 hidden lg:flex lg:justify-end justify-center'>
        <img className='w-[500px] lg:fixed lg:top-20' src='/images/laptop.png' alt='auth-img' />
      </div>
      <div className=' w-full lg:w-6/12'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register
