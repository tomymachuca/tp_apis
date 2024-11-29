import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Menu/Navbar"; // Navbar
import { getBalancesByGroupId, closeBalanceByGroupId } from "../api/balances"; // API
import axios from "axios"; // Importar axios para hacer peticiones HTTP

const Balance = () => {
  const { groupId } = useParams(); // Obtener el ID del grupo desde la URL
  const [balances, setBalances] = useState([]); // Inicializar como un arreglo vacío
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Mantener el estado de carga
  const [activeTab, setActiveTab] = useState("balance"); // Estado para la pestaña activa
  const navigate = useNavigate();

  // Cargar balances
  useEffect(() => {
    if (!groupId) {
      setError("El ID del grupo no está definido.");
      setIsLoading(false);
      return;
    }

    const fetchBalances = async () => {
      try {
        // Obtener balances desde la API
        const fetchedBalances = await getBalancesByGroupId(groupId);

        // Validar que sea un arreglo antes de actualizar el estado
        if (Array.isArray(fetchedBalances)) {
          setBalances(fetchedBalances);
        } else {
          setBalances([]);
          console.error("La respuesta no es un arreglo:", fetchedBalances);
        }
      } catch (err) {
        console.error("Error fetching balances:", err);
        setError("Error al obtener balances. Intenta nuevamente más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, [groupId]);

  // Función para cambiar el estado de un balance (marcarlo como pagado)
  const handlePaymentStatusChange = async (balanceId) => {
    try {
      // Llamar a la API para cambiar el estado del balance
      await axios.put(`/api/balances/${balanceId}/update-status`);
      // Refrescar los balances después de actualizar el estado
      const updatedBalances = await getBalancesByGroupId(groupId);
      setBalances(updatedBalances);
    } catch (err) {
      console.error("Error al cambiar el estado del balance:", err);
      setError("Error al cambiar el estado del balance. Intenta nuevamente.");
    }
  };

  // Función para manejar el cambio de pestaña
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (tab === "members") navigate(`/miembros/${groupId}`);
    else if (tab === "historial") navigate(`/historial/${groupId}`);
    else if (tab === "balance") navigate(`/balance/${groupId}`);
  };

  // Cerrar balance
  const handleCloseBalance = async () => {
    if (!groupId) {
      setError("El ID del grupo no está definido.");
      return;
    }

    try {
      setIsLoading(true); // Activar carga al cerrar el balance
      await closeBalanceByGroupId(groupId); // Cerrar balance en el backend

      // Ahora enviamos la actualización de balance a la base de datos
      alert("El balance ha sido cerrado correctamente.");
      // Refrescar balances después de cerrarlos
      const updatedBalances = await getBalancesByGroupId(groupId);
      setBalances(updatedBalances);
    } catch (err) {
      console.error("Error closing balance:", err);
      setError("Error al cerrar el balance. Intenta nuevamente más tarde.");
    } finally {
      setIsLoading(false); // Finalizar estado de carga
    }
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
              onClick={() => handleNavigation("historial")}
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

        {/* Mostrar balance o error */}
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div>
            {error && <div className="text-red-500">{error}</div>}
            {balances.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr>
                      <th className="p-4 text-left text-gray-700 font-semibold">Usuario</th>
                      <th className="p-4 text-left text-gray-700 font-semibold">Saldo</th>
                      <th className="p-4 text-left text-gray-700 font-semibold">Estado</th>
                      <th className="p-4 text-left text-gray-700 font-semibold">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {balances.map((balance) => (
                      <tr key={balance.userFrom.id}>
                        {/* Mostrar los valores del balance */}
                        <td className="p-4 text-gray-900">{balance.userFrom.name}</td>
                        <td
                          className={`p-4 ${
                            balance.amount < 0 ? "text-red-500" : "text-green-500"
                          }`}
                        >
                          ${balance.amount}
                        </td>
                        <td className="p-4 text-gray-600">
                          {balance.estado === "pendiente" ? (
                            <span className="text-yellow-500">Pendiente</span>
                          ) : (
                            <span className="text-green-500">Pagado</span>
                          )}
                        </td>
                        <td className="p-4">
                          {balance.estado === "pendiente" && (
                            <button
                              onClick={() => handlePaymentStatusChange(balance.id)}
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                              Ya pagó
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No hay balances disponibles.</p>
            )}

            {/* Botón de Cerrar Balance */}
            <div className="mt-4">
              <button
                onClick={handleCloseBalance}
                disabled={isLoading}
                className="bg-red-600 text-white p-2 rounded"
              >
                Cerrar Balance
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Balance;
