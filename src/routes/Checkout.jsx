import React from 'react'
import { useRecoilState } from 'recoil'
import { shoppingCartState } from './Home'
import Header from '../components/Header'

function Checkout() {
  const [cart, setCart] = useRecoilState(shoppingCartState)
  let cartTotal = 0
  cart.forEach((product) => {
    cartTotal += product.price
  })
  console.log(cartTotal)


  return (
    <div >
      <Header></Header>
      <div className="flex flex-col justify-center items-center p-4 h-full">
        {(cart.length) ?
          <div className="w-4/5 products overflow-y-auto ">
            {cart.map((product) => {
              return (
                <div className="card card-compact card-bordered w-full mb-4 ">
                  <div className="card-body text-center items-center ">
                    <div className="card-title">{product.title}</div>
                    <p>${product.price}</p>
                  </div>
                </div>
              )
            })}
          </div>
          : <div className="min-h-screen"> No hay nada en el carrito :( </div>
        }
      </div>
      {(cart.length > 0) &&
        <div className="w-full bg-base-200 p-4 sticky bottom-0 min-h-[10rem] checkoutDescription flex flex-col justify-center items-center ">
          <p className="totalPrice flex flex-col text-center items-center w-4/5 mb-2">
            Subtotal: ${cartTotal.toLocaleString()}
          </p>
          <p className="totalPrice flex flex-col text-center items-center w-4/5 mb-2">
            Shipping: ${(cartTotal * 0.10).toLocaleString()}
          </p>
          <p className="totalPrice flex flex-col text-center items-center w-4/5 mb-2">
            Total: ${Math.ceil(cartTotal / 0.90).toLocaleString()}
          </p>
          <button className='btn btn-primary w-4/5 shadow-md ' >Continuar</button>
        </div>}
    </div>
  )
}

export default Checkout