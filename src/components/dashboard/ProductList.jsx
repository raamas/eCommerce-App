import React from 'react'
import Product from './Product.jsx'
import { atom, useRecoilState } from 'recoil'
import { supabase } from '../../supabaseClient.js'
import { useEffect } from 'react'
import { productsState } from '../ProductsList.jsx'
import { Link } from 'react-router-dom'
import { getProducts } from '../../utils.js'

function ProductListDashboard() {
    const [products, setProducts] = useRecoilState(productsState)

    useEffect(() => {
        let invokeGetProducts = async () => {
            let data = await getProducts()
            setProducts(data)
        }

        invokeGetProducts()
    }, [])


    return (
        <div className='flex flex-row items-center justify-center flex-wrap '>
            {(products) &&
                products.map((product) => {
                    return (
                        <Product product={product} />
                    )
                })
            }
        </div>
    )
}

export default ProductListDashboard