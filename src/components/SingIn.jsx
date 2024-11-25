import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const users = [
    { email: 'marcoriccitelli@gmail.com', password: 'Clave1234' },
    { email: 'tomasmachuca@gmail.com', password: 'Clave1234' },
    { email: 'francomagurno@gmail.com', password: 'Clave1234' },
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Por favor, ingrese un email válido.');
      return;
    }

    if (!password) {
      setError('Por favor, ingrese una contraseña.');
      return;
    }

    const userFound = users.find((user) => user.email === email && user.password === password);

    if (!userFound) {
      setError('Email o contraseña incorrectos.');
      return;
    }

    setError('');
    navigate('/menu');
  };

  const handleGoToLanding = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 m-auto bg-white rounded-lg shadow-md">
        {/* Título centrado con funcionalidad de redirección */}
        <div
          className="flex justify-center mb-6 cursor-pointer"
          onClick={handleGoToLanding}
        >
          <div className="text-2xl font-semibold text-blue-600">SliceTicket</div>
        </div>

        <form className="mt-6" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-800">Mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-sm text-gray-800">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {error && (
            <div className="mt-2 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          Aún no tienes cuenta?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:underline">
            Crea una
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
