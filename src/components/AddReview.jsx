import React from 'react'
import { userState } from '../routes/Login.jsx'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import { Rating, ThinStar } from '@smastrom/react-rating';

const ratingStyle = {
    itemShapes: ThinStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
  }
  

function AddReview() {
    const user = useRecoilValue(userState)

    const [rating, setRating] = useState()

    return (
        <>
            {user.id
                ?
                <div className="review flex items-center justify-center flex-col">
                    <p>Deja tu calificación:</p>
                    <Rating value={rating} onChange={setRating} style={{ maxWidth: '20em', maxHeight: '3em' }} itemStyles={ratingStyle} />
                </div>
                : <p>Inicia sesión para dejarnos tu  calificación de este producto</p>
            }
        </>
    )
}

export default AddReview