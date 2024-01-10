import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Root from './routes/Root.jsx'
import Login from './routes/Login.jsx'
import Home from './routes/Home.jsx'
import Checkout from './routes/Checkout.jsx'
import ProductPage from './routes/ProductPage.jsx'
import { loader as productLoader } from './routes/ProductPage.jsx'
import '@smastrom/react-rating/style.css'
import Signup from './routes/Signup.jsx'
import DashboardLogin from './routes/dashboard/DashboardLogin.jsx'
import Dashboard from './routes/dashboard/Dashboard.jsx'
import UpdateProduct from './components/UpdateProduct.jsx'
import { loader as updateProductLoader } from './components/UpdateProduct.jsx'
import Success from './routes/Success.jsx'
import Error from './routes/Error.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/checkout',
        element: <Checkout />
      }, {
        path: '/products/:productId',
        element: <ProductPage />,
        loader: productLoader
      }, {
        path: '/products/:productId/edit',
        element: <UpdateProduct />,
        loader: updateProductLoader
      }, {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path: '/success',
        element: <Success />
      }, {
        path: '/error',
        element: <Error />
      }
    ]
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
)
