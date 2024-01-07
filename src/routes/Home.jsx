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

            <div className="hero bg-base-300 min-h-[70vh] " style={{backgroundImage: 'url(https://loremflickr.com/2000/2000/londres,landscape/all)'}}>
                <div className="hero-overlay opacity-80 min-h-[70vh] max-w-fit-content"></div>
                <div className="hero-content">
                    <h2 className='text-neutral-content font-bold text-xl text-center'>The Best eCommerce Available</h2>
                </div>
            </div>

            <div className="content w-4/5 flex flex-col items-center justify-center mt-4">
                <ProductsList />
            </div>
        </div>
    )
}

export default Home
