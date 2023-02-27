import { Skeleton } from 'antd'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'

const getDiskonPercentage = (item) => {
  return Math.floor((item.harga - item.harga_diskon) / item.harga *100)
}

const DetailProduct = () => {
  const {id} = useParams()
  const [product, setProduct] =useState({})
  const { isLoading, setIsLoading } = useContext(GlobalContext)

  useEffect(()=>{
    setIsLoading(true)
    axios.get(`https://arhandev.maisyah.id/api/final/products/${id}`)
      .then(res =>{
        setProduct(res.data.data)
      }).catch(err => {console.log(err)})
      .finally(()=> setIsLoading(false))
  }, [id])// eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <div className='w-8/12 shadow-lg mx-auto flex py-10 border lg:mt-10 bg-white'>
      {!isLoading ? <> <div className='w-6/12 '>
        <img 
         className='w-80 h-80 object-cover mx-auto rounded-lg'
         src={product.image_url} alt={product.name} />
      </div>
      <div className='flex flex-col gap-2 w-6/12'>
        { product.is_diskon === 1 && <p 
          className='p-2 pr-10 bg-red-300 text-red-700 self-end font-semibold'
        >{getDiskonPercentage(product)}% Off</p>}
        <p className='text-2xl font-bold w-10/12'>{product.nama}</p>
        <p className='text-sm py-2'>
          Category  
          <span className='text-xs text-green-600 bg-green-200 p-1 rounded-md ml-2 border border-green-500'>{product.category}</span>
        </p>
        {product.is_diskon === 1 && <p className='font-bold text-3xl text-red-600'>Rp {product.harga_diskon_display}</p>}
        {
          product.is_diskon 
            ? <div className='flex text-sm gap-2'>
                <p className='line-through '>Rp {product.harga_display}</p>
              </div>
            : <p className='font-bold text-3xl'>Rp {product.harga_display}</p>
        }
        <p className='text-sm'>Stock : <span className='font-semibold'>{product.stock}</span></p>
        <div>
          <p className='text-lg font-semibold'>Description</p>
          <p className='text-sm w-10/12 text-justify'>{product.description ? product.description : '-'} </p>
        </div>
      </div>
      </>
      : <Skeleton />
      }     
    </div>
  )
}

export default DetailProduct
