import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { productsState } from '../ProductsList'
import { getProducts } from '../../utils'
import { supabase } from '../../supabaseClient'

function Product({product}) {
    const [products, setProducts] = useRecoilState(productsState)
    const navigate = useNavigate()

    let grade = (product.ratings.length > 0) ? product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length : 0

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
        <div className="card card-compact bg-base-200 border border-base-300 mb-4 w-full">
            <div className="card-body flex flex-col ">
                <h2 className="card-title"> <Link to={'/products/' + product.id} >{product.title}</Link> </h2>
                <p>Precio: ${product.price.toLocaleString()}</p>
                <p>Calificación: {grade.toFixed(1)}</p>
                <div className="card-actions w-full items-center justify-center m-2">
                    <button className="btn btn-error w-2/5" onClick={() => deleteProduct(product.id)}>Eliminar Producto</button>
                    <button className="btn btn-info w-2/5"  > <Link to={`/products/${product.id}/edit`} >Editar Producto</Link> </button>
                </div>
            </div>

        </div>
    )
}

export default Product