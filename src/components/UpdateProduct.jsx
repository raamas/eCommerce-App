import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { v4 as uuid } from 'uuid'
import { useRecoilValue } from 'recoil'
import { userState } from '../routes/Login.jsx'
import { productsState } from './ProductsList.jsx'
import { useRecoilState } from 'recoil'
import { getProducts } from '../utils.js'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Product from './Product.jsx'

export const loader = async ({ params }) => {
    let { data, error } = await supabase.from('products')
      .select()
      .eq('id', params.productId)
      .single()
  
    return data
  }
  
function UpdateProduct() {
    const [updateMessage, setUpdateMessage] = useState()
    const user = useRecoilValue(userState)
    const product = useLoaderData()
    const navigate = useNavigate()

    const [query, setQuery] = useState({
        productTitle: product.title,
        productPrice: product.price,
        productDescription: product.description,
        productImage: product.image,
    })

    useEffect(() => {
        // console.log()
        if (user?.user_metadata?.admin != "true") {
          navigate('/')
        }
      }, [user])


    // const uploadImage = async () => {
    //     console.log('uploading image')

    //     const productImage = document.body.getElementsByClassName('productImage')[0].files[0]
    //     let imageExtension = String().split('.').pop()



    //     let res = await supabase.storage
    //         .from("products-pictures")
    //         .upload(`images/${uuid()}.${imageExtension}`, productImage)



    //     res = await supabase
    //         .storage
    //         .from('products-pictures')
    //         .getPublicUrl(res.data.path)



    //     if (res.data) {
    //         setQuery({ ...query, productImage: res.data.publicUrl })
    //         setUploadMessage('Imagen subida correctamente')

    //     }
    // }

    const handleUpdateProduct = async () => {
       

        let res = await supabase
            .from('products')
            .update({
                title: query.productTitle,
                description: query.productDescription,
                price: query.productPrice,
                sellerId: user.id,
                image: query.productImage
            })
            .eq('id',product.id)
            .select()



        if (res.data) {
            // setQuery({
            //     productTitle: '',
            //     productPrice: 0,
            //     productDescription: '',
            //     productImage: ''
            // })
            navigate('/dashboard')

        }

        // let data = await getProducts()
        // setProducts(data)
        // setUploadMessage('')
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <main className=' flex flex-col items-center justify-center'>
                
                <div className='flex flex-col items-center justify-center my-8'>
                    <h1 className='text-lg font-semibold'>Editar producto</h1>
                    <p className='my-2 text-success-content'>{updateMessage}</p>

                    <label className='mt-2 font-semibold'>Titulo del producto</label>
                    <input type="text" className='input input-primary m-2 w-full' required placeholder='Escribe el titulo de tu producto' name='productTitle' id='productTitle' value={query.productTitle} onChange={(e) => setQuery({ ...query, productTitle: e.target.value })} />

                    <label className='mt-2 font-semibold'>Precio del producto</label>
                    <input type="number" className='input input-primary m-2 w-full' required placeholder='Escribe el precio de tu producto' name='productPrice' id='productPrice' value={query.productPrice} onChange={(e) => setQuery({ ...query, productPrice: e.target.value })} />

                    <label className='mt-2 font-semibold'>Descripción del producto</label>
                    <textarea className='textarea textarea-primary textarea-lg  text-sm m-2 w-full min-h-max-content'  required placeholder='Escribe una descripción para tu producto' name='productDescription' id='productDescription' value={query.productDescription} onChange={(e) => setQuery({ ...query, productDescription: e.target.value })} />

                    {/* <label className='my-4 font-semibold'>Imagen del producto</label>
            <input type="file" name="productImage" id="productImage" className='productImage' onChange={uploadImage} /> */}

                    <button className='btn btn-primary w-full m-2' onClick={handleUpdateProduct}>Actualizar</button>
                </div>
            </main>
        </div>
    )
}

export default UpdateProduct