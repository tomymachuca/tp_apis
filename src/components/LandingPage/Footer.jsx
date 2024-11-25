import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900">
      <div className="container p-6 mx-auto text-white">
        <div className="lg:flex">
          {/* Logo and description section */}
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <a href="#">
                <span className="text-white font-bold text-2xl">
                  SliceTicket
                </span>
              </a>
              <p className="max-w-sm mt-2 text-gray-300">
                Únete a miles de usuarios y no te pierdas los nuevos tutoriales y tips que ofrecemos.
              </p>

              <div className="flex mt-6 -mx-2">
                <a href="#" className="mx-2 text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  {/* Add appropriate icons */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {/* Icon */}
                  </svg>
                </a>

                <a href="#" className="mx-2 text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  {/* Add appropriate icons */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {/* Icon */}
                  </svg>
                </a>

                <a href="#" className="mx-2 text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  {/* Add appropriate icons */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {/* Icon */}
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Links section */}
          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-white uppercase">Sobre nosotros</h3>
                <a href="#" className="block mt-2 text-sm text-gray-300 hover:underline">
                  La empresa
                </a>
                <a href="#" className="block mt-2 text-sm text-gray-300 hover:underline">
                  Comunidad
                </a>
                <a href="#" className="block mt-2 text-sm text-gray-300 hover:underline">
                  Carreras
                </a>
              </div>

              <div>
                <h3 className="text-white uppercase">Blog</h3>
                <a href="#" className="block mt-2 text-sm text-gray-300 hover:underline">
                  Tecnología
                </a>
                <a href="#" className="block mt-2 text-sm text-gray-300 hover:underline">
                  Música
                </a>
                <a href="#" className="block mt-2 text-sm text-gray-300 hover:underline">
                  Videos
                </a>
              </div>

              <div>
                <h3 className="text-white uppercase">Contacto</h3>
                <span className="block mt-2 text-sm text-gray-300 hover:underline">
                  +1 526 654 8965
                </span>
                <span className="block mt-2 text-sm text-gray-300 hover:underline">
                  SliceTicket@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-gray-600 border-none" />

        <div>
          <p className="text-center text-gray-400">
            © SliceTicket 2024 - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
