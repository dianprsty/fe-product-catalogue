import React from 'react'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  return (
    <div className='flex items-center justify-evenly'>
      <div className='w-6/12 flex justify-end'>
        <img className='w-[500px] fixed top-20' src='/images/laptop.png' alt='auth-img' />
      </div>
      <div className='w-6/12'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register
