import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState } from '../routes/Login.jsx'
import { shoppingCartState } from '../routes/Home.jsx'

function AddToCart({product}) {
  const user = useRecoilValue(userState)
  const [cart, setCart] = useRecoilState(shoppingCartState)

  const addProductToCart = (e) => {
    setCart([...cart, product])
    e.target.innerText = 'Añadido al carrito!'
  }

  return (
    <>
    {user.id 
    ?<button className='btn btn-secondary w-full mt-2' onClick={(e) => addProductToCart(e)} > Añadir al carrito </button>
    :<button className='btn btn-disabled btn-secondary w-full mt-2' onClick={(e) => addProductToCart(e)} > Añadir al carrito </button>
    }
    </>
  )
}

export default AddToCart