import React, { useContext } from 'react';
import { useFavorites } from '../../Context/FavoritosContext';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../assets/js/utils';
import './cardpizza.css';

const CardPizza = ({ pizza }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Verificar si el producto actual está en la lista de favoritos
    const isFavorite = favorites.some(fav => fav.id === pizza.id);

    // Navegar a la página de detalles del producto
    const handleViewMore = () => {
        navigate(`/pizza/${pizza.id}`);
    };

    return (
        <div className="card">
            <img src={pizza.img} className="card-img-top" alt={pizza.product_name} />
            <div className="card-body">
                <h4 className="card-title">{pizza.product_name}</h4>
                <hr />
                <p className="card-text">
                    <strong>Precio: {formatNumber(pizza.price)}</strong>
                </p>
                <div className="mt-auto d-flex justify-content-around gap-2">
                    <button className="btn btn-outline-success col-5" onClick={handleViewMore}>
                        <i className="fa-solid fa-eye"></i> Ver más
                    </button>
                    <button
                        className="btn btn-outline-success col-5"
                        onClick={() => addToCart(pizza)}
                    >
                        <i className="fa-solid fa-cart-shopping"></i> Añadir
                    </button>
                </div>
                <div className="mt-3 text-center">
                    <strong>Vendedor:</strong> {pizza.vendedor || "Desconocido"}
                </div>
                <button
                    className={`favorite-button btn btn-outline-success ${isFavorite ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(pizza.id)}
                >
                    {isFavorite ? (
                        <i className="fa-solid fa-heart" style={{ color: 'red' }}></i>
                    ) : (
                        <i className="fa-regular fa-heart"></i>
                    )}
                    {isFavorite ? ' Quitar de favoritos' : ' Agregar a favoritos'}
                </button>
            </div>
        </div>
    );
};

export default CardPizza;