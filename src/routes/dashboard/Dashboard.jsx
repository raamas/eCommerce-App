import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../Login.jsx";
import Header from "../../components/Header.jsx";
import { Outlet } from "react-router-dom";

function Dashboard() {
  let user = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user_metadata?.admin != "true") {
      navigate("/");
    }
  }, [user]);

  console.log(window.location.href)

  return (
    <div>
      <Header />
      <h1 className="m-4 text-xl font-bold text-center">Dashboard</h1>

      <div className="w-full flex flex-row items-center justify-center ">
      <div className="join">
        <button className="btn join-item w-36" id="productsBtn" onClick={()=>navigate('/dashboard/products')}>Products</button>
        <button className="btn join-item w-36" id="ordersBtn" onClick={()=>navigate('/dashboard/orders')}>Orders</button>
      </div>
      </div>

      <main className="flex flex-col items-center justify-center mb-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
