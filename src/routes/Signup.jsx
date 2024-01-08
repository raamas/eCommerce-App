import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { useNavigate } from 'react-router-dom'
import { atom, useRecoilState } from 'recoil'
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
            {(loading) ? <p>Cargando</p>
                : <form className="form flex flex-col justify-center items-center w-4/5 p-2" onSubmit={signupHandler}>
                    <input className='input input-bordered input-primary mb-2 w-full focus:invalid:input-error' required type="text" name="fullname" id="fullname" placeholder='Escribe tu nombre completo' value={query.fullname} onChange={(e) => setQuery({ ...query, fullname: e.target.value })} />
                    <input className='input input-bordered input-primary mb-2 w-full focus:invalid:input-error' required type="text" name="username" id="username" placeholder='Escribe tu nombre de usuario' value={query.username} onChange={(e) => setQuery({ ...query, username: e.target.value })} />
                    <input className='input input-bordered input-primary mb-2 w-full focus:invalid:input-error' required type="email" name="email" id="email" placeholder='Escribe tu email' value={query.email} onChange={(e) => setQuery({ ...query, email: e.target.value })} />
                    <input className='input input-bordered input-primary mb-2 w-full focus:invalid:input-error' required type="password" minLength='8' name="password" id="password" placeholder='Escribe tu contraseña' value={query.password} onChange={(e) => setQuery({ ...query, password: e.target.value })} />
                    <button className='btn btn-primary w-full' type='submit'>Ingresar</button>
                </form>}
        </div>
    )
}

export default Signup

// {
//     "id": "b9dea7bd-a072-413a-975d-1379d6e51cb9",
//     "aud": "authenticated",
//     "role": "authenticated",
//     "email": "ravitey357@regapts.com",
//     "phone": "",
//     "confirmation_sent_at": "2024-01-05T16:55:37.488892781Z",
//     "app_metadata": {
//         "provider": "email",
//         "providers": [
//             "email"
//         ]
//     },
//     "user_metadata": {},
//     "identities": [
//         {
//             "identity_id": "3d217576-3657-4aec-9be8-ad3659c749e5",
//             "id": "b9dea7bd-a072-413a-975d-1379d6e51cb9",
//             "user_id": "b9dea7bd-a072-413a-975d-1379d6e51cb9",
//             "identity_data": {
//                 "email": "ravitey357@regapts.com",
//                 "email_verified": false,
//                 "phone_verified": false,
//                 "sub": "b9dea7bd-a072-413a-975d-1379d6e51cb9"
//             },
//             "provider": "email",
//             "last_sign_in_at": "2024-01-05T16:55:37.487336183Z",
//             "created_at": "2024-01-05T16:55:37.487385Z",
//             "updated_at": "2024-01-05T16:55:37.487385Z",
//             "email": "ravitey357@regapts.com"
//         }
//     ],
//     "created_at": "2024-01-05T16:55:37.484973Z",
//     "updated_at": "2024-01-05T16:55:37.833351Z"
// }