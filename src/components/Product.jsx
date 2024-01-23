import React from "react";
import { userState } from "../routes/Login.jsx";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { shoppingCartState } from "../routes/Home.jsx";
import AddToCart from "./AddToCart.jsx";

function Product({ product }) {
  const user = useRecoilValue(userState);
  let grade =
    product.ratings.length > 0
      ? product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length
      : 0;

  return (
    <div className="card card-bordered border-base-300 bg-base-200 m-2 w-full shadow shadow-sm max-w-xs min-h-full h-full ">
      <div className="card-body">
        <figure>
          {" "}
          <img
            src={product.image}
            alt={product.title}
            className="min-w-full"
          />{" "}
        </figure>
        <h3 className="card-title font-semibold text-primary">
          {" "}
          <Link to={"/products/" + product.id}>{product.title}</Link>{" "}
        </h3>
        <p>${product.price.toLocaleString()}</p>
        <p className="mb-2">
          Calificación: {grade.toFixed(1)} ({product.ratings.length})
        </p>
        {user.id && (
          <div className="card-actions items-center justify-center">
            <AddToCart product={product} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
