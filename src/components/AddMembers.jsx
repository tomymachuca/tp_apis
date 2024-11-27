import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Menu/Navbar';
import { addMembersToGroup } from '../api/groups'; // Importar la función para hacer la llamada al backend

const AddMembers = () => {
  const [members, setMembers] = useState(['']);
  const [memberErrors, setMemberErrors] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Para mostrar mensajes de éxito

  const navigate = useNavigate();
  const location = useLocation(); // Obtener el id_grupo del estado de navegación

  // Validar formato de email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Añadir nuevo campo de miembro
  const handleAddMember = () => {
    setMembers([...members, '']);
    setMemberErrors([...memberErrors, '']);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...members];
    const updatedErrors = [...memberErrors];
    updatedMembers.splice(index, 1);
    updatedErrors.splice(index, 1);
    setMembers(updatedMembers);
    setMemberErrors(updatedErrors);
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...members];
    const updatedErrors = [...memberErrors];

    if (!validateEmail(value)) {
      updatedErrors[index] = 'Formato de email inválido';
    } else {
      updatedErrors[index] = '';
    }

    updatedMembers[index] = value;
    setMembers(updatedMembers);
    setMemberErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedMembers = members.map((email) => email.trim().toLowerCase());

    if (sanitizedMembers.some((email) => !validateEmail(email))) {
        setError('Todos los miembros deben tener un email válido.');
        return;
    }

    try {
        const id_grupo = location.state?.id_grupo;
        console.log('Correos enviados al backend:', sanitizedMembers);
        const response = await addMembersToGroup(id_grupo, sanitizedMembers);
        console.log('Respuesta del backend:', response);
        navigate(`/miembros/${id_grupo}`);
    } catch (error) {
        console.error('Error al agregar miembros:', error);
        setError('Ocurrió un error al agregar los miembros. Inténtalo de nuevo.');
    }
};

  const handleGoBack = () => {
    const id_grupo = location.state?.id_grupo; // Obtener id_grupo desde el estado
    navigate(`/miembros/${id_grupo}`); // Redirigir a la URL específica del grupo
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg py-12 px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Agregar Miembros</h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-sm">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Miembros (Emails)</label>
              {members.map((member, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md text-sm mr-2"
                    placeholder={`Miembro ${index + 1} (Email)`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="text-red-500 text-sm"
                  >
                    Eliminar
                  </button>
                  {memberErrors[index] && (
                    <p className="text-red-500 text-xs ml-2">{memberErrors[index]}</p>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddMember}
                className="text-blue-500 text-sm mt-2"
              >
                Agregar Miembro
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150 text-sm"
            >
              Guardar Miembros
            </button>
          </form>

          <button
            onClick={handleGoBack}
            className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-150 text-sm"
          >
            Volver a Miembros del Equipo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
