import React from 'react'
import { useRecoilValue } from 'recoil'
import { shoppingCartState } from '../routes/Home'
import { Link } from 'react-router-dom'
import { userState } from '../routes/Login'

function Header({ children }) {
    const cart = useRecoilValue(shoppingCartState)
    const user = useRecoilValue(userState)
    return (
        <div className="navbar flex flex-row justify-around w-full bg-base-200">
            <h1> <Link to='/home' >eCommerce App</Link> </h1>
            <div>
                <a href="#" className='mx-1'>Search</a>
                {(user.id) && (cart.length > 0) ? <Link to='/checkout' className='mx-1'>Cart[{cart.length}]</Link> : <p className='mx-1'>Cart[{cart.length}]</p>}
                {children}
            </div>
        </div>
    )
}

export default Header