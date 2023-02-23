import axios from "axios";
import { createContext, useEffect, useState } from "react";


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

  const getAllProducts = () => {
    axios.get('https://arhandev.maisyah.id/api/final/products')
      .then(res => {
        setProducts(res.data.data)
        setCategories(getCategory(res.data.data))
      }).catch(err => console.log(err))
  }

  useEffect(()=>{
    getAllProducts()
  },[])
  return(
    <GlobalContext.Provider
      value={
        {
          products,
          categories,
          setProducts,
          getAllProducts
        }
      }
    >
      {children}
    </GlobalContext.Provider>
  )
}