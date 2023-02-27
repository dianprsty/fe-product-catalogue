import { InboxOutlined } from '@ant-design/icons'
import { Button, FloatButton, Input, InputNumber, Result, Select, Space } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import CardProduct from '../components/CardProduct'
import CardProductLoading from '../components/CardProductLoading'
import { GlobalContext } from '../context/GlobalContext'


const CatalogProduct = () => {
  const {products, getAllProducts} = useContext(GlobalContext)
  const [isCardLoading, setIsCardLoading] = useState(false)
  const [displayProducts, setDisplayProducts] = useState(products)
  const [ category, setCategory ] = useState('all')
  const [ search, setSearch ] = useState('')
  const [diskon, setDiskon] =useState('all')
  const [min, setMin] =useState(0)
  const [max, setMax] =useState(0)
  

  const filterProduct = () =>{
    let filteredProduct =  products.filter(item => {
      let isHarga = false
      if (item.is_diskon){
        isHarga = (item.harga_diskon >= min || !min)
                  && (item.harga_diskon <= max || !max)
      }else{
        isHarga = (item.harga >= min || !min)
                  && (item.harga <= max || !max)
      }
      return (item.category === category || category === 'all') 
              && ((item.nama.toLowerCase().includes(search.toLowerCase()) || !search))
              // eslint-disable-next-line
              && (item.is_diskon == diskon || diskon === 'all')
              && isHarga
    })
    setDisplayProducts(filteredProduct)
  }


  useEffect(()=>{
    setIsCardLoading(true)
    getAllProducts()
    .finally(()=>{
      setIsCardLoading(false)
    })
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(()=> {
    filterProduct()
  // eslint-disable-next-line
  },[products, category, search, diskon, min, max])

  return (
    <div className='w-10/12 lg:w-full mx-auto flex justify-end gap-8 items-start top-0 lg:pr-16 lg:-mt-[100px]'>
      <FloatButton.BackTop visibilityHeight={0} />
      <div 
        className='shadow-xl lg:h-screen lg:fixed lg:left-0 bg-white hidden lg:flex' 
      >
        <div className='flex flex-col gap-2 items-start justify-center mb-3 lg:p-8'>
          <p className='text-left font-bold text-xl text-blue-500'>Filter Products</p>
          <label className='-mb-2 font-semibold text-blue-400 pt-0'>Product Name</label>
          <Input 
            value={search}
            className='w-60 border'
            allowClear onChange={(e)=>setSearch(e.target.value)} placeholder="Search Product"
          />
          <label className='-mb-2 font-semibold text-blue-400 pt-0'>Category</label>
          <Select
            defaultValue="all" className='w-60 border rounded-md  hover:border-blue-400'
            onChange={setCategory} value={category}
            options={[
              { value: 'all', label:'All Category' },
              { value: 'teknologi', label:'Teknologi' },
              { value: 'makanan', label:'Makanan' },
              { value: 'minuman', label:'Minuman' },
              { value: 'kesehatan', label:'Kesehatan' },
              { value: 'lainnya', label:'Lainnya' },
            ]}
          />
          <label className='-mb-2 font-semibold text-blue-400 pt-0'>Discount Status</label>

          <Select
            defaultValue="all" className='w-60 border rounded-md  hover:border-blue-400'
            onChange={setDiskon} value={diskon}
            options={[
              { value: 'all', label:'All Discount Status' },
              { value: '0', label:'Normal Price' },
              { value: '1', label:'Discount' },
            ]}
          />

          <label className='-mb-2 font-semibold text-blue-400 pt-0'>Minimum Price</label>
          <Space className='w-60'>
            <InputNumber className='w-40' min={0} max={2147483647} value={min} onChange={setMin} />
            <Button
              className='bg-blue-500 text-white font-semibold'
              onClick={() => {
                setMin(0);
              }}
            >
              Reset
            </Button>
          </Space>

          <label className='-mb-2 font-semibold text-blue-400 pt-0'>Maximum Price</label>
          <Space className='w-60'>
            <InputNumber className='w-40' min={0} max={2147483647} value={max} onChange={setMax} />
            <Button
              className='bg-blue-500 text-white font-semibold'
              onClick={() => {
                setMax(0);
              }}
            >
              Reset
            </Button>
          </Space>
          <Button
            className='border-blue-500 text-blue-500 font-semibold rounded-md w-60 mt-2'
            onClick={() => {
              setSearch('')
              setCategory('all')
              setDiskon('all')
              setMin(0)
              setMax(0)
              setDisplayProducts(products);
            }}
          >
            Reset Filter
          </Button>
        </div>
      </div>
      <div className='lg:pl-96 lg:pt-[100px]'>
        <div className='flex justify-between mb-5'>
          <h1 className='font-bold text-blue-500 text-3xl'>Product Catalogue</h1>
        </div>
        <div className='grid gap-4 grid-cols-2 grid-flow-dense sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 w-full py-2'>
          { isCardLoading 
              ? <>
                  <CardProductLoading />
                  <CardProductLoading />
                </> 
              : displayProducts.length === 0 
                  ? <Result
                      icon={<InboxOutlined />}
                      title="Not Found"
                      subTitle="Sorry, the product you search does not exist."
                    />
                  : displayProducts.map((item) => {
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
