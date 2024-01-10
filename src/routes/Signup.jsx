import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from './Login.jsx'

function Signup() {
    const [query, setQuery] = useState({ email: '', password: '', fullname: '', username: '' })
    const [activeUser, setActiveUser] = useRecoilState(userState)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const signupHandler = async () => {
        setLoading(true)

        if (query.password.length < 8){
            setMessage('Error: tu contraseña es muy corta')
        }

        if (query.email == '' && query.password.length < 8 && query.fullname == '' && query.username == '') {
            navigate('/signup')
            return
        }

        let { data, error } = await supabase.auth.signUp({
            email: query.email,
            password: query.password,
            options: {
                data: {
                    fullname: query.fullname,
                    username: query.username,
                }
            }

        })

        if (!data) {
            console.log(error)
            navigate('/login')
        }

        setActiveUser(data.user)
        navigate('/')
    }

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen '>
            {(loading) ? <span className="loading loading-spinner loading-lg"></span>
                : <form className="form flex flex-col justify-center items-center w-4/5 p-4 rounded-lg bg-base-200 border border-base-300" onSubmit={signupHandler}>
                    <h2 className='text-lg font-semibold my-6'>Crea una cuenta</h2>

                    <input className='input input-bordered input-primary mb-2 w-full focus:invalid:input-error' required type="text" name="fullname" id="fullname" placeholder='Escribe tu nombre completo' value={query.fullname} onChange={(e) => setQuery({ ...query, fullname: e.target.value })} />
                    <input className='input input-bordered input-primary mb-2 w-full focus:invalid:input-error' required type="text" name="username" id="username" placeholder='Escribe tu nombre de usuario' value={query.username} onChange={(e) => setQuery({ ...query, username: e.target.value })} />
                    <input className='input input-bordered input-primary mb-2 w-full focus:invalid:input-error' required type="email" name="email" id="email" placeholder='Escribe tu email' value={query.email} onChange={(e) => setQuery({ ...query, email: e.target.value })} />
                    <input className='input input-bordered input-primary mb-2 w-full focus:invalid:input-error' required type="password" minLength='8' name="password" id="password" placeholder='Escribe tu contraseña' value={query.password} onChange={(e) => setQuery({ ...query, password: e.target.value })} />
                    <button className='btn btn-primary w-full mb-4' type='submit'>Ingresar</button>
                </form>}
        </div>
    )
}

export default Signup
