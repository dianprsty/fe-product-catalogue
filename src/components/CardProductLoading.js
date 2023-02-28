import { Skeleton } from 'antd'
import React from 'react'

const CardProductLoading = () => {
  return (
    <>
      <Skeleton active={true} className='w-56' />
      <Skeleton active={true} className='w-56' />
      <Skeleton active={true} className='w-56' />
      <Skeleton active={true} className='w-56' />
      <Skeleton active={true} className='w-56' />
    </>
  )
}

export default CardProductLoading
