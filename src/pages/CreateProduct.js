import React from 'react'
import ProductForm from '../components/ProductForm'

const CreateProduct = () => {
  return (
    <div className='md:w-10/12 mx-auto shadow-lg'>
      <p className='md:text-3xl font-bold w-10/12 mx-auto px-5'>Create Product</p>
      <ProductForm type={'create'}/>
    </div>
  )
}

export default CreateProduct
