import React, { useEffect } from 'react'
import { notification} from 'antd'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { GlobalContext } from '../context/GlobalContext'

const RegisterForm = () => {

  const [registerData, setRegisterData] = useState(
    {
      "email": "",
      "name": "",
      "username": "",
      "password": "",
      "password_confirmation": ""
  }
  )
  const { setIsLoading, setCtxHolder} = useContext(GlobalContext)
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate()


  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
      placement: 'topLeft'
    });
  };
  useEffect(()=>{
    setCtxHolder(contextHolder)
  },[])


  const handleSubmit = (values) =>{
    console.log(values);
    setIsLoading(true)
    axios.post('https://arhandev.maisyah.id/api/final/register', values)
      .then(res => {
        navigate('/login')
        openNotificationWithIcon('success', 'Success', res.data.info)
      }).catch(err => {
        openNotificationWithIcon('error', 'Registration Failed', err.response.data.info)
      }).finally(()=>{
        setIsLoading(false)
        setCtxHolder(contextHolder)
      })
  }
  
  
  const registerSchema = Yup.object({
    email: Yup.string().email().required(),
    name: Yup.string().required(),
    username : Yup.string().required(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().required()
  })
  return (
    <>
      <Formik 
        initialValues={registerData}
        validationSchema={registerSchema}
        onSubmit = {(values) => handleSubmit(values)}
      >
        {({
          errors,
          touched
        }) => (
          <Form className='w-80 mx-auto flex flex-col gap-4'>
            <div className='mb-4'>
              <h1 className='text-center text-4xl font-bold text-slate-900'>Register</h1>
            </div>
            <div className='flex gap-2 justify-between'>
              <label className='p-2' >Full Name</label>
              <div>
                <Field
                  className='border border-slate-900 rounded-lg h-9 px-2'
                  type={'text'} name='name' placeholder='Full Name' />
                <p className='text-red-500'>{touched.name && errors.name}</p>
              </div>
            </div>
            <div className='flex gap-2 justify-between'>
              <label className='p-2' >Email</label>
              <div>
                <Field
                  className='border border-slate-900 rounded-lg h-9 px-2'
                  type={'email'} name='email' placeholder='Email' />
                <p className='text-red-500'>{touched.email && errors.email}</p>
              </div>
            </div>
            <div className='flex gap-2 justify-between'>
              <label className='p-2' >Username</label>
              <div>
                <Field
                  className='border border-slate-900 rounded-lg h-9 px-2'
                  type={'text'} name='username' placeholder='Username' />
                <p className='text-red-500'>{touched.username && errors.username}</p>
              </div>
            </div>
            <div className='flex gap-2 justify-between'>
              <label className='p-2'>Password</label>
              <div>
                <Field
                  className='border border-slate-900 rounded-lg h-9 px-2'
                  type={'password'} name='password' placeholder='Password' />
                <p className='text-red-500'>{touched.password && errors.password}</p>
              </div>
            </div>
            <div className='flex gap-2 justify-between'>
              <label className='px-2'>Confirm Password</label>
              <div>
                <Field
                  className='border border-slate-900 rounded-lg h-9 px-2'
                  type={'password'} name='password_confirmation' placeholder='Confirm Password' />
                <p className='text-red-500'>{touched.password_confirmation && errors.password_confirmation}</p>
              </div>
            </div>
            <p className='text-xs'>or 
              <button type='reset' ><span className='text-blue-500'>  Login</span></button>
            </p>
            <div className='w-full pt-2 gap-2 flex flex-col'>
              <button type='submit' 
                className='bg-slate-900 text-white font-bold p-2 w-full rounded-3xl'
                >Login</button>
            </div>
            <p className='text-xs'>or 
              <Link to='/login' ><span className='text-blue-500'>  Login</span></Link>
            </p>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RegisterForm
