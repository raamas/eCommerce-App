import React, { useEffect } from 'react'
import { supabase } from '../../supabaseClient'

function Order({ order }) {
    const [product, setProduct] = useState()
    useEffect(() => {
        const getProductAndBuyer = async () => {
            let res = await supabase
                .from('products')
                .select('title')
                .eq('id', order.productId)
                .single()

            if(res.data){
                setProduct(res.data)
            }

            
        }
    }, [])

    return (
        <div className="card card-compact bg-base-300 mb-4 w-full">
            <div className="card-body flex flex-col ">
                <h2 className="card-title"> {product}</h2>
                <p>Comprador: {order.buyerId}</p>
                <p>Notes: {order.notes}</p>
            </div>

        </div>
    )
}

export default Order