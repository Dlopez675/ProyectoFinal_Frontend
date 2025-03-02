import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  // Obtener la URL del backend desde la variable de entorno
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchPizzas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/productos`); // Usar la variable de entorno aquí
      setPizzas(response.data.productos); // Almacenar las pizzas en el estado
    } catch (error) {
      console.error("Error al obtener las pizzas:", error);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, [apiUrl]); // Añadir apiUrl como dependencia

  const refreshPizzas = () => {
    fetchPizzas();
  };

  return (
    <PizzaContext.Provider value={{ pizzas, refreshPizzas }}>
      {children}
    </PizzaContext.Provider>
  );
};
//PizzaContext.jsx