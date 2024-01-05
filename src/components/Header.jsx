import React from 'react'
import { useRecoilValue } from 'recoil'
import { shoppingCartState } from '../routes/Home.jsx'
import { Link } from 'react-router-dom'
import { userState } from '../routes/Login.jsx'

function Header({ children }) {
    const cart = useRecoilValue(shoppingCartState)
    const user = useRecoilValue(userState)
    console.log(user)

    return (
        <div className="navbar flex flex-row justify-around w-full bg-base-200">
            <h1> <Link to='/' >eCommerce App</Link> </h1>
            <div>
                <a href="#" className='mx-1'>Search</a>
                {(user.id) && (cart.length > 0) ? <Link to='/checkout' className='mx-1'>Cart[{cart.length}]</Link> : <p className='mx-1'>Cart[{cart.length}]</p>}
                {(user.id) ? <p className='mx-1'>{user.user_metadata.username}</p> : <span><Link className='mr-2' to='/login'>Iniciar sesión</Link></span>}

                {children}
            </div>
        </div>
    )
}

export default Header