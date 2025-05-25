import { createContext, useState, useEffect } from "react";
import { fetchCategories } from "../service/CategoryService.js";
import { fetchItem } from "../service/ItemService";

// Define the shape of the context value for better type safety
const defaultContextValue = {
  categories: [],
  setCategories: () => { },
  auth: { token: null, role: null },
  setAuth: () => { },
  setAuthData: () => { },
  item: [],
  setItem: () => { },
  addToCart: () => { },
  cartItems: [],
  setCartItems: () => { },
  removeFromCart: () => { },
  updateCart: () => { },
  clearCart: () => { },
};

// Create the context with a default value
export const AppContext = createContext(defaultContextValue);

export const AppContextProvider = (props) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  });

  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === newItem.name);//
    if (existingItem) {
      setCartItems(prevCartItems =>
        prevCartItems.map(cartItem =>
          cartItem.name === newItem.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 } //number of item will increase 
            : cartItem
        )
      );
    } else {
      //add if not present 
      setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
    }
  };


  const updateCart = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    }
    
    if (newQuantity > 0) {
      setCartItems(prevCartItems =>
        prevCartItems.map(cartItem =>
          cartItem.itemId ===  itemId
            ? { ...cartItem, quantity: newQuantity } //number of item will increase 
            : cartItem
        )
      );
    }

  }

  const removeFromCart = (itemId) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.itemId !== itemId)
    );
  };
  
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchCategories();
        const itemResponse = await fetchItem();
        setCategories(response.data || []);
        setItem(itemResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch categories or items:", error);
        setCategories([]);
        setItem([]);
      }
    }

    loadData();
  }, []);

  const setAuthData = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ token, role });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuth,
    setAuthData,
    item,
    setItem,
    addToCart,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCart,
    clearCart,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
