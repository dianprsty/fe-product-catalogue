import React from 'react'
import ProductForm from '../components/ProductForm'

const CreateProduct = () => {
  return (
    <div className='md:w-10/12 mx-auto border bg-white pt-8'>
      <p className='md:text-3xl text-blue-500 font-bold w-10/12 mx-auto px-5'>Create Product</p>
      <ProductForm type={'create'}/>
    </div>
  )
}

export default CreateProduct
