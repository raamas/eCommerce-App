import React, { useState, useEffect } from "react";
import ProductListDashboard from "../../components/dashboard/ProductList";
import CreateProduct from "../../components/CreateProduct.jsx";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../Login.jsx";

function DashboardProducts() {
    let user = useRecoilValue(userState);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user?.user_metadata?.admin != "true") {
        navigate("/");
      }
    }, [user]);
  

  const [showProductForm, setShowProductForm] = useState(false);

  const ProductsButton = document.getElementById('productsBtn')
  ProductsButton.className = `${ProductsButton.className} btn-secondary`

  const OrdersButton = document.getElementById('ordersBtn')
    OrdersButton.className = `btn join-item w-36`

  return (
    <section className="products w-4/5 max-w-4xl">
      <h2 className="text-lg m-4">Productos</h2>

      <div className="flex items-center justify-center">
        <ProductListDashboard />
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          className="btn btn-primary w-full"
          onClick={() => setShowProductForm(true)}
        >
          Añadir producto nuevo
        </button>
        {showProductForm && <CreateProduct />}
      </div>
    </section>
  );
}

export default DashboardProducts;
