import React from 'react'

function Footer({ totalPrice, clearCart }) {
    return (
        <div>
            <div className='cart-container'>
                <hr />
                <div className='total-container'>
                    <h4>Total</h4>
                    <h5>${totalPrice}</h5>
                </div>
                <button onClick={clearCart} >CLEAR CART</button>
            </div>
        </div>
    )
}

export default Footer