import React from 'react'
import { userState } from '../routes/Login'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import { shoppingCartState } from '../routes/Home'

function Product({ product }) {
    const [cart, setCart] = useRecoilState(shoppingCartState)
    const user = useRecoilValue(userState)


    const addProductToCart = (e) => {
        setCart([...cart, product])
        e.target.innerText = 'Añadido al carrito!'
        console.log(cart)
    }
    return (
        <div className="card card-bordered shadow-sm m-2 w-full">
            <div className="card-body">
                <h3 className="card-title"> <Link to={'/products/' + product.id} >{product.title}</Link> </h3>
                {/* <p className=' text-ellipsis' >{product.description}</p> */}
                <p>${product.price.toLocaleString()}</p>
                {(user.id) &&
                    <div className="card-actions items-center justify-center">
                        <button className='btn btn-primary w-full mt-2'> <Link to='/checkout'>Comprar</Link> </button>
                        <button className='btn btn-secondary w-full mt-2' onClick={(e) => addProductToCart(e)} > Añadir al carrito </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Product