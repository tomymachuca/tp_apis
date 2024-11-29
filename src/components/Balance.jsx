import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importar useParams
import Navbar from "./Menu/Navbar"; // Navbar
import { getBalancesByGroupId, closeBalanceByGroupId } from "../api/balances"; // API

const Balance = () => {
  const { groupId } = useParams(); // Obtener el ID del grupo desde la URL
  const [balances, setBalances] = useState([]); // Inicializar como un arreglo vacío
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!groupId) {
      setError("El ID del grupo no está definido.");
      return;
    }

    const fetchBalances = async () => {
      setIsLoading(true);
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

  const handleCloseBalance = async () => {
    if (!groupId) {
      setError("El ID del grupo no está definido.");
      return;
    }

    try {
      await closeBalanceByGroupId(groupId);
      alert("El balance ha sido cerrado correctamente.");
      // Refrescar balances después de cerrarlos
      const updatedBalances = await getBalancesByGroupId(groupId);
      setBalances(updatedBalances);
    } catch (err) {
      console.error("Error closing balance:", err);
      setError("Error al cerrar el balance. Intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 mt-16">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Balance de Transacciones</h1>
          <p className="text-gray-600">
            Este es un resumen del balance financiero, mostrando los montos por pagar o por cobrar.
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="mb-4">
          <button
            onClick={handleCloseBalance}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Cerrar Balance
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-500">Cargando balances...</p>
        ) : balances.length === 0 ? (
          <p className="text-gray-500">No se encontraron balances para este grupo.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="p-4 text-left text-gray-700 font-semibold">Usuario</th>
                  <th className="p-4 text-left text-gray-700 font-semibold">Correo</th>
                  <th className="p-4 text-left text-gray-700 font-semibold">Por Pagar</th>
                  <th className="p-4 text-left text-gray-700 font-semibold">Por Cobrar</th>
                </tr>
              </thead>
              <tbody>
                {balances.map((balance, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 text-gray-900">{balance.userFrom.name}</td>
                    <td className="p-4 text-gray-600">{balance.userFrom.email}</td>
                    <td
                      className={`p-4 text-gray-600 ${
                        parseFloat(balance.amount) < 0 ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      ${parseFloat(balance.amount) < 0 ? Math.abs(balance.amount) : 0}
                    </td>
                    <td
                      className={`p-4 text-gray-600 ${
                        parseFloat(balance.amount) > 0 ? "text-green-500" : "text-gray-600"
                      }`}
                    >
                      ${parseFloat(balance.amount) > 0 ? balance.amount : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
