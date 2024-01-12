import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardProductList from '../../components/dashboard/ProductList.jsx'
import CreateProduct from '../../components/CreateProduct.jsx'
import { useRecoilValue } from 'recoil'
import { userState } from '../Login.jsx'
import Header from '../../components/Header.jsx'
// import DashboardOrdersList from '../../components/dashboard/OrdersList.jsx'


function Dashboard() {
  const [showProductForm, setShowProductForm] = useState()
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
      <h1 className='m-4 text-xl font-bold text-center'>Dashboard</h1>

      <main className='flex flex-col items-center justify-center mb-4'>
        <div className="products w-4/5 max-w-4xl">
          <h2 className="text-lg m-4">Productos</h2>

          <div className="flex items-center justify-center">
            <DashboardProductList />
          </div>

          <div className="flex flex-col items-center justify-center">
            <button className='btn btn-primary w-full' onClick={() => setShowProductForm(true)}>Añadir producto nuevo</button>
            {showProductForm && <CreateProduct />}
          </div>
        </div>


        <h2 className='text-lg my-4'>Ordenes</h2>
        <p>En construcción</p>
        {/* <DashboardOrdersList /> */}
      </main>
    </div>
  )
}

export default Dashboard 