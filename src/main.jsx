import { loader as updateProductLoader } from "./components/UpdateProduct.jsx";
import DashboardProducts from "./routes/dashboard/DashboardProducts.jsx";
import DashboardOrders from "./routes/dashboard/DashboardOrders.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as productLoader } from "./routes/ProductPage.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import Dashboard from "./routes/dashboard/Dashboard.jsx";
import ProductPage from "./routes/ProductPage.jsx";
import Checkout from "./routes/Checkout.jsx";
import Success from "./routes/Success.jsx";
import "@smastrom/react-rating/style.css";
import Signup from "./routes/Signup.jsx";
import ReactDOM from "react-dom/client";
import Error from "./routes/Error.jsx";
import Login from "./routes/Login.jsx";
import Root from "./routes/Root.jsx";
import Home from "./routes/Home.jsx";
import { RecoilRoot } from "recoil";
import React from "react";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
        loader: productLoader,
      },
      {
        path: "/products/:productId/edit",
        element: <UpdateProduct />,
        loader: updateProductLoader,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard/products",
            element: <DashboardProducts />,
          },
          {
            path: "/dashboard/orders",
            element: <DashboardOrders />,
          },
        ],
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/error",
        element: <Error />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
