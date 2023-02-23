import React from 'react'
import { Avatar, Dropdown, Space, } from 'antd'
import{ DownOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

const items = [
  {
    label: <div className='flex items-center gap-3'>
      <SettingOutlined />
      <Link to={'/asdf'} className='font-sans' >Setting Product</Link>
    
    </div>,
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: <div className='flex items-center gap-3'>
      <LogoutOutlined />
      <button className='font-sans'>Logout</button>
      </div>,
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
              <p className='font-sans text-base'>Hi, Dian</p>
              <DownOutlined />
            </Space>
        </Dropdown>
    </div>
  )
}

export default DropdownNavbar
