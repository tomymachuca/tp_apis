import React, { useState } from "react";
import { FaTicketAlt } from "react-icons/fa"; // Importar el ícono de ticket
import ticketImage from '../Img/ticket.jpg'; // Asegúrate de que esta ruta esté bien
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir

// Datos simulados de historial
const expenses = [
  {
    usuario: "Tomas Machuca",
    descripcion: "Compra de carne para el asado",
    precio: 999.99,
    ticket: ticketImage,
  },
  {
    usuario: "Marco Riccitelli",
    descripcion: "Compra de fideos para la cena",
    precio: 199.99,
    ticket: ticketImage,
  },
  {
    usuario: "Franco Magurno",
    descripcion: "Vodka para la fiesta",
    precio: 79.99,
    ticket: ticketImage,
  },
];

export const Historial = () => {
  const [selectedTicket, setSelectedTicket] = useState(null); // Estado para mostrar el ticket seleccionado
  const navigate = useNavigate(); // Hook para navegar

  const handleCloseModal = () => {
    setSelectedTicket(null); // Cierra el modal al hacer clic en la X o fuera de la imagen
  };

  const handleAddTicket = () => {
    navigate("/Ticket-Grupo"); // Redirige al nuevo componente de carga de ticket del grupo
  };

  return (
    <div className="container mx-auto p-4">
      {/* Título y botón agregar ticket */}
      <div className="mb-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Historial de Gastos</h1>
        <button
          onClick={handleAddTicket}
          className="flex items-center justify-center w-auto px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Agregar Ticket</span>
        </button>
      </div>

      {/* Subtítulo debajo del título */}
      <p className="text-gray-600 mb-4">
        Aquí puedes ver los detalles de los gastos realizados, incluyendo la descripción y la foto del ticket.
      </p>

      {/* Tabla de gastos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-4 text-left text-gray-700 font-semibold">Usuario</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Descripción</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Precio</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Foto</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="border-t">
                <td className="p-4 text-gray-900">
                  {expense.usuario}
                  {expense.usuario === "Tomas Machuca" && (
                    <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-lg">
                      Tú
                    </span>
                  )}
                </td>
                <td className="p-4 text-gray-600">{expense.descripcion}</td>
                <td className="p-4 text-gray-600">${expense.precio.toFixed(2)}</td>
                <td className="p-4 text-gray-600">
                  <FaTicketAlt
                    title="Mostrar Ticket"
                    className="text-blue-500 cursor-pointer w-6 h-6"
                    onClick={() => setSelectedTicket(expense.ticket)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para mostrar el ticket seleccionado */}
      {selectedTicket && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative">
            <img src={selectedTicket} alt="Ticket" className="max-w-lg rounded-lg shadow-lg" />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historial;
