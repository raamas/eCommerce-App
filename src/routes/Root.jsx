import React from 'react'
import { Outlet } from 'react-router-dom'
import {
    RecoilRoot
} from 'recoil'

export default function Root() {
    return (
        <RecoilRoot>
            <div >
                <Outlet />
            </div>
        </RecoilRoot>
    )
}
