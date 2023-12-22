import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from './Login'
import Header from '../components/Header'
import { supabase } from '../supabaseClient'
import { useLoaderData } from 'react-router-dom'

export const userLoader = async ({ params }) => {
    console.log(params)
    let { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', params.userId)
    .single()

    if(!data){
        console.log(error.stack)
        return error
    }
    
    console.log(data)
    return data
}
function User() {
    // const user = useRecoilValue(userState)
    const user = useLoaderData()
    // const createdAt = 
    console.log(user.createdAt)

    return (
        <div>
            <Header></Header>
            <div className="hero bg-base-300 min-h-[70vh] mb-8">
                <div className="hero-content">
                    <h2>{user.fullname}</h2>
                    <p>
                        
                        @{user.username}
                        {/* Joined in: {user['created_at'].toLocaleDateString()} */}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default User