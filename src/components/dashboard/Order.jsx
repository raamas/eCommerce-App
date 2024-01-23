import React from "react";

function Order({ order }) {
  console.log(order);

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border border-base-300 bg-base-200 max-w-md"
    >
      <div className="collapse-title text-xl font-medium">
        <h2 className="card-title font-semibold text-primary text-lg">
          Orden: {order.id.split("-")[0]}
        </h2>
      </div>
      <div className="collapse-content">
        <p>Notes: <strong>{order.notes}</strong> </p>
        <div>
          {order.products.map((product) => {
            return (
              <div className="my-2">
                <h3 className="text-primary text-semibold"><strong>{product.title}</strong></h3>
                <p>${product.price.toLocaleString()} COP</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Order;
