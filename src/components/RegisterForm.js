import React, { useEffect } from 'react'
import { notification} from 'antd'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { GlobalContext } from '../context/GlobalContext'

const RegisterForm = () => {
  // eslint-disable-next-line
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
  },[])// eslint-disable-line react-hooks/exhaustive-deps


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
    password_confirmation: Yup.string().required('re-password is a required field')
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
          <Form className='w-[400px] sm:min-w-[460px] sm:w-[460px] mx-auto flex flex-col gap-4 p-8  bg-white shadow-sm border'>
            <div className='mb-4'>
              <h1 className='text-center text-4xl font-bold text-blue-500'>Register</h1>
            </div>
            <div className='flex flex-col sm:flex-row w-full gap-2 justify-between'>
              <label className='p-2' >Full Name</label>
              <div>
                <Field
                  className='border border-blue-500 rounded-lg h-9 px-2'
                  type={'text'} name='name' placeholder='Full Name' />
                <p className='text-red-500'>{touched.name && errors.name}</p>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full gap-2 justify-between'>
              <label className='p-2' >Email</label>
              <div>
                <Field
                  className='border border-blue-500 rounded-lg h-9 px-2'
                  type={'email'} name='email' placeholder='Email' />
                <p className='text-red-500'>{touched.email && errors.email}</p>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full gap-2 justify-between'>
              <label className='p-2' >Username</label>
              <div>
                <Field
                  className='border border-blue-500 rounded-lg h-9 px-2'
                  type={'text'} name='username' placeholder='Username' />
                <p className='text-red-500'>{touched.username && errors.username}</p>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full gap-2 justify-between'>
              <label className='p-2'>Password</label>
              <div>
                <Field
                  className='border border-blue-500 rounded-lg h-9 px-2'
                  type={'password'} name='password' placeholder='Password' />
                <p className='text-red-500'>{touched.password && errors.password}</p>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full gap-2 justify-between'>
              <label className='px-2'>Confirm Password</label>
              <div>
                <Field
                  className='border border-blue-500 rounded-lg h-9 px-2'
                  type={'password'} name='password_confirmation' placeholder='Confirm Password' />
                <p className='text-red-500'>{touched.password_confirmation && errors.password_confirmation}</p>
              </div>
            </div>
            <div className='w-full -mb-3 flex flex-col'>
              <button type='submit' 
                className='bg-blue-500 text-white font-bold p-2 w-full rounded-3xl'
                >Register</button>
            </div>
            <p className='text-xs'>Already have an account? 
              <Link to='/login' ><span className='text-blue-500'>  Login</span></Link>
            </p>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RegisterForm
