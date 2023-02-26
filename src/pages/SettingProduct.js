import { DeleteFilled, EditFilled, EyeFilled, InboxOutlined, PlusOutlined } from '@ant-design/icons'
import { FloatButton, Input, Result, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteProduct from '../components/DeleteProduct'
import {GlobalContext} from '../context/GlobalContext'

const SettingProduct = () => {
  const {products} = useContext(GlobalContext)
  const [displayProducts, setDisplayProducts] = useState(products)
  const [ category, setCategory ] = useState('all')
  const [ search, setSearch ] = useState('')
  const navigate = useNavigate()
  

  const filterProduct = () =>{
    let filteredProduct =  products.filter(item => {
      return (item.category === category || category === 'all') 
              && ((item.nama.toLowerCase().includes(search.toLowerCase()) || !search))
    })
    setDisplayProducts(filteredProduct)
  }

  useEffect(()=> {
    filterProduct()
  // eslint-disable-next-line
  },[products, category, search])

  const handleChangeCategory = (value) =>{
    setCategory(value)
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className='w-10/12 mx-auto '>
      <FloatButton.BackTop visibilityHeight={0} />
      <div className='flex flex-col'>
        <p className='text-3xl font-bold py-5'>Setting Product</p>
        <div className='flex gap-4 items-center justify-end mb-3'>
          <Select
            defaultValue="all" className='w-32 border rounded-md border-slate-900 hover:border-blue-400'
            onChange={handleChangeCategory}
            options={[
              { value: 'all', label:'All' },
              { value: 'teknologi', label:'Teknologi' },
              { value: 'makanan', label:'Makanan' },
              { value: 'minuman', label:'Minuman' },
              { value: 'kesehatan', label:'Kesehatan' },
              { value: 'lainnya', label:'Lainnya' },
            ]}
          />
          <Input 
            className='w-40 border-slate-900 border'
            allowClear onChange={(e)=>handleChangeSearch(e)} placeholder="Search Product"
          />
          <Link className='flex items-center gap-2  py-2 px-3 rounded-md text-white font-bold bg-slate-900' 
            to={'/products/create'} >
              <PlusOutlined /> Create Product
          </Link>
        </div>
      </div>
      <div className='w-full shadow-lg bg-white'>
        <table className='table-fixed w-full' >
          <thead className='bg-slate-900 text-white'>
            <tr>
              <th className='p-3'>Image</th>
              <th className='p-3'>Product Name</th>
              <th className='p-3'>Price</th>
              <th className='p-3'>Discount Price</th>
              <th className='p-3'>Stock</th>
              <th className='p-3'>Category</th>
              <th className='p-3'>Owner</th>
              <th className='p-3'>Created At</th>
              <th className='p-3'>Action</th>
            </tr>
          </thead>
          <tbody className='text-sm '>
            {displayProducts.length === 0 
              ? <tr>
                  <td colSpan={9}>
                    <Result
                      icon={<InboxOutlined />}
                      title="Not Found"
                      subTitle="Sorry, the product you search does not exist."
                    />
                  </td>
                </tr>
              : displayProducts.map(item => {
              return (
                <tr className='border-b-2' key={item.id}>
                  <td className='p-2 text-center'>
                    <img className='w-24 h-24 rounded-lg' src={item.image_url} alt={item.name} />
                  </td>
                  <td className='p-2 text-left font-semibold'>{item.nama}</td>
                  <td className='p-2 text-right'>Rp {item.harga_display}</td>
                  <td className='p-2 text-right'>{item.is_diskon ? "Rp "+item.harga_diskon_display : "-"}</td>
                  <td className='p-2 text-center'>{item.stock}</td>
                  <td className='p-2 text-center'>
                    <span className='text-green-900 bg-green-200 p-1 rounded-md ml-2 border border-green-500'>
                      {item.category}
                    </span>
                  </td>
                  <td className='p-2 text-center'>{item.user.name}</td>
                  <td className='p-2 text-center'>{item.created_at}</td>
                  <td className='p-2 text-center flex flex-wrap gap-1 items-center'>
                  <button onClick={()=> navigate(`/product/${item.id}`)}
                      className='pt-4 px-2 flex items-center gap-1 text-blue-500 font-medium'>
                      <EyeFilled /> View
                    </button>
                    <button onClick={()=> navigate(`/products/update/${item.id}`)}
                      className='px-2 -mb-2 flex items-center gap-1 text-green-500 font-medium'>
                      <EditFilled /> Edit
                    </button>
                    <DeleteProduct id={item.id} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SettingProduct
