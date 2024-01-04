import React, { useEffect } from 'react'
import Header from '../components/Header'
import ProductsList from '../components/ProductsList.jsx'
import {atom} from 'recoil'

export const shoppingCartState = atom({
    key: 'shoppingCartState',
    default: []
})

function Home() {

    return (
        <div className='flex flex-col items-center justify-center'>
            <Header>       </Header>

            <div className="hero bg-base-300 min-h-[70vh] mb-8">
                <div className="hero-content">
                    <h2>The Best eCommerce Available</h2>
                </div>
            </div>

            <div className="content w-4/5 flex flex-col items-center justify-center ">
                <ProductsList />
            </div>
        </div>
    )
}

export default Home