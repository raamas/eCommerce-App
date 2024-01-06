import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardProductList from '../components/DashboardProductList.jsx'
import CreateProduct from '../components/CreateProduct.jsx'
import { useRecoilValue } from 'recoil'
import { userState } from './Login.jsx'
import Header from '../components/Header.jsx'


function Dashboard() {
  const [showProductForm, setShowProductForm] = useState(false)
  const user = useRecoilValue(userState)
  const navigate = useNavigate()

  useEffect(() => {
    // console.log()
    if (user.user_metadata.admin != "true") {
      navigate('/')
    }
  }, [user])

  return (
    <div>
      <Header/>
      <h1 className='m-4 text-xl font-bold'>Dashboard</h1>

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