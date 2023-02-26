import { FloatButton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import CardProduct from '../components/CardProduct'
import CardProductLoading from '../components/CardProductLoading'
import { GlobalContext } from '../context/GlobalContext'


const CatalogProduct = () => {
  const {products, getAllProducts} = useContext(GlobalContext)
  const [isCardLoading, setIsCardLoading] = useState(false)

  useEffect(()=>{
    setIsCardLoading(true)
    getAllProducts()
    .finally(()=>{
      setIsCardLoading(false)
    })
  },[])

  return (
    <div className='w-10/12 mx-auto '>
      <FloatButton.BackTop visibilityHeight={0} />
      <div className='mt-4'>
        <div className='flex justify-between pr-10 mt-10 mb-5'>
          <h1 className='font-bold text-3xl'>Product Catalogue</h1>
        </div>
        <div className='grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full py-2'>
          { isCardLoading ? <>
              <CardProductLoading />
              <CardProductLoading />
            </> :
            products.map((item) => {
              console.log(item)
              return(
              <CardProduct item={item} />
            )})
          }
        </div>
      </div>
    </div>
  )
}

export default CatalogProduct
