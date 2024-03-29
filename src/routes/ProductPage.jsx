import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import Header from '../components/Header.jsx'
import { productsState } from '../components/ProductsList.jsx'
import AddToCart from '../components/AddToCart.jsx'
import { useRecoilValue } from 'recoil'
import AddReview from '../components/AddReview.jsx'


export const loader = async ({ params }) => {
  let { data, error } = await supabase.from('products')
    .select()
    .eq('id', params.productId)
    .single()

  return data
}


function ProductPage() {
  const product = useLoaderData()
  const products = useRecoilValue(productsState)

  let similarProducts = products.filter((p) => product.title[0] == p.title[0] && product.id != p.id)
  let grade = (product.ratings.length > 0) ? product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length : 0


  return (
    <div>

      <Header></Header>
      <main className='flex flex-col items-center justify-center h-full'>
        <div className="card bg-base-200 border border-base-300 w-4/5 my-8 max-w-md ">
          <div className="card-body">
            <figure><img src={product.image} alt={product.title} /></figure>
            <div className="card-title mb-2 text-2xl text-extrabold">
              {product.title}
            </div>

            <div className="card-info mb-2">
              <div className="text-xl font-bold text-primary mb-2 border-box"> ${product.price.toLocaleString()} COP </div>

              <p className="text-lg mb-2">Descripción:</p>
              <p className='italic text-base text-neutral mb-2 my-8'>{product.description}</p>

              <p className='mb-2'>Calificación: {grade.toFixed(1)} ({product.ratings.length})</p>

              <div className="card-actions items-center justify-center">
                <AddToCart product={product} />
                <AddReview productId={product.id} />
              </div>

            </div>
          </div>
        </div>

        <p className="text-lg mb-4">Productos relacionados:</p>

        {similarProducts.map((similarProduct) => {
          return (
            <div key={similarProduct.id} className="card card-side max-w-fit bg-base-200 mb-4 w-4/5">
              <div className="card-body">
                <div className="card-title "><Link to={'/products/' + product.id}>{similarProduct.title}</Link></div>
                <p className='italic' >${similarProduct.price.toLocaleString()}</p>
              </div>
            </div>
          )
        })}

      </main>
    </div>
  )
}

export default ProductPage