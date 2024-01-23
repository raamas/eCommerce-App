import { supabase } from './supabaseClient.js'

export const getProducts = async () => {
    let { data, error } = await supabase
        .from('products')
        .select()
        .order('ratings', { ascending: false })

    if (!data) {
        console.log(error)
    }

    return data
}

export const getAllOrders = async () => {
    let { data, error } = await supabase
    .from('orders')
    .select(`
    id,
    buyerId,
    notes:orderNotes,
    products(id, title, price)
    `)
    // .eq('isFulfilled', false)


    if (!data) {
        console.log(error)
    }

    return data
}