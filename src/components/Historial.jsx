import React, { useState, useEffect } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Menu/Navbar";
import { getTicketsByProjectId } from "../api/tickets";
import { getMembersByGroupId } from "../api/groups";

export const Historial = () => {
  const [tickets, setTickets] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id_grupo } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("historial");

  useEffect(() => {
    if (!id_grupo) {
      setError("ID de grupo no encontrado en la URL.");
      setLoading(false);
      return;
    }

    const fetchTicketsAndUsers = async () => {
      try {
        setLoading(true);

        // Obtener tickets por ID de grupo
        const ticketsResponse = await getTicketsByProjectId(id_grupo);

        // Procesar las URLs de las imágenes
        const processedTickets = ticketsResponse.map((ticket) => ({
          ...ticket,
          imagen_url: ticket.imagen
            ? `${process.env.REACT_APP_API_URL || "http://localhost:3000"}${ticket.imagen}`
            : null,
        }));

        setTickets(processedTickets);

        // Obtener usuarios por ID de grupo
        const usersResponse = await getMembersByGroupId(id_grupo);
        if (usersResponse.members) {
          const map = {};
          usersResponse.members.forEach((member) => {
            map[member.id] = member.nombre;
          });
          setUsersMap(map);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("No se encontraron tickets para este grupo.");
        } else {
          console.error("Error al cargar los datos:", error);
          setError("Hubo un problema al cargar los datos. Por favor, inténtalo de nuevo.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTicketsAndUsers();
  }, [id_grupo]);

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (tab === "members") navigate(`/miembros/${id_grupo}`);
    else if (tab === "balance") navigate(`/balance/${id_grupo}`);
  };

  const handleAddTicket = () => {
    navigate(`/ticket-grupo`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <section className="container mx-auto px-4 py-6 mt-16">
        {/* Selector de pestañas */}
        <div className="mb-6 md:flex md:items-center md:justify-between">
          <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
            <button
              className={`inline-flex items-center h-10 px-4 -mb-px text-sm ${
                activeTab === "members"
                  ? "text-blue-600 border-blue-500 shadow-lg"
                  : "text-gray-700 border-transparent"
              } bg-transparent border-b-2 sm:text-base`}
              onClick={() => handleNavigation("members")}
            >
              Miembros
            </button>
            <button
              className={`inline-flex items-center h-10 px-4 -mb-px text-sm ${
                activeTab === "historial"
                  ? "text-blue-600 border-blue-500 shadow-lg"
                  : "text-gray-700 border-transparent"
              } bg-transparent border-b-2 sm:text-base`}
            >
              Historial
            </button>
            <button
              className={`inline-flex items-center h-10 px-4 -mb-px text-sm ${
                activeTab === "balance"
                  ? "text-blue-600 border-blue-500 shadow-lg"
                  : "text-gray-700 border-transparent"
              } bg-transparent border-b-2 sm:text-base`}
              onClick={() => handleNavigation("balance")}
            >
              Balance
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddTicket}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow"
          >
            Agregar Ticket
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Cargando tickets...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-600">No hay tickets disponibles para este grupo.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="p-4 text-left text-gray-700 font-semibold">Usuario</th>
                  <th className="p-4 text-left text-gray-700 font-semibold">Descripción</th>
                  <th className="p-4 text-left text-gray-700 font-semibold">Precio</th>
                  <th className="p-4 text-left text-gray-700 font-semibold">Foto</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 text-gray-900">{usersMap[ticket.id_usuario] || "Usuario desconocido"}</td>
                    <td className="p-4 text-gray-600">{ticket.descripcion || "Sin descripción"}</td>
                    <td className="p-4 text-gray-600">
                      {typeof ticket.monto_total === "number"
                        ? `$${ticket.monto_total.toFixed(2)}`
                        : `$${parseFloat(ticket.monto_total || 0).toFixed(2)}`}
                    </td>
                    <td className="p-4 text-gray-600">
                      {ticket.imagen_url ? (
                        <FaTicketAlt
                          title="Mostrar Ticket"
                          className="text-blue-500 cursor-pointer w-6 h-6"
                          onClick={() => setSelectedTicket(ticket.imagen_url)}
                        />
                      ) : (
                        "No disponible"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedTicket && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedTicket(null)}
        >
          <div className="relative">
            <img src={selectedTicket} alt="Ticket" className="max-w-lg rounded-lg shadow-lg" />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setSelectedTicket(null)}
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
