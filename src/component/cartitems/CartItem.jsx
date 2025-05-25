import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CartItem = () => {
  const { cartItems, removeFromCart, updateCart } = useContext(AppContext);

  return (
    <div className='p-3 h-100 overflow-y-auto'>
      {cartItems.length === 0 ? (
        <p className='text-light'>Your cart is empty</p>
      ) : (
        <div className='cart-items-list'>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className='cart-item mb-3 p-3 bg-dark rounded d-flex justify-content-between align-items-center'
            >
              <span className='text-light'>{item.name}</span>
              <div className='d-flex align-items-center gap-2'>
                <button
                  className='btn btn-secondary btn-sm'
                  onClick={() => updateCart(item.itemId, item.quantity - 1)}
                >
                  -
                </button>
                <span className='text-light'>Qty: {item.quantity}</span>
                <button
                  className='btn btn-secondary btn-sm'
                  onClick={() => updateCart(item.itemId, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className='btn btn-danger btn-sm'
                onClick={() => removeFromCart(item.itemId)}
              >
                <i className='bi bi-trash'></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItem;
