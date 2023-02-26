import React from 'react'
import ProductForm from '../components/ProductForm'

const UpdateProduct = () => {
  return (
    <div className='md:w-10/12 mx-auto shadow-lg bg-white pt-8'>
      <p className='md:text-3xl font-bold w-10/12 mx-auto px-5'>Update Product</p>
      <ProductForm type={'update'}/>
    </div>
  )
}

export default UpdateProduct
