import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { redirect } from 'react-router-dom'

function Login() {
    const [query, setQuery] = useState({ email: '', password: '' })
    const [activeUser, setActiveUser] = useState()
    const loginHandler = async () => {
        let { data, error } = await supabase
            .from('users')
            .select('')
            .eq('email', query.email)
            .single()

        if (!data) {
            console.log(error.stack)
        }

        setActiveUser(data)
        console.log(data)
        return redirect('/home')
    }

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen '>
            <div className="form flex flex-col justify-center items-center w-4/5 p-2">
                <input className='input input-bordered input-primary mb-2 w-full' type="email" name="email" id="email" placeholder='Escribe tu email' value={query.email} onChange={(e) => setQuery({ ...query, email: e.target.value })} />
                <input className='input input-bordered input-primary mb-2 w-full' type="password" name="password" id="password" placeholder='Escribe tu contraseña' value={query.password} onChange={(e) => setQuery({ ...query, password: e.target.value })} />
                <button className='btn btn-primary w-full' onClick={loginHandler}>Ingresar</button>
            </div>
        </div>
    )
}

export default Login