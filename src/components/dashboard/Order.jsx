import React, { useEffect, useState } from "react";
import { getOrderProducts } from "../../utils";
import { supabase } from "../../supabaseClient";

function Order({ order }) {
  const [orderProducts, setOrderProducts] = useState([]);
  console.log(order);

  useEffect(() => {
    const invokeGetOrderProducts = async () => {
      let products = await getOrderProducts(order.products);
      products.forEach((product) => {
        product.quantity = order.products.filter(
          (productId) => productId == product.id
        ).length;
      });

      console.log(products);
      setOrderProducts(products);
    };

    invokeGetOrderProducts();
  }, []);

  const handleFulfilled = async () => {
    let res = await supabase
      .from("orders")
      .update({ isFulfilled: true })
      .eq("id", order.id);

    console.log(res);
  };

  const handleDelete = async () => {
    let res = await supabase.from("orders").delete().eq("id", order.id);

    console.log(res);
  };

  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-200 max-w-md">
      <input type="checkbox" />

      <div className="collapse-title text-xl font-medium">
        <h2 className="card-title font-semibold text-primary text-lg">
          Orden: {order.id.split("-")[0]}
        </h2>
      </div>
      <div className="collapse-content">
        <p>
          Notes: <strong>{order.notes}</strong>{" "}
        </p>
        <div>
          {console.log(orderProducts)}
          {orderProducts.map((product) => {
            return (
              <div className="my-2">
                <h3 className="text-primary text-semibold">
                  <strong>{product.title}</strong>
                </h3>
                <p>Precio unitario: ${product.price.toLocaleString()} COP</p>
                <p>Unidades: {product.quantity}</p>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-outline btn-secondary w-full my-2"
          onClick={handleFulfilled}
        >
          Completar orden
        </button>
        <button
          className="btn btn-outline btn-error w-full my-2"
          onClick={handleDelete}
        >
          Eliminar orden
        </button>
      </div>
    </div>
  );
}

export default Order;
