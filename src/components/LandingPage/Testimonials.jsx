import React from 'react';

const Testimonials = () => {
  return (
    <section className="bg-blue-100 ">
      <div className="container px-6 py-10 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div>
          <h1 className="text-2xl font-semibold text-gray-900 capitalize lg:text-3xl">
              Opiniones de nuestros clientes
          </h1>
            <div className="flex mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-blue-700 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-blue-700 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-blue-700 rounded-full"></span>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
  {/* Primera tarjeta */}
  <div className="p-8 border rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-xl">
    <p className="leading-loose text-gray-700">
      “No puedo estar más satisfecha con el servicio. La interfaz es muy fácil de usar y me ayudó a resolver todo lo que necesitaba de manera rápida. ¡Definitivamente lo recomendaré a mis amigos!”.
    </p>
    <div className="flex items-center mt-8 -mx-2">
      <img
        className="object-cover mx-2 rounded-full w-14 h-14 ring-4 ring-blue-300"
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt="Robert"
      />
      <div className="mx-2">
        <h1 className="font-semibold text-gray-800">
          Robert
        </h1>
        <span className="text-sm text-gray-600">
          CTO, Robert Consultency
        </span>
      </div>
    </div>
  </div>

  {/* Segunda tarjeta */}
  <div className="p-8 bg-blue-700 border border-transparent rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-xl">
    <p className="leading-loose text-white">
      “¡Simplemente increíble! La página es súper intuitiva y el soporte al cliente es excepcional. En cuestión de minutos tuve mi problema resuelto. ¡Sigan con el excelente trabajo!”.
    </p>
    <div className="flex items-center mt-8 -mx-2">
      <img
        className="object-cover mx-2 rounded-full w-14 h-14 ring-4 ring-blue-300"
        src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=764&q=80"
        alt="Jeny Doe"
      />
      <div className="mx-2">
        <h1 className="font-semibold text-white">Jeny Doe</h1>
        <span className="text-sm text-blue-200">CEO, Jeny Consultency</span>
      </div>
    </div>
  </div>

  {/* Tercera tarjeta */}
  <div className="p-8 border rounded-lg shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-xl">
    <p className="leading-loose text-gray-700">
      “Nunca había encontrado una plataforma tan eficiente. Desde el primer momento, pude navegar sin problemas y obtener exactamente lo que buscaba. ¡Cinco estrellas!”.
    </p>
    <div className="flex items-center mt-8 -mx-2">
      <img
        className="object-cover mx-2 rounded-full w-14 h-14 ring-4 ring-blue-300"
        src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1470&q=80"
        alt="Ema Watson"
      />
      <div className="mx-2">
        <h1 className="font-semibold text-gray-800">
          Ema Watson
        </h1>
        <span className="text-sm text-gray-600">
          Marketing Manager at Stech
        </span>
      </div>
    </div>
  </div>
</section>

      </div>
    </section>
  );
};

export default Testimonials;
