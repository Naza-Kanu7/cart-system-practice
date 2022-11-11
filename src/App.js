import { useEffect, useState } from 'react';
import './App.css';
import Cart from './components/cart/Cart.component';
import EmptyCart from './components/cart/Emptycart.component';
import Footer from './components/footer/Footer.component';
import Header from './components/header/Header.component';

function App() {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)


  // GET THE DATA FROM THE API
  const fetchAPIData = async () => {
    const response = await fetch(`https://course-api.com/react-useReducer-cart-project`)
    const apiData = await response.json()
    // console.log(apiData)
    // SET CART ITEMS WITH THE API DATA
    setCartItems(apiData)

    // LOOP OVER EACH ITEM TO GET THE TOTAL PRICE AND QUANTITY
    let apiQuantity = 0
    let apiPriceTotal = 0
    for (const item of apiData) {
      apiQuantity += item.amount
      apiPriceTotal += item.price * item.amount
    }
    // SET TOTAL PRICE 
    setTotalPrice(apiPriceTotal)
    // SET TOTAL QUANTITY 
    setTotalQuantity(apiQuantity)

  }
  // USE USEEFFECT TON CONTROL HOW THE FUNCTION LOADS
  useEffect(() => {
    fetchAPIData()
  }, [])

  // INCREASING THE QUANTITY OF ITEM QUANTITY

  const increaseQuantity = (itemId) => {
    const newCartItems = [...cartItems]
    const cartItemIndex = newCartItems.findIndex(item => item.id === itemId)

    // SETTING NEW TOTAL QUANTITY
    const increasedQuantity = totalQuantity + 1
    setTotalQuantity(increasedQuantity)
    newCartItems[cartItemIndex].amount = newCartItems[cartItemIndex].amount + 1

    // SETTING NEW CART ITEMS WITH INCREASED QUANTITY IN ONE
    setCartItems([...newCartItems])

    // SETTING NEW TOTAL PRICE
    let currentTotal = 0
    for (const cartItem of cartItems) {
      currentTotal += cartItem.price * cartItem.amount
    }
    setTotalPrice(currentTotal)
  }

  // DECREASING THE QUANTITY OF ITEM QUANTITY

  const decreaseQuantity = (itemId) => {
    const newCartItems = [...cartItems]
    const cartItemIndex = newCartItems.findIndex(item => item.id === itemId)

    // SETTING NEW TOTAL QUANTITY
    const decreasedQuantity = totalQuantity - 1

    if (newCartItems[cartItemIndex].amount > 1) {
      setTotalQuantity(decreasedQuantity)
      newCartItems[cartItemIndex].amount = newCartItems[cartItemIndex].amount - 1


      // SETTING NEW CART ITEMS WITH DECREASED QUANTITY IN ONE
      setCartItems([...newCartItems])

      // SETTING NEW TOTAL PRICE
      let currentTotal = 0
      for (const cartItem of cartItems) {
        currentTotal += cartItem.price * cartItem.amount
      }
      setTotalPrice(currentTotal)
    } else {
      removeItem(itemId)
    }
  }

  // REMOVING AN ITEM FROM THE CART

  const removeItem = (itemId) => {
    const newCartItems = [...cartItems]
    // FILTERING OUT THE REMOVED ONE
    const updatedCartItems = newCartItems.filter(item => item.id !== itemId)
    setCartItems(updatedCartItems)

    let currentQuantity = 0
    let currentTotal = 0
    for (const cartItem of updatedCartItems) {
      currentTotal += cartItem.price * cartItem.amount
      currentQuantity += cartItem.amount
    }
    // SETTING THE NEW QUANTITY AND PRICE
    setTotalPrice(currentTotal)
    setTotalQuantity(currentQuantity)
  }

  // CLEARING THE CART
  const clearCart = () => {
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantity(0)
  }


  return (
    <div className="App">
      <Header totalQuantity={totalQuantity} />
      {/* MAPPING THROUGH THE CARTITEMS */}
      {cartItems.length > 0 ? cartItems.map((cartItem) => {
        return (
          <Cart
            key={cartItem.id}
            cartItem={cartItem}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeItem={removeItem}

          />
        )
      }) : <EmptyCart />}
      <Footer totalPrice={totalPrice} clearCart={clearCart} />
    </div>
  );
}

export default App;