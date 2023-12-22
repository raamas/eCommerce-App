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
import User, { userLoader } from './routes/User.jsx'
import Checkout from './routes/Checkout.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    children:[
      {
        path:'/login',
        element:<Login />
      },      {
        path:'/home',
        element:<Home />
      }, {
        path:'/user/:userId',
        element:<User/>,
        loader: userLoader,
      }, {
        path:'/checkout',
        element:<Checkout/>
      }, 
    ]
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
