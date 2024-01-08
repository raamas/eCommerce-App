import React from 'react'
import { atom, useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { getOrders } from '../../utils.js'

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
        <div className='flex flex-row items-center justify-center flex-wrap '>
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