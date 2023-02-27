import { ArrowRightOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardProduct from '../components/CardProduct'
import CardProductLoading from '../components/CardProductLoading'
import CarrouselMain from '../components/CarrouselMain'
import { GlobalContext } from '../context/GlobalContext'

const Home = () => {
  const {products, getAllProducts, categories} = useContext(GlobalContext)
  const [isCardLoading, setIsCardLoading] = useState(false)

  useEffect(()=>{
    setIsCardLoading(true)
    getAllProducts()
    .finally(()=>{
      setIsCardLoading(false)
    })
  },[])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='w-10/12 mx-auto '>
      <FloatButton.BackTop visibilityHeight={0} />
      <div className='w-full rounded-2xl overflow-hidden'>
        <CarrouselMain />
      </div>
      <div className='mt-4'>
        <div className='flex justify-between pr-10 mt-10 mb-5'>
          <h1 className='font-bold text-blue-500 text-xl lg:text-3xl'>Our New Product</h1>
          <Link to={'/catalog'} >
            <button className='text-base  flex  items-center gap-2' >
            <p>See More Product</p> <ArrowRightOutlined />
            </button>
          </Link>
        </div>
        <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-rows-1 w-full py-2'>
          { isCardLoading ? <CardProductLoading/> :
            products.slice(0,5).map((item) => {
              return(
              <CardProduct item={item} />
            )})
          }
        </div>
      </div>
      {
        categories.sort().reverse().map((category)=>{
          return(
            <div className='mt-4'>
              <div className='flex justify-between pr-10 mt-10 mb-5'>
                <h1 className='font-bold text-blue-500 text-xl lg:text-3xl'>Category {category}</h1>
                <Link to={'/catalog'} >
                  <button className='text-base  flex  items-center gap-2' >
                  <p>See More Product</p> <ArrowRightOutlined />
                  </button>
                </Link>
              </div>
              <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full py-2'>
                { isCardLoading ? <CardProductLoading/> :
                  products.filter((el)=> (el.category === category)).slice(0,5).map((item) => {
                    return(
                    <CardProduct item={item} />
                  )})
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home
