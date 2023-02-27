import React, { useContext, useEffect } from 'react'
import { Avatar, Dropdown, notification, Space, } from 'antd'
import{ DownOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import axios from 'axios';



const Logout = () =>{
  const {setIsLoading, setCtxHolder} = useContext(GlobalContext)
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification();
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

  const logout = () => {
    setIsLoading(true)
    let token = localStorage.getItem('token')
    axios.post('https://arhandev.maisyah.id/api/final/logout',
    {},
    {headers: {Authorization: `Bearer ${token}`}})
      .then(res =>{
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/')
        openNotificationWithIcon('info', res.data.info)
      }).catch((err =>{
        openNotificationWithIcon('info', 'Logout', "Now, you're logout")
        localStorage.clear()
        navigate('/login')
      })).finally(()=>{
        setIsLoading(false)
        setCtxHolder(contextHolder)
      })
    }
  return(
    <div className='flex items-center gap-3' onClick={logout}>
        <LogoutOutlined />
        <button className='font-sans' >Logout</button>
    </div>
    )
  }
  
  const items = [
    {
      label: <Link to={'/setting'} className='font-sans' >
          <div className='flex items-center gap-3'>
            <SettingOutlined />Setting Product
          </div>
        </Link>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <Logout />,
      key: '2',
    },
  ];

const DropdownNavbar = () => {
  return (
    <div>
      <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
          className='cursor-pointer '
        >
            <Space>
            <Avatar
              style={{
                backgroundColor: '#3b82f6',
              }}
              icon={<UserOutlined />}
            />
              <p className='font-sans font-semibold'>Hi, {localStorage.getItem('username')}</p>
              <DownOutlined />
            </Space>
        </Dropdown>
    </div>
  )
}

export default DropdownNavbar
