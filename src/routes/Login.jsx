import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { useNavigate } from 'react-router-dom'
import { atom, useRecoilState } from 'recoil'

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
        let { data, error } = await supabase
            .from('users')
            .select('')
            .eq('email', query.email)
            .single()

        if (!data) {
            console.log(error.stack)
            navigate('/login')
        }
        
        setActiveUser(data)
        navigate('/')
    }

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen '>
            {(loading) ? <p>Cargando</p>
                : <div className="form flex flex-col justify-center items-center w-4/5 p-2">
                    <input className='input input-bordered input-primary mb-2 w-full' type="email" name="email" id="email" placeholder='Escribe tu email' value={query.email} onChange={(e) => setQuery({ ...query, email: e.target.value })} />
                    <input className='input input-bordered input-primary mb-2 w-full' type="password" name="password" id="password" placeholder='Escribe tu contraseña' value={query.password} onChange={(e) => setQuery({ ...query, password: e.target.value })} />
                    <button className='btn btn-primary w-full' onClick={loginHandler}>Ingresar</button>
                </div>}
        </div>
    )
}

export default Login