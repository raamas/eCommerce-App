import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <main className='w-4/5 flex flex-col justify-center items-center text-center' >
                <h1 className='text-2xl font-bold text-error' >Hubo un error en la operación</h1>
                <p className='' >Intentalo mas tarde. <Link to='/' className='text-primary'>Inicio</Link> </p>
            </main>
        </div>
    )
}

export default Error