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
  },[])

  return (
    <div className='w-10/12 mx-auto '>
      <FloatButton.BackTop visibilityHeight={0} />
      <div className='w-full rounded-2xl overflow-hidden'>
        <CarrouselMain />
      </div>
      <div className='mt-4'>
        <div className='flex justify-between pr-10 mt-10 mb-5'>
          <h1 className='font-bold text-3xl'>Our Product</h1>
          <Link to={'/catalog'} >
            <button className='bg-slate-900 text-white rounded-md p-2 hover:bg-slate-800' >
            See More
            </button>
          </Link>
        </div>
        <div className='grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full py-2'>
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
                <h1 className='font-bold text-3xl'>Category {category}</h1>
                {/* <Link to={'/catalog'} >
                  <button className='bg-slate-900 text-white rounded-md p-2 hover:bg-slate-800' >
                  See More
                  </button>
                </Link> */}
              </div>
              <div className='grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full py-2'>
                {
                  products.filter((el)=> (el.category === category)).map((item) => {
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
