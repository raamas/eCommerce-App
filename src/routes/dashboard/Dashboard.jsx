import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardProductList from '../../components/dashboard/ProductList.jsx'
import CreateProduct from '../../components/CreateProduct.jsx'
import { useRecoilValue } from 'recoil'
import { userState } from '../Login.jsx'
import Header from '../../components/Header.jsx'
import DashboardOrdersList from '../../components/dashboard/OrdersList.jsx'


function Dashboard() {
  const [showProductForm, setShowProductForm] = useState(false)
  const user = useRecoilValue(userState)
  const navigate = useNavigate()

  useEffect(() => {
    // console.log()
    if (user?.user_metadata?.admin != "true") {
      navigate('/')
    }
  }, [user])

  return (
    <div>
      <Header />
      <h1 className='m-4 text-xl font-bold'>Dashboard</h1>

      <main className='flex flex-col items-center justify-center mb-4'>
        <div className="products w-4/5 ">
          <h2 className="text-lg my-4">Productos</h2>
          <DashboardProductList />
          <button className='btn btn-primary w-full' onClick={() => setShowProductForm(true)}>Añadir producto nuevo</button>
          {showProductForm && <CreateProduct />}

          <h2 className='text-lg my-4'>Orders</h2>
          <DashboardOrdersList />
        </div>
      </main>
    </div>
  )
}

export default Dashboard