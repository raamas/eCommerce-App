import React, { useEffect } from "react";
import OrdersList from "../../components/dashboard/OrdersList.jsx";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../Login.jsx";
function DashboardOrders() {
    let user = useRecoilValue(userState);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user?.user_metadata?.admin != "true") {
        navigate("/");
      }
    }, [user]);
  
    const OrdersButton = document.getElementById('ordersBtn')
    OrdersButton.className = `${OrdersButton.className} btn-secondary`

    const ProductsButton = document.getElementById('productsBtn')
    ProductsButton.className = `btn join-item w-36`

  return (
    <section className="products w-4/5 max-w-4xl">
      <h2 className="text-lg m-4">Ordenes</h2>

      <div className="flex items-center justify-center">
        <OrdersList />
      </div>
    </section>
  );
}

export default DashboardOrders;
