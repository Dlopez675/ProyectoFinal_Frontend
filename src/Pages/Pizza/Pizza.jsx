import React, { useContext, useEffect, useState } from 'react'; // Añade useContext aquí
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { formatNumber } from '../../assets/js/utils';
import './pizza.css';

const Pizza = () => {
  const { id } = useParams(); // Obtener el ID de la pizza de la URL
  const { addToCart } = useContext(CartContext); // Función para agregar al carrito
  const [pizza, setPizza] = useState(null); // Estado para almacenar la pizza
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Obtener la URL del backend desde la variable de entorno
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`${apiUrl}/pizza/${id}`);
        if (!response.ok) {
          throw new Error("Pizza no encontrada");
        }
        const data = await response.json();
        setPizza(data.pizza);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id, apiUrl]); // Añade apiUrl como dependencia

  if (loading) {
    return <div>Cargando pizza...</div>; // Mostrar un mensaje de carga
  }

  if (error) {
    return <div>{error}</div>; // Mostrar un mensaje de error
  }

  if (!pizza) {
    return <div>No se encontró la pizza.</div>; // Mostrar un mensaje si la pizza no existe
  }

  return (
    <div className="pizza-detail">
      <img src={pizza.img} className="pizza-image" alt={pizza.product_name} />
      <div className="pizza-info">
        <h2>{pizza.product_name}</h2>
        <hr />
        {pizza.ingredients && ( // Verifica si pizza.ingredients está definido
          <p>
            <strong>Ingredientes:</strong> {pizza.ingredients}
          </p>
        )}
        <hr />
        <p>
          <strong>Descripción:</strong> {pizza.description || "No hay descripción disponible."}
        </p>
        <hr />
        <p>
          <strong>Precio:</strong> {formatNumber(pizza.price)}
        </p>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => addToCart(pizza)}>
            <i className="fa-solid fa-cart-shopping"></i> Añadir al carrito
          </button>
        </div>
        <div className="seller-info">
          <strong>Vendedor:</strong> {pizza.vendedor || "Desconocido"}
        </div>
      </div>
    </div>
  );
};

export default Pizza;