import React from 'react'

const RegisterForm = () => {
  return (
    <form className='w-6/12 mx-auto flex flex-col gap-4'>
      <div className='mb-4'>
        <h1 className='text-center text-4xl font-bold text-slate-900'>Register</h1>
      </div>
      <div className='flex  gap-2'>
        <label>Fullname</label>
        <input
          className='border border-slate-900 rounded-lg h-9'
          type={'text'} />
        <p></p>
      </div>
      <div className='flex  gap-2'>
        <label>Username</label>
        <input
          className='border border-slate-900 rounded-lg h-9'
          type={'text'} />
        <p></p>
      </div>
      <div className='flex  gap-2'>
        <label>Email</label>
        <input
          className='border border-slate-900 rounded-lg h-9'
          type={'email'} />
        <p></p>
      </div>
      <div className='flex  gap-2'>
        <label>Password</label>
        <input
          className='border border-slate-900 rounded-lg h-9'
          type={'password'} />
        <p></p>
      </div>
      <div className='flex  gap-2'>
        <label>Password Confirmation</label>
        <input
          className='border border-slate-900 rounded-lg h-9'
          type={'password'} />
        <p></p>
      </div>
      <div className='w-full pt-2 gap-2 flex flex-col'>
        <button className='bg-slate-900 text-white font-bold p-2 w-full rounded-3xl'>Register</button>
      </div>
    </form>
  )
}

export default RegisterForm
