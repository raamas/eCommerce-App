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


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Login />
      }, {
        index:true,
        // path: '/',
        element: <Home />
      }, {
        path: '/checkout',
        element: <Checkout />
      },{
        path:'/products/:productId',
        element: <ProductPage />,
        loader: productLoader
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
