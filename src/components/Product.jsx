import React from 'react'
import { userState } from '../routes/Login.jsx'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import { shoppingCartState } from '../routes/Home.jsx'
import AddToCart from './AddToCart.jsx'

function Product({ product }) {
    const user = useRecoilValue(userState)

    return (
        <div className="card card-bordered shadow-sm m-2 w-full">
            <div className="card-body">
                <h3 className="card-title"> <Link to={'/products/' + product.id} >{product.title}</Link> </h3>
                <p>${product.price.toLocaleString()}</p>
                {(user.id) &&
                    <div className="card-actions items-center justify-center">
                        <button className='btn btn-primary w-full mt-2'> <Link to='/checkout'>Comprar</Link> </button>
                        <AddToCart product={product}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Product