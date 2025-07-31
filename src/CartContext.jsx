import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    
    if (saved) {
      const parsedItems = JSON.parse(saved);
      return parsedItems.map(item => ({
        ...item,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity, 10),
        
        maxQuantity: parseInt(item.maxQuantity || item.quantity, 10) 
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productToAdd) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productToAdd.id);

      
      const parsedPrice = parseFloat(productToAdd.price);
      const desiredQuantity = parseInt(productToAdd.quantity, 10);
      const productMaxStock = parseInt(productToAdd.maxQuantity, 10);

      
      if (isNaN(parsedPrice) || isNaN(desiredQuantity) || isNaN(productMaxStock) || desiredQuantity <= 0) {
        console.error("Invalid numeric data for productToAdd:", productToAdd);
        return prev; 
      }

      if (existing) {
        const existingQuantity = parseInt(existing.quantity, 10);
        
        const newQuantity = Math.min(existingQuantity + desiredQuantity, productMaxStock);

        return prev.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        
        const newQuantity = Math.min(desiredQuantity, productMaxStock);
        return [...prev, { ...productToAdd, price: parsedPrice, quantity: newQuantity, maxQuantity: productMaxStock }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity, maxAvailableQuantity) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          
          const parsedNewQuantity = parseInt(newQuantity, 10);
          const parsedMaxAvailableQuantity = parseInt(maxAvailableQuantity, 10);

          if (isNaN(parsedNewQuantity) || isNaN(parsedMaxAvailableQuantity)) {
            console.error("Invalid numeric data for updateQuantity:", { id, newQuantity, maxAvailableQuantity });
            return item; 
          }

          
          return { ...item, quantity: Math.max(1, Math.min(parsedNewQuantity, parsedMaxAvailableQuantity)) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


