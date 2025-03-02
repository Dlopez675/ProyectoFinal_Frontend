import React from 'react';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../assets/js/utils';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
    const {
        cart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        calculateSubtotal,
        calculateTotal,
        clearCart,
        addToCart, // Asegúrate de que addToCart esté disponible en el contexto
    } = useCart();

    const navigate = useNavigate();

    // Obtener la URL del backend desde la variable de entorno
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleConfirmarPedido = async () => {
        try {
            // Obtener el ID del usuario desde el localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                throw new Error("Usuario no autenticado");
            }

            // Preparar los datos de la orden
            const orderData = {
                user_id: user.id,
                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            };

            // Enviar la orden al backend
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${apiUrl}/order_items`, // Usar la variable de entorno aquí
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                // Redirigir al formulario de compra con el ID de la orden
                navigate(`/formulario-compra/${response.data.order_id}`);
            }
        } catch (error) {
            console.error("Error al confirmar el pedido:", error);
            alert("Error al confirmar el pedido");
        }
    };

    // Función para manejar el botón "Volver a comprar"
    const handleVolverAComprar = (productos) => {
        // Verificar que los productos tengan la estructura correcta
        if (!Array.isArray(productos)) {
            console.error("Los productos no tienen un formato válido.");
            return;
        }

        // Agregar cada producto al carrito
        productos.forEach((producto) => {
            // Mapear los campos si es necesario
            const itemParaCarrito = {
                id: producto.id, // Si el campo es "id" en lugar de "product_id"
                product_name: producto.nombre, // Si el campo es "nombre" en lugar de "product_name"
                price: producto.precio, // Si el campo es "precio" en lugar de "price"
                quantity: producto.cantidad, // Si el campo es "cantidad" en lugar de "quantity"
                img: producto.imagen, // Si el campo es "imagen" en lugar de "img"
            };

            // Validar que todos los campos requeridos estén presentes
            if (
                !itemParaCarrito.id ||
                !itemParaCarrito.product_name ||
                !itemParaCarrito.price ||
                !itemParaCarrito.quantity ||
                !itemParaCarrito.img
            ) {
                console.error("El producto no tiene todos los campos requeridos:", producto);
                return;
            }

            // Agregar el producto al carrito
            addToCart(itemParaCarrito);
        });

        // Mostrar mensaje de éxito
        alert("¡El pedido ha sido agregado al carrito correctamente!");

        // Redirigir al carrito
        navigate('/carrito');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Carrito de Compras</h1>
            <div className="row">
                <div className="col-md-9">
                    {cart.length === 0 ? (
                        <div className="alert alert-info" role="alert">
                            Tu carrito está vacío.
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="card mb-3 cart-card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            src={item.img}
                                            className="img-fluid rounded-start"
                                            alt={item.product_name}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.product_name}</h5>
                                            <p className="card-text">
                                                <strong>Precio:</strong> {formatNumber(item.price)}
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => decrementQuantity(item.id)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-3">{item.quantity}</span>
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => incrementQuantity(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className="btn btn-danger btn-sm mt-3"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="card-title mb-0">Resumen de la Compra</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Pizza</th>
                                            <th>Cantidad</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.product_name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{formatNumber(calculateSubtotal(item))}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <hr />
                            <p className="card-text">
                                <strong>Total General:</strong> {formatNumber(calculateTotal())}
                            </p>

                            <button
                                className="btn btn-success w-100 mt-3"
                                disabled={cart.length === 0}
                                onClick={handleConfirmarPedido}
                            >
                                Confirmar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;