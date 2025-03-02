import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Obtener la URL del backend desde la variable de entorno
    const apiUrl = import.meta.env.VITE_API_URL;

    // Obtener los favoritos del backend
    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${apiUrl}/favoritos`, { // Usar la variable de entorno aquí
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFavorites(response.data.favoritos);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    // Alternar entre agregar y eliminar un favorito
    const toggleFavorite = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${apiUrl}/favoritos/toggle`, // Usar la variable de entorno aquí
                { product_id: productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Actualizar la lista de favoritos después de togglear
            await fetchFavorites();
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    // Cargar los favoritos al iniciar la aplicación
    useEffect(() => {
        fetchFavorites();
    }, [apiUrl]); // Añadir apiUrl como dependencia

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
//FavoritosContext.jsx