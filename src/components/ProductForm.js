import { notification, Select, Skeleton, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { GlobalContext } from '../context/GlobalContext'

const ProductForm = ({type}) => {
  const {id} = useParams()
  const { isLoading, setIsLoading, getAllProducts, setCtxHolder } = useContext(GlobalContext)
  const [product, setProduct] = useState(
    {
      "nama": "",
      "is_diskon": false,
      "harga": '0',
      "harga_diskon": '0',
      "stock": '0',
      "description": "",
      "category": "",
      "image_url": ""
  }
  )
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
      placement: 'topLeft'
    });
  };

  useEffect(()=>{
    if (type === 'update'){
      setIsLoading(true)
      axios.get(`https://arhandev.maisyah.id/api/final/products/${id}`)
        .then((res) => {
          setProduct((state)=>({
            ...state,
            'nama': res.data.data.nama,
            'is_diskon': res.data.data.is_diskon,
            'harga': res.data.data.harga,
            'harga_diskon': res.data.data.harga_diskon,
            'stock': res.data.data.stock,
            'description': res.data.data.description,
            'category': res.data.data.category,
            'image_url': res.data.data.image_url
          }))
        }).catch(() => {
        navigate('/')
        }).finally(()=>{
          setIsLoading(false)
        })
    }
    setCtxHolder(contextHolder)
  },[id])// eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (values) => {
    setIsLoading(true)
    let token = localStorage.getItem('token')
    if(type === 'create'){
      axios.post('https://arhandev.maisyah.id/api/final/products',
        values,
        {headers: {
          Authorization : `Bearer ${token}`
      }}).then(res => {
        getAllProducts()
        setProduct({
          "nama": "",
          "is_diskon": false,
          "harga": 0,
          "harga_diskon": 0,
          "stock": 0,
          "description": "",
          "category": "",
          "image_url": ""
        })
        navigate('/setting')
        openNotificationWithIcon('success', 'Success', res.data.info)
      }).catch(err => {
        openNotificationWithIcon('error', 'Failed', err.response.data.info)
      }).finally(()=>{
        setIsLoading(false)
      })
    }
    if(type === 'update'){
      axios.put(`https://arhandev.maisyah.id/api/final/products/${id}`,
        values,
        {headers: {
          Authorization : `Bearer ${token}`
      }}).then(res => {
        getAllProducts()
        setProduct({
          "nama": "",
          "is_diskon": false,
          "harga": 0,
          "harga_diskon": 0,
          "stock": 0,
          "description": "",
          "category": "",
          "image_url": ""
        })
        navigate('/setting')
        openNotificationWithIcon('success', 'Success', res.data.info)
      }).catch(err => {
        openNotificationWithIcon('error', 'Failed', err.response.data.info)
      }).finally(()=>{
        setIsLoading(false)
      })
    }
  }

  const productSchema = Yup.object({
    nama: Yup.string().required(),
    harga: Yup.number().required().min(1000),
    harga_diskon : Yup.number().required().min(0),
    stock: Yup.number().required().min(1),
    category: Yup.string().required(),
    image_url:Yup.string().required().url(),
    // description: Yup.string().required()
  })
  return (
    <>
      <Formik
        initialValues={product}
        validationSchema={productSchema}
        onSubmit={(values)=> handleSubmit(values)}
        enableReinitialize
      >
        {({
          errors,
          touched,
          values,
          setValues
        }) => {
          console.log(errors);
          return(
            isLoading ? <Skeleton/> : <Form >
              <div className='w-10/12 mx-auto p-5 grid grid-cols-1  lg:grid-cols-2'>
                <div 
                  className='lg:w-6/12 p-1 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2 lg:w-96'>
                      <label>Product Name</label>
                      <Field 
                        className='border rounded-md border-blue-500 w-full h-9 px-2 -mb-2'
                        type='text' name='nama' placeholder='Product Name'
                      />
                      <p className='text-red-500 relative'>{touched.nama && errors.nama}</p>
                    </div>
                    <div className='flex flex-col gap-2 lg:w-96'>
                      <label>Price</label>
                      <Field 
                        className='border rounded-md border-blue-500 w-full h-9 px-2 -mb-2'
                        type='number' name='harga' placeholder='Price'
                      />
                      <p className='text-red-500'>{touched.harga && errors.harga}</p>
                    </div>
                    <div className='flex gap-2 lg:w-96'>
                      <label>Activate Discount</label>
                      <Switch 
                        className='bg-slate-400'
                        checked={values.is_diskon} 
                        onChange={(checked) => setValues({...values, is_diskon: checked})}
                      />
                    </div>
                    {!values.is_diskon ? null : <div className='flex flex-col gap-2 lg:w-96'>
                      <label>Discount Price</label>
                      <Field 
                        className='border rounded-md border-blue-500 w-full h-9 px-2 -mb-2'
                        type='number' name='harga_diskon' placeholder='Discount Price'
                      />
                      <p className='text-red-500'>{touched.harga_diskon && errors.harga_diskon}</p>
                    </div>}
                    <div className='flex flex-col gap-2 lg:w-96'>
                      <label>Stock</label>
                      <Field 
                        className='border rounded-md border-blue-500 w-full h-9 px-2 -mb-2'
                        type='number' name='stock' placeholder='Stock'
                      />
                      <p className='text-red-500'>{touched.stock && errors.stock}</p>
                    </div>
                </div>
                
                <div 
                  className='lg:w-6/12 p-1 flex flex-col gap-4 '>
                    <div className='flex flex-col gap-2 lg:w-96 '>
                      <label>Image Url</label>
                      <Field 
                        className='border rounded-md border-blue-500 w-full h-9 px-2 -mb-4'
                        type='text' name='image_url' placeholder='Image Url'
                      />
                    </div>
                    <p className='text-red-500'>{touched.image_url && errors.image_url}</p>
                    <div className='flex flex-col gap-2 lg:w-96 '>
                      <label>Category</label>
                      <Select
                        value={values.category} className='border rounded-md border-blue-500 w-full h-9 px-2 -mb-4'
                        bordered={false} 
                        onChange={(value)=>{setValues({...values, category:value})}}
                        options={[
                          { value: '', label:'Select Category', disabled:true },
                          { value: 'teknologi', label:'Teknologi' },
                          { value: 'makanan', label:'Makanan' },
                          { value: 'minuman', label:'Minuman' },
                          { value: 'kesehatan', label:'Kesehatan' },
                          { value: 'lainnya', label:'Lainnya' },
                        ]}
                      />
                    </div>
                    <p className='text-red-500'>{touched.category && errors.category}</p>
                    <div className='flex flex-col gap-2 lg:w-96 '>
                      <label>Description</label>
                      <TextArea 
                        style={{ height: 100, resize: 'none' }}
                        className='border rounded-md border-blue-500 w-full px-2 -mb-4'
                        value={values.description} placeholder='Product Description'
                        onChange={(e)=>{setValues({...values, description:e.target.value })}}
                      />
                    </div>
                    <p className='text-red-500'>{touched.description && errors.description}</p>
                    <div className='flex flex-col gap-2 lg:w-96'>
                      <button
                        type='submit'
                        className='bg-blue-500 border-2 border-blue-500 text-white w-full h-9 px-2 font-bold'
                      >
                        {type==='create' ? 'Create Product' : 'Update Product'}
                      </button>
                    </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default ProductForm
