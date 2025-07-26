// src/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productToAdd) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productToAdd.id);
      
      
      const maxAvailableQuantity = productToAdd.quantity; 

      if (existing) {
        
        const newQuantity = Math.min(existing.quantity + productToAdd.quantity, maxAvailableQuantity);
        
        return prev.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        
        const newQuantity = Math.min(productToAdd.quantity, maxAvailableQuantity);
        return [...prev, { ...productToAdd, quantity: newQuantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          
          const maxAvailableQuantity = item.quantity; 
          
          return { ...item, quantity: Math.max(1, Math.min(newQuantity, maxAvailableQuantity)) };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};