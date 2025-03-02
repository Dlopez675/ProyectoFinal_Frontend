// src/Context/PedidosContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const PedidosContext = createContext();

// Crear el proveedor del contexto
export const PedidosProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);

  const agregarPedido = (nuevoPedido) => {
    setPedidos((prevPedidos) => [...prevPedidos, nuevoPedido]);
  };

  return (
    <PedidosContext.Provider value={{ pedidos, agregarPedido }}>
      {children}
    </PedidosContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('usePedidos debe ser usado dentro de un PedidosProvider');
  }
  return context;
};
//PedidosContext.jsx