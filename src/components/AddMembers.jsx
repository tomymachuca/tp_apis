import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir al menú
import Navbar from './Menu/Navbar';

const AddMembers = () => {
  const [members, setMembers] = useState(['']);
  const [memberErrors, setMemberErrors] = useState([]); // Para errores de validación de email
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook para navegación

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

    // Validar email en el campo correspondiente
    if (!validateEmail(value)) {
      updatedErrors[index] = 'Formato de email inválido';
    } else {
      updatedErrors[index] = '';
    }

    updatedMembers[index] = value;
    setMembers(updatedMembers);
    setMemberErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los correos sean válidos
    const hasErrors = members.some((member) => !validateEmail(member));

    if (hasErrors) {
      setError('Todos los miembros deben tener un email válido.');
      return;
    }

    setError('');
    // Redirigir con los miembros agregados a la página de miembros
    navigate('/team-members', { state: { newMembers: members.map((email) => ({ name: email, email })) } });
  };

  const handleGoBack = () => {
    navigate('/team-members'); // Navega de vuelta a la página de miembros del equipo
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Formulario para agregar miembros */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg py-12 px-6"> {/* Se ha reducido el ancho y aumentado el largo */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Agregar Miembros</h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Lista de miembros */}
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

            {/* Botón de agregar miembros */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150 text-sm"
            >
              Guardar Miembros
            </button>
          </form>

          {/* Botón para volver a la página de miembros del equipo */}
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
