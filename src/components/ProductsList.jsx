import React from 'react'
import Product from './Product.jsx'
import { atom, useRecoilState } from 'recoil'
import { supabase } from '../supabaseClient.js'
import { useEffect } from 'react'

export const productsState = atom({
    key: 'productsState',
    default: []
})

function ProductsList() {
    const [products, setProducts] = useRecoilState(productsState)

    useEffect(() => {
      const getProducts = async ()=>{
        let {data, error} = await supabase
        .from('products')
        .select()

        if(!data){
            console.log(error.stack)
        }
        
        setProducts(data)
      }

      getProducts()
    }, [])
    

  return (
    <div className='flex flex-row items-center justify-center flex-wrap p-2'>
        { (products) && 
            products.map((product)=>{
                return <Product key={product.id} product={product}/>
            })
        }
    </div>
  )
}

export default ProductsList