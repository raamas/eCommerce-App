import { supabase } from './supabaseClient.js'

export const getProducts = async () => {
    let { data, error } = await supabase
        .from('products')
        .select()

    if (!data) {
        console.log(error)
    }

    return data
}