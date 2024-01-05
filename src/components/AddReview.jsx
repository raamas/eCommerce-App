import React from 'react'
import { userState } from '../routes/Login.jsx'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import { Rating, ThinStar } from '@smastrom/react-rating';
import { supabase } from '../supabaseClient.js';

const ratingStyle = {
    itemShapes: ThinStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
}


function AddReview({ productId }) {
    const user = useRecoilValue(userState)
    const [rating, setRating] = useState()
    const [successMessage, setSuccessMessage] = useState()

    const handleReview = async () => {
        let res = await supabase.from('products')
            .select('ratings')
            .eq('id', productId)
            .single()



        let { data, error } = await supabase.from('products')
            .update({
                ratings:
                    [...res.data.ratings, rating]
            })
            .eq('id', productId)
            .select()


        if (!data) {
            console.log(error)
        }

        setSuccessMessage('Calificación enviada')

    }

    return (
        <>
            {user.id
                ?
                <div className="review flex items-center justify-center flex-col">
                    <p className='mb-2'>Deja tu calificación:</p>
                    <Rating value={rating} onChange={setRating} style={{ maxWidth: '20em', maxHeight: '3em', }} itemStyles={ratingStyle} />
                    <button onClick={handleReview} className='btn btn-accent w-full my-2'>Enviar calificación</button>
                    {successMessage}
                </div>
                : <p>Inicia sesión para dejarnos tu  calificación de este producto</p>
            }
        </>
    )
}

export default AddReview