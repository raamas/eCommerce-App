import React from 'react'
import { useRecoilValue } from 'recoil'
import { shoppingCartState } from '../routes/Home.jsx'
import { Link } from 'react-router-dom'
import { userState } from '../routes/Login.jsx'
import { FaMagnifyingGlass } from "react-icons/fa6"
import { FaCartShopping } from "react-icons/fa6";


function Header({ children }) {
    const cart = useRecoilValue(shoppingCartState)
    const user = useRecoilValue(userState)
    return (
        <div className="navbar flex flex-row justify-around w-full bg-base-200">
            <h1> <Link to='/' >eCommerce App</Link> </h1>
            <div>
                <a href="#" className='mx-1'> <FaMagnifyingGlass /> </a>
                {(user.id) && (cart.length > 0) ?
                    <Link to='/checkout' className='mx-1'> <FaCartShopping /> <p>{cart.length}</p> </Link> :
                    <span className='mx-1 flex' ><FaCartShopping /> <p className='text-sm mx-1'>{cart.length}</p> </span>
                }

                {(user.id) ?
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button" className="mx-1">{user.user_metadata.username}</div>
                        {(user.user_metadata.admin) &&
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li> <Link to='/dashboard'>Panel de control</Link> </li>
                            </ul>
                        }
                    </div> :
                    <span><Link className='mx-1' to='/login'>Iniciar sesión</Link></span>
                }

                {children}
            </div>
        </div>
    )
}

export default Header
