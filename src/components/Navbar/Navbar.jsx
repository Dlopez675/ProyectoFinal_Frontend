import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(UserContext); // Extrae user del contexto

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Todo Pizza</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page" href="#">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Registro" className="nav-link" href="#">Registro</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Login" className="nav-link" href="#">Login</Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/Tienda" className="nav-link" href="#">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Perfil" className="nav-link" href="#">Mi Perfil </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logout}>Cerrar Sesión</button>
                </li>
                <li className="nav-item">
                  <Link to="/Cart" className="nav-link" href="#">
                    <i className="fa-solid fa-cart-shopping"></i> Cart
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;