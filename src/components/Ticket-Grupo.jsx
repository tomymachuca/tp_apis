import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Asegúrate de importar useParams
import Navbar from './Menu/Navbar';
import { getMembersByGroupId } from '../api/groups'; // Función para obtener miembros del grupo

const TicketGroupForm = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    monto: '',
    descripcion: '',
    foto: null,
  });

  const [divisionType, setDivisionType] = useState('');
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { id_grupo } = useParams(); // Obtén el ID del grupo de la URL

  // Cargar miembros del grupo desde la API
  useEffect(() => {
    if (!id_grupo) {
      setError("ID de grupo no encontrado.");
      return;
    }

    const fetchMembers = async () => {
      try {
        const response = await getMembersByGroupId(id_grupo);
        if (response && response.members) {
          setMembers(response.members);
        } else {
          setError("No se encontraron miembros para este grupo.");
        }
      } catch (err) {
        console.error("Error al cargar miembros:", err);
        setError("Hubo un problema al cargar los miembros. Por favor, inténtalo de nuevo.");
      }
    };

    fetchMembers();
  }, [id_grupo]);

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

  const handleDivisionTypeChange = (e) => {
    const type = e.target.value;
    setDivisionType(type);

    if (type === 'equitativo') {
      const updatedMembers = members.map((member) => ({
        ...member,
        porcentaje: (100 / members.length).toFixed(2),
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
      navigate(`/miembros/${id_grupo}`); // Redirige a team-members
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex flex-grow items-center justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Ingrese su Ticket</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
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

            {/* Descripción */}
            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>

            {/* Foto */}
            <div className="mb-4">
              <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-2">Foto:</label>
              <input
                type="file"
                id="foto"
                name="foto"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md"
              />
            </div>

            {/* Tipo de División */}
            <div className="mb-4">
              <label htmlFor="divisionType" className="block text-sm font-medium text-gray-700 mb-2">Tipo de División:</label>
              <select
                id="divisionType"
                name="divisionType"
                value={divisionType}
                onChange={handleDivisionTypeChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Seleccione un tipo</option>
                <option value="equitativo">Equitativo</option>
                <option value="por-partes">Por partes</option>
              </select>
            </div>

            {/* Miembros */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Miembros:</h3>
              {members.length === 0 ? (
                <p className="text-gray-500">No hay miembros cargados.</p>
              ) : (
                members.map((member, index) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <span>{member.nombre}</span>
                    {divisionType === 'por-partes' && (
                      <input
                        type="number"
                        value={member.porcentaje || ''}
                        onChange={(e) => handlePercentageChange(index, e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                        placeholder="Porcentaje"
                      />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Botón para enviar */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
              >
                Enviar Ticket
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TicketGroupForm;
