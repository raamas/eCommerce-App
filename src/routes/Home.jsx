import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useRecoilValue,atom } from 'recoil'
import { userState } from './Login'
import { Link, Navigate } from 'react-router-dom'
import ProductsList from '../components/ProductsList'

export const shoppingCartState = atom({
    key:'shoppingCartState',
    default:[]
})

function Home() {
    const user = useRecoilValue(userState)

    return (
        <div className='flex flex-col items-center justify-center'>
            <Header>
                {(user.fullname) ? <Link to={'/user/'} >{user.fullname}</Link> : <Link to='/login'>Log In</Link>}
            </Header>

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