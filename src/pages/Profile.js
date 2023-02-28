import { Avatar, Result } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import CardProduct from '../components/CardProduct'
import { InboxOutlined } from '@ant-design/icons'

const Profile = () => {
  const { products, getAllProducts} = useContext(GlobalContext)
  const [profil, setProfil] = useState({'name':'', 'email':'', 'username':''})
  const navigate = useNavigate()

  useEffect(()=>{
    let username = localStorage.getItem('username') 
    let name = localStorage.getItem('name') 
    let email = localStorage.getItem('email') 
    if (username === null || name === null ){
      navigate('/login')
    }
    setProfil({
      name:name, email:email, username:username
    })
    getAllProducts()
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <div className='w-8/12 mx-auto rounded-lg overflow-hidden'>
        <img src='https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80'
          alt='bg-profile' className='w-full h-80 object-cover object-bottom'/>
        <Avatar size={192}
          className='bg-gradient-to-r from-fuchsia-500 to-purple-500 relative -mt-20 ml-10'
        ><p className='font-semibold'>{profil.username}</p></Avatar>
        <div className='w-8/12 ml-[30%] -mt-24'>
          <p className='font-bold text-5xl text-blue-600'>{profil.name}</p>
          <p className='text-lg text-blue-600'>Username : @{profil.username}</p>
          <p className='text-lg text-blue-600'>Email : {profil.name}</p>
        </div>
        <div className='mt-4'>
          <div className='flex justify-between pr-10 mt-10 mb-5'>
            <h1 className='font-bold text-blue-500 text-xl lg:text-3xl'>My Product</h1>
          </div>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 w-full py-2'>
            { products.filter(item => (item.user.username === profil.username)).length > 0
                ? products.filter(item => (item.user.username === profil.username)).map((item) => {
                return(
                <CardProduct item={item} />
              )}): <Result
                      icon={<InboxOutlined />}
                      title="No Product"
                      subTitle="You dont have any product yet"
                      className=' w-screen lg:w-[800px]'
                    />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
