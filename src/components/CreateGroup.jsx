import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Menu/Navbar';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [members, setMembers] = useState(['']);
  const [error, setError] = useState('');
  const [memberErrors, setMemberErrors] = useState([]);

  const navigate = useNavigate();

  // Validar formato de email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = members.some((member) => !validateEmail(member));

    if (!groupName) {
      setError('El nombre del grupo es obligatorio.');
      return;
    }

    if (hasErrors) {
      setError('Todos los miembros deben tener un email válido.');
      return;
    }

    setError('');

    const newGroup = {
      name: groupName,
      description: groupDescription,
      users: members.length,
      images: [], // Puedes agregar imágenes si lo deseas
    };

    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    localStorage.setItem('groups', JSON.stringify([...groups, newGroup]));

    // Volver al menú
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex flex-grow items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear Grupo</h2>
          {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="groupName">
                Nombre del Grupo
              </label>
              <input
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                placeholder="Nombre del grupo"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="groupDescription">
                Descripción
              </label>
              <textarea
                id="groupDescription"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                placeholder="Descripción del grupo"
              ></textarea>
            </div>

            {members.map((member, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  className="flex-1 px-2 py-1 border rounded-md text-sm mr-2"
                  placeholder={`Miembro ${index + 1} (Email)`}
                />
                <button type="button" onClick={() => handleRemoveMember(index)} className="text-red-500 text-sm">
                  Eliminar
                </button>
                {memberErrors[index] && <p className="text-red-500 text-xs ml-2">{memberErrors[index]}</p>}
              </div>
            ))}
            <button type="button" onClick={handleAddMember} className="text-blue-500 text-sm mt-2">
              Agregar Miembro
            </button>

            <button type="submit" className="w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition duration-150 text-sm mt-4">
              Crear Grupo
            </button>
          </form>

          <button onClick={() => navigate('/menu')} className="w-full mt-4 bg-gray-500 text-white py-1 rounded-md hover:bg-gray-600 transition duration-150 text-sm">
            Volver al Menú
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreateGroup;
