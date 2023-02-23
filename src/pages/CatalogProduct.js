import React, { useContext } from 'react'
import CardProduct from '../components/CardProduct'
import { GlobalContext } from '../context/GlobalContext'


const CatalogProduct = () => {
  const {products} = useContext(GlobalContext)
  return (
    <div className='w-10/12 mx-auto '>
      <div className='mt-4'>
        <div className='flex justify-between pr-10 mt-10 mb-5'>
          <h1 className='font-bold text-3xl'>Product Catalogue</h1>
        </div>
        <div className='grid gap-4 grid-cols-5 w-full py-2'>
          {
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
