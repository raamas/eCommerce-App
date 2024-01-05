import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardProductList from '../components/DashboardProductList.jsx'
import CreateProduct from '../components/CreateProduct.jsx'


function Dashboard() {
  const [showProductForm, setShowProductForm] = useState(false)
  return (
    <div>
      <h1>Dashboard</h1>

      <main className='flex flex-col items-center justify-center'>
        <div className="products w-4/5 ">
          <DashboardProductList />
          <button className='btn btn-primary w-full' onClick={() => setShowProductForm(true)}>Añadir producto nuevo</button>

          {showProductForm && <CreateProduct />}

        </div>
      </main>
    </div>
  )
}

export default Dashboard