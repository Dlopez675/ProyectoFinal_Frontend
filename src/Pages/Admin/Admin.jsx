import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { PizzaContext } from '../../Context/PizzaContext.jsx';

const Admin = () => {
  const [addProduct, setAddProduct] = useState({
    product_name: '',
    description: '',
    img: '',
    price: '',
    stock: '',
    category_id: '',
    ingredients: '',
  });

  const [updateProduct, setUpdateProduct] = useState({
    id: '',
    product_name: '',
    description: '',
    img: '',
    price: '',
    stock: '',
    category_id: '',
    ingredients: '',
  });

  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const { refreshPizzas } = useContext(PizzaContext);

  // Obtener la URL del backend desde la variable de entorno
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener las categorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categorias`); // Usar la variable de entorno aquí
        setCategories(response.data.categorias);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, [apiUrl]); // Añadir apiUrl como dependencia

  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setAddProduct({ ...addProduct, [name]: value });
  };

  const handleUpdateProductChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      if (
        !addProduct.product_name ||
        !addProduct.description ||
        !addProduct.img ||
        !addProduct.price ||
        !addProduct.stock ||
        !addProduct.category_id ||
        !addProduct.ingredients
      ) {
        alert("Todos los campos son obligatorios");
        return;
      }

      const ingredientsArray = addProduct.ingredients.split(',').map((ing) => ing.trim());

      const response = await axios.post(
        `${apiUrl}/productos`, // Usar la variable de entorno aquí
        { ...addProduct, ingredients: ingredientsArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Producto creado exitosamente");
        setAddProduct({
          product_name: '',
          description: '',
          img: '',
          price: '',
          stock: '',
          category_id: '',
          ingredients: '',
        });
        refreshPizzas(); // Actualizar la lista de pizzas
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Error al crear el producto");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (!updateProduct.id) {
        alert("Debes ingresar el ID del producto que deseas actualizar.");
        return;
      }

      const ingredientsArray = updateProduct.ingredients.split(',').map((ing) => ing.trim());

      const response = await axios.put(
        `${apiUrl}/productos/${updateProduct.id}`, // Usar la variable de entorno aquí
        { ...updateProduct, ingredients: ingredientsArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Producto actualizado exitosamente");
        setUpdateProduct({
          id: '',
          product_name: '',
          description: '',
          img: '',
          price: '',
          stock: '',
          category_id: '',
          ingredients: '',
        });
        refreshPizzas(); // Actualizar la lista de pizzas
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Error al actualizar el producto");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if (!updateProduct.id) {
        alert("Debes ingresar el ID del producto que deseas eliminar.");
        return;
      }

      const response = await axios.delete(
        `${apiUrl}/productos/${updateProduct.id}`, // Usar la variable de entorno aquí
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Producto eliminado exitosamente");
        setUpdateProduct({
          id: '',
          product_name: '',
          description: '',
          img: '',
          price: '',
          stock: '',
          category_id: '',
          ingredients: '',
        });
        refreshPizzas(); // Actualizar la lista de pizzas
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title">Administrar Producto</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  value={updateProduct.id}
                  onChange={handleUpdateProductChange}
                />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="product_name"
                  value={updateProduct.product_name}
                  onChange={handleUpdateProductChange}
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={updateProduct.description}
                  onChange={handleUpdateProductChange}
                />
              </div>
              <div className="form-group">
                <label>Imagen (URL)</label>
                <input
                  type="text"
                  className="form-control"
                  name="img"
                  value={updateProduct.img}
                  onChange={handleUpdateProductChange}
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={updateProduct.price}
                  onChange={handleUpdateProductChange}
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={updateProduct.stock}
                  onChange={handleUpdateProductChange}
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select
                  className="form-control"
                  name="category_id"
                  value={updateProduct.category_id}
                  onChange={handleUpdateProductChange}
                >
                  <option value="">Seleccione una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Ingredientes (separados por comas)</label>
                <input
                  type="text"
                  className="form-control"
                  name="ingredients"
                  value={updateProduct.ingredients}
                  onChange={handleUpdateProductChange}
                />
              </div>
              <button className="btn btn-warning mr-2" onClick={handleUpdateProduct}>
                Actualizar
              </button>
              <button className="btn btn-danger" onClick={handleDeleteProduct}>
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5 className="card-title">Agregar Producto</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="product_name"
                  value={addProduct.product_name}
                  onChange={handleAddProductChange}
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={addProduct.description}
                  onChange={handleAddProductChange}
                />
              </div>
              <div className="form-group">
                <label>Imagen (URL)</label>
                <input
                  type="text"
                  className="form-control"
                  name="img"
                  value={addProduct.img}
                  onChange={handleAddProductChange}
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={addProduct.price}
                  onChange={handleAddProductChange}
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={addProduct.stock}
                  onChange={handleAddProductChange}
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select
                  className="form-control"
                  name="category_id"
                  value={addProduct.category_id}
                  onChange={handleAddProductChange}
                >
                  <option value="">Seleccione una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Ingredientes (separados por comas)</label>
                <input
                  type="text"
                  className="form-control"
                  name="ingredients"
                  value={addProduct.ingredients}
                  onChange={handleAddProductChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleAddProduct}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;