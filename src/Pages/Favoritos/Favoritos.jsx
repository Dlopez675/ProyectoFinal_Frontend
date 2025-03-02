import React, { useContext } from 'react';
import { useFavorites } from '../../Context/FavoritosContext';
import { useCart } from '../../Context/CartContext'; // Importa el contexto del carrito
import CardPizza from '../../components/CardPizza/CardPizza';
import './Favoritos.css';

const Favoritos = () => {
    const { favorites } = useFavorites();
    const { addToCart } = useCart(); // Obtén la función para añadir al carrito

    return (
        <div className="favoritos-container">
            <h2>Mis Favoritos</h2>
            {favorites.length === 0 ? (
                <p className="no-favoritos">No tienes productos favoritos.</p>
            ) : (
                <div className="favoritos-grid">
                    {favorites.map((pizza) => (
                        <div key={pizza.id} className="favorito-item">
                            <CardPizza pizza={pizza} onAddToCart={() => addToCart(pizza)} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favoritos;