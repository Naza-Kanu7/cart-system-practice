import React from 'react'

function Cart({ cartItem, increaseQuantity, decreaseQuantity, removeItem }) {
    const {id, price, img, title, amount} = cartItem
  return (
    <div>
        <div className='single-item-container cart-items-container'>
        <img src={img}  />
        <div className='cart-price'>
            <h4>{title}</h4>
            <p>${price}</p>
        </div>
        <p className='cart-amount'> 
          <span onClick={() => decreaseQuantity(id)}>&#8249; </span> 
            {amount}
          <span onClick={ () => increaseQuantity(id)}> &#8250; </span> 
        </p>
        <span className='cancel' onClick={ () => removeItem(id)}>&#215;</span>
    </div>
    </div>
  )
}

export default Cart