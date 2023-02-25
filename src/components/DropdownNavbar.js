import React, { useContext, useEffect } from 'react'
import { Avatar, Dropdown, notification, Space, } from 'antd'
import{ DownOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';



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
  },[])

  const logout = () => {
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      navigate('/')
      openNotificationWithIcon('info', 'Logout Successfully')
    },1000)
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
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />
              <p className='font-sans text-base'>Hi, {localStorage.getItem('username')}</p>
              <DownOutlined />
            </Space>
        </Dropdown>
    </div>
  )
}

export default DropdownNavbar
