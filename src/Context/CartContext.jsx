import React, { createContext, useContext, useReducer } from 'react';

// Crear el contexto fuera del componente para evitar recrearlo en cada renderizado
export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.find((item) => item.id === action.payload.id);
      if (existingProduct) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'ADD_MULTIPLE_TO_CART':
      const newCart = [...state];
      action.payload.items.forEach((item) => {
        const existingItem = newCart.find((cartItem) => cartItem.id === item.product_id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          newCart.push({
            id: item.product_id,
            product_name: item.product_name,
            price: item.price,
            quantity: item.quantity,
            img: item.img,
          });
        }
      });
      return newCart;
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload);
    case 'INCREMENT_QUANTITY':
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case 'DECREMENT_QUANTITY':
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const addMultipleToCart = (items) => {
    dispatch({ type: 'ADD_MULTIPLE_TO_CART', payload: { items } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const incrementQuantity = (id) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
  };

  const decrementQuantity = (id) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        calculateSubtotal,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Exportar el hook useCart para acceder al contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};