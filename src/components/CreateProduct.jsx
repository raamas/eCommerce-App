import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { v4 as uuid } from 'uuid'
import { useRecoilValue } from 'recoil'
import { userState } from '../routes/Login.jsx'
import { productsState } from './ProductsList.jsx'
import { useRecoilState } from 'recoil'
import { getProducts } from '../utils.js'


function CreateProduct() {
    const user = useRecoilValue(userState)
    const [products, setProducts] = useRecoilState(productsState)
    const [uploadMessage, setUploadMessage] = useState()
    const [query, setQuery] = useState({
        productTitle: '',
        productPrice: 0,
        productDescription: '',
        productImage: ''
    })

    const uploadImage = async () => {
        console.log('uploading image')

        const productImage = document.body.getElementsByClassName('productImage')[0].files[0]
        let imageExtension = String().split('.').pop()



        let res = await supabase.storage
            .from("products-pictures")
            .upload(`images/${uuid()}.${imageExtension}`, productImage)



        res = await supabase
            .storage
            .from('products-pictures')
            .getPublicUrl(res.data.path)



        if (res.data) {
            setQuery({ ...query, productImage: res.data.publicUrl })
            setUploadMessage('Imagen subida correctamente')

        }
    }

    const handleCreateProduct = async () => {
        let res = await supabase
            .from('products')
            .insert({
                title: query.productTitle,
                description: query.productDescription,
                price: query.productPrice,
                sellerId: user.id,
                image: query.productImage
            })
            .select()



        if (res.data) {
            setQuery({
                productTitle: '',
                productPrice: 0,
                productDescription: '',
                productImage: ''
            })
        }

        let data = await getProducts()
        setProducts(data)
        setUploadMessage('')
    }

    return (
        <div className='flex flex-col items-center justify-center my-8'>
            <h1 className='text-lg font-semibold'>Añadir producto</h1>
            <p className='my-2 text-success-content'>{uploadMessage}</p>

            <label className='my-4 font-semibold'>Imagen del producto</label>
            <input type="file" name="productImage" id="productImage" className='productImage' onChange={uploadImage} />

            <label className='mt-2 font-semibold'>Titulo del producto</label>
            <input type="text" className='input input-primary m-2 w-full' required placeholder='Escribe el titulo de tu producto' name='productTitle' id='productTitle' value={query.productTitle} onChange={(e) => setQuery({ ...query, productTitle: e.target.value })} />

            <label className='mt-2 font-semibold'>Precio del producto</label>
            <input type="number" className='input input-primary m-2 w-full' required placeholder='Escribe el precio de tu producto' name='productPrice' id='productPrice' value={query.productPrice} onChange={(e) => setQuery({ ...query, productPrice: e.target.value })} />

            <label className='mt-2 font-semibold'>Descripción del producto</label>
            <input type="text" className='input input-primary m-2 w-full' required placeholder='Escribe una descripción para tu producto' name='productDescription' id='productDescription' value={query.productDescription} onChange={(e) => setQuery({ ...query, productDescription: e.target.value })} />

            <button className='btn btn-primary w-full m-2' onClick={handleCreateProduct}>Crear</button>
        </div>
    )
}

export default CreateProduct