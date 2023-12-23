import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Root from './routes/Root.jsx'
import Login from './routes/Login.jsx'
import Home from './routes/Home.jsx'
import Checkout from './routes/Checkout.jsx'
import { RecoilRoot } from 'recoil'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Login />
      }, {
        path: '/home',
        element: <Home />
      }, {
        path: '/checkout',
        element: <Checkout />
      },
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
