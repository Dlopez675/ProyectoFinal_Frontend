import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';

const Perfil = () => {
  const { user, compras } = useContext(UserContext);

  if (!user) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga si el usuario no está disponible
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Tarjeta con el perfil del usuario */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Perfil de Usuario</h5>
              <p className="card-text">
                <strong>Nombre:</strong> {user.username} {/* Asegúrate de que user.username exista */}
              </p>
              <p className="card-text">
                <strong>Correo:</strong> {user.email} {/* Asegúrate de que user.email exista */}
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta con las compras del usuario
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mis Compras</h5>
              {compras.length === 0 ? (
                <p>No hay compras registradas.</p>
              ) : (
                <ul>
                  {compras.map((compra, index) => (
                    <li key={index}>
                      <strong>Compra #{index + 1}</strong> - Total: ${compra.total}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div> */}

        {/* Tarjeta con los botones de Favoritos y Mis Compras */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Acciones</h5>
              <div className="d-grid gap-2">
                <Link to="/favoritos" className="btn btn-primary btn-block">
                  Favoritos
                </Link>
                <Link to="/MisCompras" className="btn btn-secondary btn-block">
                  Mis Compras
                </Link>
                <Link to="/Admin" className="btn btn-success btn-block">
                  Administrador
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;