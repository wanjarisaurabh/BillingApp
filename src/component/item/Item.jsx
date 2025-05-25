import React, { useContext } from 'react';
import './Item.css';
import { FaShoppingCart } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';

const Item = ({ itemName, itemPrice, itemImage, itemId }) => {
  const { addToCart , cartItems } = useContext(AppContext);
  const handleAddToCart = () => {
    addToCart({
      name: itemName,
      price: itemPrice,
      quantity: 1,
      itemId: itemId
    });

    console.log(cartItems)
  }
  return (
    <div className=" card item-card d-flex flex-row align-items-center p-2">
      <img src={itemImage} alt={itemName} className="item-image me-3" />

      <div className="item-info flex-grow-1">
        <div className="item-name fw-bold">{itemName}</div>
        <div className="item-price">₹{itemPrice}</div>
      </div>

      <div className="item-actions d-flex flex-column align-items-center">
        <FaShoppingCart className="cart-icon mb-2" />
        <button className="btn btn-sm btn-success rounded-circle" onClick={handleAddToCart}>+</button>
      </div>
    </div>
  );
};

export default Item;
