import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Menu/Navbar';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    monto: '',
    casa: '',
    descripcion: '',
    foto: null,
  });

  const [divisionType, setDivisionType] = useState('');
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const grupos = {
    grupo1: [
      { id: '1', nombre: 'Miembro 1' },
      { id: '2', nombre: 'Miembro 2' },
      { id: '3', nombre: 'Miembro 3' },
    ],
    grupo2: [
      { id: '4', nombre: 'Miembro A' },
      { id: '5', nombre: 'Miembro B' },
    ],
    grupo3: [
      { id: '6', nombre: 'Miembro X' },
      { id: '7', nombre: 'Miembro Y' },
      { id: '8', nombre: 'Miembro Z' },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      foto: file,
    }));
  };

  const handleGroupChange = (e) => {
    const groupName = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      casa: groupName,
    }));
    if (groupName) {
      const selectedGroup = grupos[groupName];
      const initializedMembers = selectedGroup.map((member) => ({
        ...member,
        porcentaje: divisionType === 'equitativo' ? (100 / selectedGroup.length).toFixed(2) : '',
      }));
      setMembers(initializedMembers);
    } else {
      setMembers([]);
    }
  };

  const handleDivisionTypeChange = (e) => {
    const type = e.target.value;
    setDivisionType(type);

    if (type === 'equitativo' && formData.casa) {
      const selectedGroup = grupos[formData.casa];
      const updatedMembers = selectedGroup.map((member) => ({
        ...member,
        porcentaje: (100 / selectedGroup.length).toFixed(2),
      }));
      setMembers(updatedMembers);
    } else {
      setMembers((prevMembers) => prevMembers.map((member) => ({ ...member, porcentaje: '' })));
    }
  };

  const handlePercentageChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index].porcentaje = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (divisionType === 'por-partes') {
      const totalPercentage = members.reduce((sum, member) => sum + parseFloat(member.porcentaje || 0), 0);
      if (totalPercentage !== 100) {
        setError('La suma de los porcentajes debe ser exactamente 100%.');
        return;
      }
    }

    console.log('Datos del ticket:', {
      ...formData,
      divisionType,
      members,
    });

    if (formData.foto) {
      const fotoURL = URL.createObjectURL(formData.foto);
      console.log('Vista previa de la imagen:', fotoURL);
    }

    setError('');
    setSuccessMessage('El ticket se cargó correctamente.');
    setTimeout(() => {
      navigate('/menu');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex flex-grow items-center justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Ingrese su Ticket</h2>
          <form onSubmit={handleSubmit}>
            {/* Fecha */}
            <div className="mb-4">
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">Fecha:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Monto Total */}
            <div className="mb-4">
              <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-2">Monto Total:</label>
              <input
                type="number"
                id="monto"
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Grupo */}
            <div className="mb-4">
              <label htmlFor="grupo" className="block text-sm font-medium text-gray-700 mb-2">Nombre del grupo:</label>
              <select
                id="grupo"
                name="grupo"
                value={formData.casa}
                onChange={handleGroupChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Seleccione un grupo</option>
                {Object.keys(grupos).map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* Descripción del gasto */}
            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">Descripción del gasto:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Describa el gasto..."
              ></textarea>
            </div>

            {/* Subir Foto del Ticket */}
            <div className="mb-6">
              <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-2">Subir foto del ticket:</label>
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
            </div>

            {/* Tipo de división */}
            <div className="mb-4">
              <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-2">Dividir gasto:</label>
              <select
                id="division"
                name="division"
                value={divisionType}
                onChange={handleDivisionTypeChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Seleccione una opción</option>
                <option value="equitativo">Equitativamente</option>
                <option value="por-partes">Por partes</option>
              </select>
            </div>

            {/* Miembros y porcentajes */}
            {members.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Miembros:</label>
                {members.map((member, index) => (
                  <div key={member.id} className="flex items-center mb-2 space-x-4">
                    <span className="w-1/2 text-sm">{member.nombre} (ID: {member.id})</span>
                    {divisionType === 'por-partes' && (
                      <input
                        type="number"
                        placeholder="Porcentaje"
                        value={member.porcentaje}
                        onChange={(e) => handlePercentageChange(index, e.target.value)}
                        required
                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    )}
                    {divisionType === 'por-partes' && <span>%</span>}
                  </div>
                ))}
              </div>
            )}

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TicketForm;
