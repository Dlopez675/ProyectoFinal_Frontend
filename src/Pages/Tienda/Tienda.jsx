import React, { useContext } from 'react';
import { PizzaContext } from '../../Context/PizzaContext';
import CardPizza from '../../components/CardPizza/CardPizza';
import './tienda.css';

const Tienda = () => {
  const { pizzas } = useContext(PizzaContext);

  console.log(pizzas); // Verifica que el campo "vendedor" esté presente

  return (
    <div className="tienda-container">
      <h1>Nuestra Tienda de Pizzas</h1>
      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <CardPizza key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default Tienda;