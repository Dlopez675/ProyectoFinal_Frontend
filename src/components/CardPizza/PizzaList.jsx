import React, { useState, useEffect } from 'react';
import CardPizza from './CardPizza'; // Importa el componente CardPizza
import products from '../../assets/mocks/products.json'; // Importa el archivo JSON
import './PizzaList.css'; // Importa el archivo CSS

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Inicializa el estado con los datos del JSON
    const initializedPizzas = products.map(pizza => ({
      ...pizza,
      isFavorite: pizza.isFavorite || false,
    }));
    setPizzas(initializedPizzas);
  }, []);

  const handleToggleFavorite = (pizzaId) => {
    setPizzas((prevPizzas) =>
      prevPizzas.map((pizza) =>
        pizza.id === pizzaId ? { ...pizza, isFavorite: !pizza.isFavorite } : pizza
      )
    );
  };

  return (
    <div className="pizza-list">
      {pizzas.map((pizza) => (
        <CardPizza
          key={pizza.id}
          pizza={pizza}
          onToggleFavorite={() => handleToggleFavorite(pizza.id)}
        />
      ))}
    </div>
  );
};

export default PizzaList;