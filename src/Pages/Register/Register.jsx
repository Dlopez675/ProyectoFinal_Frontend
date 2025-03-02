import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import '../Register/register.css';

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1.length < 6) {
      setMessage('El password debe tener al menos 6 caracteres');
      setIsSuccess(false);
      return;
    }

    if (password1 !== password2) {
      setMessage('El password y la confirmación del password deben ser iguales');
      setIsSuccess(false);
      return;
    }

    const registrationSuccess = await registerUser(name, email, password1);
    if (registrationSuccess) {
      setMessage("Registro exitoso. Redirigiendo...");
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/Login'); // Redirigir a la página de login
      }, 2000);
    } else {
      setMessage("Error al registrar el usuario");
      setIsSuccess(false);
    }
  };

  return (
    <div className='contentform'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control" 
            name='name'
            value={name} 
            id="exampleInputName" 
            aria-describedby="nameHelp" 
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            name='email'
            value={email} 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name='password1' 
            value={password1}
            id="exampleInputPassword1" 
            required 
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Validate Password</label>
          <input 
            type="password" 
            className="form-control" 
            name='password2' 
            value={password2}
            id="exampleInputPassword2" 
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Registrarse</button>
        <br />
        <br />
        {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;