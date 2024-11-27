import React, { useState, useEffect } from "react";
import { getGroupsByUserId, deleteGroupById } from "../../api/groups";
import { useNavigate } from "react-router-dom";

const CustomersComponent = () => {
  const [customers, setCustomers] = useState(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    return storedGroups;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user"))?.id_usuario;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await getGroupsByUserId(userId);

        if (response.groups) {
          setCustomers(response.groups);
        } else {
          setCustomers([]); // If there are no groups
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // Backend returns 404 if no groups exist
          setCustomers([]);
        } else {
          console.error("Error fetching groups:", err);
          setError(true); // Set error only if it's not 404
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchGroups();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(customers));
  }, [customers]);

  const handleAddGroup = () => {
    navigate("/create-group");
  };

  const handleViewMembers = (groupId) => {
    navigate(`/miembros/${groupId}`); // Navigates to the route with group ID
  };

  const handleDeleteGroup = async (groupId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este grupo?")) {
      try {
        await deleteGroupById(groupId);
        setCustomers(customers.filter((group) => group.id_grupo !== groupId));
        alert("Grupo eliminado correctamente.");
      } catch (err) {
        console.error("Error eliminando el grupo:", err);
        alert("Error al eliminar el grupo.");
      }
    }
  };

  if (loading) return <p>Cargando grupos...</p>;

  return (
    <section className="bg-white min-h-screen flex justify-center items-start md:pl-64 mt-16">
      <div className="container mx-auto px-4 py-10 bg-white">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Tus Grupos</h2>

        {error && <p className="text-red-500 mb-4">Error al cargar los grupos. Inténtalo de nuevo más tarde.</p>}

        {!error && customers.length === 0 && (
          <div>
            <p className="text-gray-600 text-lg mb-4">Aún no tienes grupos creados.</p>
          </div>
        )}

        {customers.length > 0 && (
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-2 text-xs sm:text-sm font-normal text-left text-black">Nombre</th>
                  <th className="px-2 sm:px-2 py-2 text-xs sm:text-sm font-normal text-left text-black">Descripción</th>
                  <th className="px-2 sm:px-2 py-2 text-xs sm:text-sm font-normal text-left text-black">Usuarios</th>
                  <th className="px-2 sm:px-2 py-2 text-xs sm:text-sm font-normal text-left text-black">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer, index) => (
                  <tr key={index} className="hover:bg-blue-50 cursor-pointer transition-colors duration-200">
                    <td
                      className="px-2 py-2 text-xs sm:text-sm font-medium whitespace-nowrap text-blue-500 hover:text-blue-700 hover:underline"
                      onClick={() => handleViewMembers(customer.id_grupo)}
                    >
                      {customer.proyecto?.nombre || customer.name}
                    </td>
                    <td className="px-2 py-2 text-xs sm:text-sm whitespace-nowrap">
                      {customer.proyecto?.descripcion || customer.description || "Sin descripción"}
                    </td>
                    <td className="px-2 py-2 text-xs sm:text-sm whitespace-nowrap">
                      {customer.proyecto?.usuarios?.length || customer.users || 0}{" "}
                      usuarios
                    </td>
                    <td className="px-2 py-2 text-xs sm:text-sm whitespace-nowrap">
                      {customer.rol === "Creador" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteGroup(customer.id_grupo || customer.name);
                          }}
                          className="px-4 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddGroup}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Crear Grupo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomersComponent;
