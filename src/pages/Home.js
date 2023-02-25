import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CardProduct from '../components/CardProduct'
import CarrouselMain from '../components/CarrouselMain'
import { GlobalContext } from '../context/GlobalContext'

const Home = () => {
  const {products} = useContext(GlobalContext)
  return (
    <div className='w-10/12 mx-auto '>
      <div className='w-full rounded-2xl overflow-hidden'>
        <CarrouselMain />
      </div>
      <div className='mt-4'>
        <div className='flex justify-between pr-10 mt-10 mb-5'>
          <h1 className='font-bold text-3xl'>Daftar Product</h1>
          <Link to={'/catalog'} >
            <button className='bg-slate-900 text-white rounded-md p-2 hover:bg-slate-800' >
            See More
            </button>
          </Link>
        </div>
        <div className='grid gap-4 grid-cols-5 w-full py-2'>
          {
            products.map((item) => {
              return(
              <CardProduct item={item} />
            )})
          }
        </div>
      </div>
    </div>
  )
}

export default Home
