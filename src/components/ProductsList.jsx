import React from 'react'
import Product from './Product.jsx'
import { atom, useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { getProducts } from '../utils.js'

export const productsState = atom({
  key: 'productsState',
  default: []
})

function ProductsList() {
  const [products, setProducts] = useRecoilState(productsState)

  useEffect(() => {
    let invokeGetProducts = async () => {
      let data = await getProducts()
      setProducts(data)
    }

    invokeGetProducts()
  }, [])



  return (
    <div className='flex flex-row items-center justify-center flex-wrap p-2'>
      {(products) &&
        products.map((product) => {
          return <Product key={product.id} product={product} />
        })
        
      }
    </div>
  )
}

export default ProductsList