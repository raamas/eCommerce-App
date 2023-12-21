import React from 'react'

function Header({children}) {
    return (
        <div className="navbar flex flex-row space-around">
            <h1>eCommerce</h1>
            <div>
                <a href="#">search</a>
                <a href="#">cart</a>
                {children}
            </div>
        </div>
    )
}

export default Header