import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { shoppingCartState } from "./Home.jsx";
import Header from "../components/Header.jsx";
import { supabase } from "../supabaseClient.js";
import { userState } from "./Login.jsx";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useRecoilState(shoppingCartState);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [notes, setNotes] = useState("");
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  let cartTotal = 0;

  cart.forEach((product) => {
    cartTotal += product.price;
  });

  const handleNotes = async (e) => {
    // document.getElementById('my_modal_1').closeModal()
    console.log(document.getElementById("my_modal_1"));
    setLoading(true);
    e.preventDefault();
    console.log(notes);

    await handleCheckout();
  };

  const handleCheckout = async () => {
    try {
      let {data: newOrder, error} = await supabase
        .from("orders")
        .insert({
          buyerId: user.id,
          orderNotes: notes,
        })
        .select()
        .single();
      
        if(error) throw new Error(error)
        
        console.log(newOrder);

        for (let item of cart) {
          let createProductOrderRelations = await supabase
            .from("products_orders")
            .insert({
              orderId: newOrder.id,
              productId: item.id,
            })
            .select();

          console.log(createProductOrderRelations);
        }

    } catch (error) {
      navigate("/error");
    }

    setCart([]);
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-screen z-20 flex-flex-col items-center justify-center m-auto">
          <div className="min-w-screen min-h-screen z-30 relative"></div>
          <div className="card p-8 z-40 absolute items-center justify-center m-auto top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      ) : (
        <div>
          <Header></Header>

          <main className="min-h-max h-max">
            <div className="flex flex-col justify-center items-center p-4 h-full">
              {cart.length ? (
                <div className="w-4/5 products overflow-y-auto ">
                  {cart.map((product) => {
                    return (
                      <div
                        key={product.id}
                        className="card card-compact card-bordered w-full mb-4 "
                      >
                        <div className="card-body text-center items-center ">
                          <div className="card-title">{product.title}</div>
                          <p>${product.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="min-h-screen">
                  {" "}
                  No hay nada en el carrito :({" "}
                </div>
              )}
            </div>
          </main>

          <div className="w-full bg-base-200 p-4 sticky bottom-0 min-h-[10rem] checkoutDescription flex flex-col justify-center items-center ">
            <p className="totalPrice flex flex-col text-center items-center w-4/5 mb-2">
              Subtotal: ${cartTotal.toLocaleString()}
            </p>
            <p className="totalPrice flex flex-col text-center items-center w-4/5 mb-2">
              Shipping: ${(cartTotal * 0.1).toLocaleString()}
            </p>
            <p className="totalPrice flex flex-col text-center items-center w-4/5 mb-2">
              Total: ${Math.ceil(cartTotal / 0.9).toLocaleString()}
            </p>

            {/* <button className="btn btn-primary" onClick={handleCheckout}>Comprar</button> */}
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Continuar
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Pero antes necesitamos saber algo
                </h3>
                <p className="py-4">
                  rellena el formulario con esta información adicional
                </p>

                <form
                  className="form flex flex-col justify-center items-center w-4/5 p-2"
                  onSubmit={(e) => handleNotes(e)}
                  method="dialog"
                >
                  <textarea
                    className="textarea textarea-bordered textarea-primary mb-2 w-full focus:invalid:input-error"
                    type="text"
                    id="orderNotes"
                    placeholder="Dirección: País, Provincia, Ciudad, Código Postal, Barrio, Calle"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <button className="btn btn-primary w-full" type="submit">
                    Ingresar
                  </button>
                </form>
                {/* <div className="modal-action w-full">
    
    
                </div> */}
              </div>
            </dialog>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
