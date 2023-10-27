import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { notification} from 'antd'


export const GlobalContext = createContext()

const getCategory = (products) => {
  let categories = products.map(product => (
    product.category
  ))
  categories = categories.filter((item, i) => (
    categories.indexOf(item) === i
  ))
  return categories
}

export const GlobalProvider = ({children}) =>{
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line
  const [api, contextHolder] = notification.useNotification();
  const [ctxHolder, setCtxHolder] = useState(contextHolder)

  const getAllProducts = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`)
      .then(res => {
        setProducts(res.data.data)
        setCategories(getCategory(res.data.data))
      }).catch(err => console.log(err))
  }

  useEffect(()=>{
    getAllProducts()
    // setCtxHolder(contextHolder)
  },[])
  return(
    <GlobalContext.Provider
      value={
        {
          products,
          categories,
          setProducts,
          getAllProducts,
          isLoading,
          setIsLoading,
          ctxHolder,
          setCtxHolder
        }
      }
    >
      {children}
    </GlobalContext.Provider>
  )
}