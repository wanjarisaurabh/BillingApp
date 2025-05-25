import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { deleteItem } from '../../service/ItemService';
import toast from 'react-hot-toast';

import './ItemList.css'; // 👈 import the CSS

const ItemList = () => {
  const { item, setItem, reloadData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filterItems = item
    ? item.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const deleteItemById = async (itemId) => {
    const originalItems = [...item];
    const updatedItems = item.filter((item) => item.itemId !== itemId);
    setItem(updatedItems);

    try {
      await deleteItem(itemId);
      toast.success("Item deleted successfully");
    } catch (error) {
      setItem(originalItems);
      toast.error("Error while deleting the item");
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="item-list-container">
      <input
        type="text"
        className="item-search"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />  

      <div className="item-list">
        {filterItems.map((item) => (
          <div key={item.itemId} className="item-card">
            <img src={item.imgUrl} alt={item.name} className="item-image" />
            <div className="item-details">
              <div className="item-name">{item.name}</div>
              <div className="item-category">Category: {item.category?.name}</div>
              <div className="item-price">₹{item.price}</div>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteItemById(item.itemId)}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        ))}
        {filterItems.length === 0 && (
          <p className="text-center text-muted">No items available.</p>
        )}
      </div>
    </div>
  );
};

export default ItemList;
