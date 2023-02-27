import { notification } from 'antd'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { GlobalContext } from '../context/GlobalContext'


const LoginForm = () => {
  // eslint-disable-next-line
  const [loginData, setLoginData] = useState({email:'', password:''})
  const { setIsLoading, setCtxHolder} = useContext(GlobalContext)
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
      placement: 'topLeft'
    });
  };

  
  const handleSubmit = (values) =>{
    setIsLoading(true)
    axios.post('https://arhandev.maisyah.id/api/final/login', values)
      .then(res => {
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('username', res.data.data.user.username)
        navigate('/')
        openNotificationWithIcon('success', 'Success', res.data.info)
  }).catch(err => {
        openNotificationWithIcon('error', 'Login Failed', err.response.data.info)
      }).finally(()=>{
        setIsLoading(false)
        setCtxHolder(contextHolder)
      })
    }
    
    useEffect(()=>{
      setCtxHolder(contextHolder)
    },[])// eslint-disable-line react-hooks/exhaustive-deps


  const loginSchema = Yup.object({
    email: Yup.string().email('Please input correct email format').required('Please input your email'),
    password: Yup.string().required('Please input your password')
  })

  return (
    <>
      <Formik 
        initialValues={loginData}
        validationSchema={loginSchema}
        onSubmit = {(values) => handleSubmit(values)}
      >
        {({
          errors,
          touched
        }) => (
          <Form className='w-full lg:w-96 mx-auto lg:ml-24 flex flex-col gap-4 py-8 lg:absolute bg-white px-4 md:px-12 shadow-sm border'>
            <div className='mb-4'>
              <h1 className='text-center text-4xl font-bold text-blue-500'>Login</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <label>Email<span className='text-red-500'>*</span></label>
              <Field
                className='border border-blue-500 rounded-lg h-9 px-2'
                type={'email'} name='email' placeholder='Email' />
              <p className='text-red-500'>{touched.email && errors.email}</p>

            </div>
            <div className='flex flex-col gap-2'>
              <label>Password<span className='text-red-500'>*</span></label>
              <Field
                className='border border-blue-500 rounded-lg h-9 px-2'
                type={'password'} name='password' placeholder='Password' />
              <p className='text-red-500'>{touched.password && errors.password}</p>
            </div>
            <div className='w-full pt-2 gap-2 flex flex-col -mb-3'>
              <button type='submit' 
                className='bg-blue-500 text-white font-bold p-2 w-full rounded-3xl'
                >Login</button>
            </div>
            <p className='text-xs'>Don't have an account? 
              <Link to='/register' ><span className='text-blue-500'>  Register</span></Link>
            </p>
          </Form>
        )}
      </Formik>
    {/* </Spin> */}
      
    </>

    
  )
}

export default LoginForm
