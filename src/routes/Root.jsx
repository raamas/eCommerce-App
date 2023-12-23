import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import {
    RecoilRoot, useRecoilValue
} from 'recoil'
import userState from './Login'

export default function Root() {
    const user = useRecoilValue(userState)
    return (
        <div >
            {(user.id) ? <Outlet></Outlet> : <Navigate to='/home' />}
        </div>
    )
}
