/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState} from 'react';
import '../styles/ShoppingCart.css';

export const addToCart = (item, quantity, cartItems, setCartItems) => {
    setCartItems([...cartItems, { item, quantity }]);
  };

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const minus = (itemIndex) => {
    const cartProducts = [...cartItems];
    const item = cartProducts[itemIndex];

    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems(cartProducts);
    } else {
      cartProducts.splice(itemIndex, 1);
      setCartItems(cartProducts);
    }
  };

  const plus = (itemIndex) => {
    const cartProducts = [...cartItems];
    const item = cartProducts[itemIndex];
    item.quantity += 1;
    setCartItems(cartProducts);
  };

  return (
    <div id="cartContainer">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (<p id="noItemsText">Nothing added yet.</p>) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} id="cartItemContainer">
              <img src={item.item.thumbnail} id="cartThumbnail" />
              <p id="cartTitle">{item.item.title}</p>
              <div id="quantityContainer">
                <button id='minus' onClick={() => minus(index)}>-</button>
                <div id='itemQuantity'>{item.quantity}</div>
                <button id='plus' onClick={() => plus(index)}>+</button>
              </div>
              <p id="cartPrice">${item.item.price}</p>
            </div>
          ))}
          <div id='totalContainer'>
            <p id="total"> Total:</p>
            <p>${cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
