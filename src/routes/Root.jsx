import React from 'react'
import {  Outlet } from 'react-router-dom'
import { useRecoilValue
} from 'recoil'
import { userState } from './Login.jsx'

export default function Root() {
    return (
        <div >

                <Outlet />
        </div>
    )
}
