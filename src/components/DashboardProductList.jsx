import React from 'react'
import Product from './Product.jsx'
import { atom, useRecoilState } from 'recoil'
import { supabase } from '../supabaseClient.js'
import { useEffect } from 'react'
import { productsState } from './ProductsList.jsx'
import { Link } from 'react-router-dom'
import { getProducts } from '../utils.js'

// export const productsState = atom({
//     key: 'productsState',
//     default: []
// })

function ProductListDashboard() {
    const [products, setProducts] = useRecoilState(productsState)

    useEffect(() => {
        let invokeGetProducts = async () => {
            let data = await getProducts()
            setProducts(data)
        }

        invokeGetProducts()
    }, [])


    const deleteProduct = async (productId) => {
        console.log(`Deleting Product: ${productId}`)
        let res = await supabase.from('products')
            .delete()
            .eq('id', productId)

        console.log(res)

        console.log('updating products list')
        if (res.data) {
            setProducts(res.data)
            console.log('success')
        }

        let data = await getProducts()
        setProducts(data)
        console.log(res)

    }

    return (
        <div className='flex flex-row items-center justify-center flex-wrap '>
            {(products) &&
                products.map((product) => {
                    let grade = (product.ratings.length > 0) ? product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length : 0

                    return (
                        <div key={product.id} className="card card-compact bg-base-300 mb-4 w-full">
                            <div className="card-body flex flex-col ">
                                <h2 className="card-title"> <Link to={'/products/' + product.id} >{product.title}</Link> </h2>
                                <p>Precio: ${product.price.toLocaleString()}</p>
                                <p>Calificación: {grade.toFixed(1)}</p>
                                <div className="card-actions w-full items-center justify-center m-2">
                                    <button className="btn btn-error w-2/5" onClick={() => deleteProduct(product.id)}>Eliminar Producto</button>
                                    <button className="btn btn-info w-2/5" disabled onClick={() => deleteProduct(product.id)}>Editar Producto</button>
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductListDashboard