import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { shoppingCartState } from './Home.jsx'
import Header from '../components/Header.jsx'
import { supabase } from '../supabaseClient.js'
import { userState } from './Login.jsx'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const [cart, setCart] = useRecoilState(shoppingCartState)
  const [orders, setOrders] = useState([])
  const user = useRecoilValue(userState)
  const navigate = useNavigate()

  let cartTotal = 0

  cart.forEach((product) => {
    cartTotal += product.price
  })



  const sendOrders = async (e) => {
    e.preventDefault()
    let res = await supabase
      .from('orders')
      .insert({
        buyerId: user.id
      }).select()

    if(res.data){
      navigate('/success')
      setCart([])
    }

    // for (const item of cart) {
    //   res = await supabase
    //     .from('product_order')
    //     .insert({
    //       orderId: '',
    //       productId: ''
    //     })

    //   console.log(res)
    // }
  }


  return (
    <div >
      <Header></Header>
      <main className='min-h-max-content'>
        <div className="flex flex-col justify-center items-center p-4 h-full">

          {(cart.length) ?
            <div className="w-4/5 products overflow-y-auto ">
              {cart.map((product) => {

                return (
                  <div key={product.id} className="card card-compact card-bordered w-full mb-4 ">
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
      </main>



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

          <button className="btn btn-primary" onClick={sendOrders}>Comprar</button>
        {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
        {/* <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Pero antes necesitamos saber algo</h3>
            <p className="py-4">rellena el formulario con esta información adicional</p>

            <form className="form flex flex-col justify-center items-center w-4/5 p-2" onSubmit={sendOrders}>
              <textarea className='textarea textarea-bordered textarea-primary mb-2 w-full focus:invalid:input-error' type='text' id='orderNotes' />
              <button className='btn btn-primary w-full' type='submit'>Ingresar</button>
            </form>

            <div className="modal-action">
              <form method='dialog'>
                <button>Cerrar</button>
              </form>
            </div>
          </div>
        </dialog> */}

      </div>


    </div>
  )
}

export default Checkout