import { Skeleton } from 'antd'
import React from 'react'

const CardProductLoading = () => {
  return (
    <>
      <Skeleton active={true} />
      <Skeleton active={true} />
      <Skeleton active={true} />
      <Skeleton active={true} />
      <Skeleton active={true} />
    </>
  )
}

export default CardProductLoading
