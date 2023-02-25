import React from 'react'
import { Link } from 'react-router-dom'

const getDiskonPercentage = (item) => {
  return Math.floor((item.harga - item.harga_diskon) / item.harga *100)
}

const CardProduct = ({item}) => {
  return (
    <Link to={`/product/${item.id}`} key={item.id} 
      className='rounded-2xl shadow-md overflow-hidden hover:text-slate-900
      hover:scale-105 transition duration-300 ease-in-out
      '>
      <img 
        className='h-56 w-full object-cover object-center'
        src={item.image_url} alt={item.nama} />
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-sm'>{item.nama}</p>
        {item.is_diskon === 1 && <p className='font-bold text-xl'>Rp {item.harga_diskon_display}</p>}
        {
          item.is_diskon 
            ? <div className='flex text-xs gap-2'>
                <p className='p-1 rounded-md bg-red-300 text-red-700'>{getDiskonPercentage(item)}%</p>
                <p className='line-through '>Rp {item.harga_display}</p>
              </div>
            : <p className='font-bold text-xl'>Rp {item.harga_display}</p>
        }
        <p className='text-sm text-slate-500'>Stock {item.stock} </p>
      </div>
    </Link>
  )
}

export default CardProduct
