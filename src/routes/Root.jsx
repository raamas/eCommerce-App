import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {
    RecoilRoot
} from 'recoil'

export default function Root() {
    return (
        <div >
            <RecoilRoot>
                <Outlet />
            </RecoilRoot>
        </div>
    )
}
