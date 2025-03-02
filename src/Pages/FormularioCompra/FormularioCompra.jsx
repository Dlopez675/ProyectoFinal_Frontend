import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../Context/CartContext'; // Importa el contexto del carrito
import './FormularioCompra.css';

const FormularioCompra = () => {
    const { order_id } = useParams();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();
    const { clearCart } = useCart(); // Obtén la función para vaciar el carrito

    // Obtener la URL del backend desde la variable de entorno
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Obtener el ID del usuario desde el localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                throw new Error("Usuario no autenticado");
            }

            // Preparar los datos del formulario
            const formData = {
                nombre,
                apellido,
                direccion,
                numeroTarjeta,
                fechaVencimiento,
                cvv,
            };

            // Enviar los datos al backend
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${apiUrl}/formulario_compra/${order_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Vaciar el carrito
                clearCart();

                // Redirigir a la página de Mis Compras
                navigate('/MisCompras');
            }
        } catch (error) {
            console.error("Error al confirmar el formulario:", error);
            alert("Error al confirmar el formulario");
        }
    };

    return (
        <div className="formulario-compra">
            <h2>Formulario de Compra</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Número de Pedido</label>
                    <input
                        type="text"
                        className="form-control"
                        value={order_id}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Número de Tarjeta</label>
                    <input
                        type="text"
                        className="form-control"
                        value={numeroTarjeta}
                        onChange={(e) => setNumeroTarjeta(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fecha de Vencimiento</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                        placeholder='YYYY-MM-DD'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Confirmar</button>
            </form>
        </div>
    );
};

export default FormularioCompra;

