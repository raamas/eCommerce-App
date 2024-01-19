import React, { useEffect } from 'react'
import Header from '../components/Header'
import ProductsList from '../components/ProductsList.jsx'
import { atom } from 'recoil'


export const shoppingCartState = atom({
    key: 'shoppingCartState',
    default: []
})

function Home() {

    return (
        <div className='flex flex-col items-center justify-center transition transition-all'>
            <Header></Header>

            <div className="hero bg-base-300 min-h-screen" style={{ backgroundImage: 'url(https://loremflickr.com/1280/720/dark/all)' }}>
                <div className="hero-overlay opacity-95 min-h-[70vh] max-w-fit-content"></div>
                <div className="hero-content">
                    <span className="bg-clip-text bg-gradient-to-l from-primary to-secondary">
                        <h2 className='text-transparent font-extrabold text-3xl text-center '>Las mejores camisetas de futból en la internet</h2>
                    </span>
                </div>
            </div>

            <div className="content w-4/5 flex flex-col items-center justify-center my-4">
                <ProductsList />
            </div>
        </div>
    )
}

export default Home
