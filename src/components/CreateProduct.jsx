import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

function CreateProduct() {
    const [query, setQuery] = useState()

    const handleCreateProduct = async () => {
        const productImage = document.body.getElementsByClassName('productImage')[0].files[0]

        console.log(productImage)
        const res = await supabase.storage
        .from("products-pictures")
        .upload('image.jpg', productImage)

        console.log(res)
    }
    return (
        <div>
            <h1>Añadir producto</h1>
            <input type="file" name="productImage" id="productImage" className='productImage' />
            {/* <input type="text" name='productTitle' id='productTitle' /> */}
            <button className='btn btn-primary' onClick={handleCreateProduct}>Crear</button>
        </div>
    )
}

export default CreateProduct