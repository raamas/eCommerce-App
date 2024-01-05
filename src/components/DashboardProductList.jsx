import React from 'react'
import Product from './Product.jsx'
import { atom, useRecoilState } from 'recoil'
import { supabase } from '../supabaseClient.js'
import { useEffect } from 'react'
import { productsState } from './ProductsList.jsx'

// export const productsState = atom({
//     key: 'productsState',
//     default: []
// })

function ProductListDashboard() {
    const [products, setProducts] = useRecoilState(productsState)

    useEffect(() => {
        const getProducts = async () => {
            let { data, error } = await supabase
                .from('products')
                .select()

            if (!data) {
                console.log(error.stack)
            }

            setProducts(data)
        }

        getProducts()
    }, [])


    return (
        <div className='flex flex-row items-center justify-center flex-wrap p-2'>
            {(products) &&
                products.map((product) => {
                    let grade = (product.ratings.length > 0) ? product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length : 0

                    return (
                        <div key={product.id} className="card card-compact bg-base-300 mb-4 w-full">
                            <div className="card-body min-w-2/5 flex flex-row items-center justify-center">
                                <h2 className="card-title">{product.title}</h2>
                                <p>${product.price.toLocaleString()}</p>
                                <p>{grade.toFixed(1)}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductListDashboard