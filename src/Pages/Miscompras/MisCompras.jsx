import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import { useCart } from '../../Context/CartContext'; // Importar el contexto del carrito
import axios from 'axios';
import { formatNumber } from '../../assets/js/utils';
import './MisCompras.css';
import { useNavigate } from 'react-router-dom';

const MisCompras = () => {
    const { user } = useContext(UserContext);
    const { addToCart } = useCart(); // Usar la función addToCart del contexto del carrito
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para el mensaje de éxito
    const navigate = useNavigate();

    // Obtener la URL del backend desde la variable de entorno
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchCompras = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${apiUrl}/orders/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data && response.data.length > 0) {
                        const comprasOrdenadas = response.data.sort((a, b) => b.order_id - a.order_id);
                        const ultimasTresCompras = comprasOrdenadas.slice(0, 3);
                        setCompras(ultimasTresCompras);
                    } else {
                        setCompras([]);
                    }
                } catch (error) {
                    console.error("Error al obtener las compras:", error);
                    if (error.response && error.response.status === 404) {
                        setCompras([]);
                    } else {
                        setError("Error al obtener las compras. Inténtalo de nuevo más tarde.");
                    }
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCompras();
    }, [user, apiUrl]);

    // Función para manejar el botón "Volver a comprar"
    const handleVolverAComprar = (productos) => {
        productos.forEach((producto) => {
            addToCart({
                id: producto.product_id,
                product_name: producto.product_name,
                price: producto.price,
                quantity: producto.quantity,
                img: producto.img,
            });
        });

        // Mostrar mensaje de éxito
        setShowSuccessMessage(true);

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);

        // Redirigir al carrito (opcional, si deseas redirigir automáticamente)
        // navigate('/carrito');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Cargando compras...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="mis-compras-container">
            <h2>Mis Compras</h2>
            {showSuccessMessage && ( // Mostrar mensaje de éxito si showSuccessMessage es true
                <div className="success-message">
                    ¡El pedido ha sido agregado al carrito correctamente!
                </div>
            )}
            {compras.length === 0 ? (
                <p className="no-compras">No hay compras registradas.</p>
            ) : (
                compras.map((compra, index) => (
                    <div key={index} className="compra-item">
                        <h3>Compra #{index + 1}</h3>
                        <ul>
                            {compra.productos && compra.productos.map((producto, idx) => (
                                <li key={idx}>
                                    <img src={producto.img} alt={producto.product_name} />
                                    <div className="product-details">
                                        <p className="product-name">{producto.product_name}</p>
                                        <p className="product-quantity">Cantidad: {producto.quantity}</p>
                                        <p className="product-price">Precio: {formatNumber(producto.price)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="total">
                            <strong>Total:</strong> {formatNumber(compra.productos.reduce((total, producto) => total + producto.price * producto.quantity, 0))}
                        </p>
                        {/* <button
                            className="volver-a-comprar-btn"
                            onClick={() => handleVolverAComprar(compra.productos)}
                        >
                            Volver a comprar
                        </button> */}
                    </div>
                ))
            )}
        </div>
    );
};

export default MisCompras;