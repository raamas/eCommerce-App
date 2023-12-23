import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {
    RecoilRoot, useRecoilValue
} from 'recoil'
import { userState } from './Login'

export default function Root() {
    const user = useRecoilValue(userState)
    return (
        <div >

                <Outlet />
                {/* { (user.id == undefined || user.id == null) && <Navigate to='/login'></Navigate> } */}
        </div>
    )
}
