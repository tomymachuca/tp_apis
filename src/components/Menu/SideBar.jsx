import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Función para obtener el id_usuario del localStorage o contexto (aquí usaremos localStorage como ejemplo)
  const getUserId = () => {
    const user = localStorage.getItem('user'); // Suponiendo que 'user' tiene el id_usuario
    if (user) {
      return JSON.parse(user).id_usuario; // Si usas un objeto, puedes extraer el id_usuario
    }
    return null; // Si no está logueado
  };

  // Obtener el id_usuario
  const userId = getUserId();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed top-16 left-4 z-50 md:hidden">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-gray-50 border-r transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        {/* Navegación */}
        <nav className="flex-1 mt-6">
          {/* Link a Menu (Ruta: /menu) */}
          <Link
            to="/menu"
            className="flex items-center px-4 py-2 text-black rounded-md hover:bg-gray-200 hover:text-black transition-colors duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.89543 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mx-4 font-medium">Grupos</span>
          </Link>

          {/* Link a Cuenta (Ruta: /user-profile) */}
          <Link
            to={`/tu-perfil/${userId}`} // Usamos el userId dinámico aquí
            className="flex items-center px-4 py-2 mt-5 text-black rounded-md hover:bg-gray-200 hover:text-black transition-colors duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="mx-4 font-medium">Cuenta</span>
          </Link>

          {/* Link a Carga tu Ticket (Ruta: /charge-ticket) */}
          <Link
            to="/cargar-ticket"
            className="flex items-center px-4 py-2 mt-5 text-black rounded-md hover:bg-gray-200 hover:text-black transition-colors duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mx-4 font-medium">Carga tu Ticket</span>
          </Link>

          <hr className="my-6 border-gray-200" />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
