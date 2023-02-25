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
        console.log(res.data.info);
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
    },[])


  const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
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
          <Form className='w-6/12 mx-auto flex flex-col gap-4 pt-10'>
            <div className='mb-4'>
              <h1 className='text-center text-4xl font-bold text-slate-900'>Login</h1>
            </div>
            <div className='flex flex-col gap-2'>
              <label>Email</label>
              <Field
                className='border border-slate-900 rounded-lg h-9 px-2'
                type={'email'} name='email' placeholder='Email' />
              <p className='text-red-500'>{touched.email && errors.email}</p>

            </div>
            <div className='flex flex-col gap-2'>
              <label>Password</label>
              <Field
                className='border border-slate-900 rounded-lg h-9 px-2'
                type={'password'} name='password' placeholder='Password' />
              <p className='text-red-500'>{touched.password && errors.password}</p>
            </div>
            <div className='w-full pt-2 gap-2 flex flex-col'>
              <button type='submit' 
                className='bg-slate-900 text-white font-bold p-2 w-full rounded-3xl'
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
