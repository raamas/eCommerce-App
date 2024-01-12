import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { useNavigate } from 'react-router-dom'
import { atom, useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'

export const userState = atom({
    key:'userState',
    default: {}
})


function Login() {
    const [query, setQuery] = useState({ email: '', password: '' })
    const [activeUser, setActiveUser] = useRecoilState(userState)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const loginHandler = async () => {
        setLoading(true)

        let { data, error } = await supabase.auth.signInWithPassword({
            email:query.email,
            password:query.password
        })

         if (!data.user) {
            console.log(error.stack)
            navigate('/login')
        }
        
        console.log(data)
        setActiveUser(data.session.user)
        navigate('/')
    }

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            {(loading) ? <span className="loading loading-spinner loading-lg"></span>
                : <div className="form flex flex-col justify-center items-center w-4/5 p-4 rounded-lg bg-base-200 border border-base-300 max-w-sm">

                    <span className='bg-clip-text bg-gradient-to-l from-primary to-secondary'>
                    <h2 className='text-lg font-bold my-6 text-transparent'>Iniciar sesión</h2>
                    </span>

                    <input className='input input-bordered input-primary mb-2 w-full' type="email" name="email" id="email" placeholder='Escribe tu email' value={query.email} onChange={(e) => setQuery({ ...query, email: e.target.value })} />
                    <input className='input input-bordered input-primary mb-2 w-full' type="password" name="password" id="password" placeholder='Escribe tu contraseña' value={query.password} onChange={(e) => setQuery({ ...query, password: e.target.value })} />
                    <button className='btn btn-primary w-full' onClick={loginHandler}>Ingresar</button>
                    <Link className='m-4 font-bold underline decoration-2 text-primary' to='/signup'>Regístrate</Link>
                </div>}
        </div>
    )
}

export default Login