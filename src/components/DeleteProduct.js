import React, { useContext, useEffect } from 'react'
import { notification, Popconfirm } from 'antd';
import { DeleteFilled, DeleteOutlined } from '@ant-design/icons';
import { GlobalContext } from '../context/GlobalContext'
import axios from 'axios';

const DeleteProduct = ({id}) => {
  const { setIsLoading, setCtxHolder, getAllProducts } = useContext(GlobalContext)
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

  const confirm = () => {
    setIsLoading(true)
    let token = localStorage.getItem('token')
    axios.delete(`https://arhandev.maisyah.id/api/final/products/${id}`,
      {headers: {Authorization: `Bearer ${token}`}}
    ).then(res => {
      getAllProducts()
      openNotificationWithIcon('success', "Delete Product Sucess", res.data.info)
    }).catch((err => {
      openNotificationWithIcon('error', "Delete Product Failed", err.response.data.info)
    })).finally(()=>{
      setIsLoading(false)
    })
  };
  return (
    <>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        placement='leftBottom'
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
        icon={<DeleteOutlined />}
        okButtonProps={{className:'bg-blue-700'}}
      >
         <button 
            className='p-2 flex items-center gap-1 text-red-600 font-medium'>
            <DeleteFilled /> Delete
          </button>
      </Popconfirm>
    </>
  )
}

export default DeleteProduct
