import React from 'react'
import { atom, useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { getOrders } from '../../utils.js'
import Order from './Order.jsx'

const ordersState = atom({
    key:'ordersState',
    default:[]
})

function DashboardOrdersList() {
    const [orders, setOrders] = useRecoilState(ordersState)

    useEffect(() => {
        let invokeGetOrders = async () => {
            let data = await getOrders()
            setOrders(data)
        }

        invokeGetOrders()
    }, [])


    return (
        <div className='flex flex-row items-center justify-center flex-wrap gap-5'>
            {(orders) &&
                orders.map((order) => {
                    return (
                        <Order order={order} />
                    )
                })
            }
        </div>
    )
}

export default DashboardOrdersList