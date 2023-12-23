import React from 'react'
import { Outlet } from 'react-router-dom'
import {
    RecoilRoot
} from 'recoil'

export default function Root() {
    return (
        <div >
            <h1>God this is hard</h1>
            <RecoilRoot>
                <Outlet />
            </RecoilRoot>
        </div>
    )
}
