import React from 'react'
import { Link } from 'react-router-dom'

function Success() {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <main className='w-4/5 flex flex-col justify-center items-center text-center' >
                <h1 className='text-2xl font-bold text-primary' >La operación se realizo con exito</h1>
                <p className='' >Sigue navegando. <Link to='/' className='text-primary'>Inicio</Link> </p>
            </main>
        </div>
    )
}

export default Success