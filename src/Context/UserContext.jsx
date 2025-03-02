import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [compras, setCompras] = useState([]);

    // Obtener la URL del backend desde la variable de entorno
    const apiUrl = import.meta.env.VITE_API_URL;

    // Registrar usuario
    const registerUser = async (username, email, password) => {
        try {
            const response = await axios.post(`${apiUrl}/crear_cuenta`, { username, email, password });
            if (response.status === 201) {
                // No establecer el estado de autenticación ni el usuario
                return true;
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            return false;
        }
    };

    // Obtener las compras del usuario
    const fetchCompras = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${apiUrl}/orders/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCompras(response.data);
        } catch (error) {
            console.error("Error al obtener las compras:", error);
            setCompras([]);
        }
    };

    // Iniciar sesión
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${apiUrl}/iniciar_sesion`, { email, password });
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUser(response.data.user);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                fetchCompras(response.data.user.id); // Obtener las compras después de iniciar sesión
                return true;
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            return false;
        }
    };

    // Cerrar sesión
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setCompras([]);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // Verificar autenticación al cargar la aplicación
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            if (decodedToken.exp * 1000 > Date.now()) {
                setIsAuthenticated(true);
                setUser({ id: decodedToken.id, email: decodedToken.email, username: decodedToken.username });
                fetchCompras(decodedToken.id); // Obtener las compras al cargar la aplicación
            } else {
                logout();
            }
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                user,
                compras,
                login,
                logout,
                registerUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
//UserContext.jsx