import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [notifications] = useState([
    { message: "Nueva actualización disponible", type: "info" },
    { message: "Recibiste un nuevo mensaje", type: "message" },
    { message: "Tu grupo ha sido actualizado", type: "update" },
    { message: "Nueva actividad en tu grupo", type: "activity" },
    { message: "Un nuevo miembro se ha unido", type: "join" },
  ]);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const renderNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      case "message":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "update":
        return <CheckCircleIcon className="h-5 w-5 text-yellow-500" />;
      case "activity":
        return <CheckCircleIcon className="h-5 w-5 text-purple-500" />;
      case "join":
        return <CheckCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleShowMoreClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAll(!showAll);
  };

  return (
    <header className="bg-gray-50 shadow-md w-full fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-blue-600">SliceTicket</div>

        <nav className="flex space-x-8">
          <Link to="/menu" className="text-2xl font-semibold text-blue-600 hover:text-blue-600">
            Menu
          </Link>
        </nav>

        <div className="flex items-center">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button
                onClick={toggleMenu}
                type="button"
                className="rounded-full bg-gray-50 p-1 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <span className="sr-only">Ver notificaciones</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
            </div>

            {menuOpen && (
              <Menu.Items
                className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                static
              >
                {notifications.slice(0, showAll ? notifications.length : 3).map((notification, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <div
                        className={`flex items-center gap-2 px-4 py-2 text-sm text-gray-700 ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        {renderNotificationIcon(notification.type)}
                        <span>{notification.message}</span>
                      </div>
                    )}
                  </Menu.Item>
                ))}

                {notifications.length > 3 && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleShowMoreClick}
                        className={`block w-full px-4 py-2 text-sm text-blue-500 font-medium text-left ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        {showAll ? "Ver menos notificaciones" : "Ver todas las notificaciones"}
                      </button>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            )}
          </Menu>

          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                <span className="sr-only">Abrir menú de usuario</span>
                {user?.foto_perfil ? (
                  <img
                    src={`http://localhost:3000${user.foto_perfil}`} // Adjusted to prepend backend URL
                    alt="Usuario"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    <span>{user?.nombre?.charAt(0)}</span>
                  </div>
                )}
              </Menu.Button>
            </div>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/");
                    }}
                    className={`block w-full px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 transition-all ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    Cerrar Sesión
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
