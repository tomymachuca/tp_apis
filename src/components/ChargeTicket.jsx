import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Menu/Navbar';
import { createTicket } from '../api/tickets';
import { getGroupsByUserId, getMembersByGroupId } from '../api/groups';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    monto: '',
    grupo: '',
    descripcion: '',
    foto: null,
    divisionType: 'equitativo', // Default division type
  });

  const [grupos, setGrupos] = useState([]);
  const [miembros, setMiembros] = useState([]); // Miembros del grupo seleccionado
  const [porcentajes, setPorcentajes] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Leer userId de localStorage

  useEffect(() => {
    if (!userId) {
      console.error('El userId no está definido.');
      setError('El usuario no está autenticado. Intente iniciar sesión nuevamente.');
      return;
    }

    const fetchGrupos = async () => {
      try {
        const response = await getGroupsByUserId(userId);
        const gruposData = Array.isArray(response.groups) ? response.groups : [];
        const formattedGroups = gruposData.map(group => ({
          id_grupo: group.id_grupo,
          nombre: group.proyecto?.nombre || 'Grupo sin nombre',
        }));
        setGrupos(formattedGroups);
      } catch (error) {
        console.error('Error al cargar los grupos:', error);
        setError('Hubo un problema al cargar los grupos. Intenta nuevamente más tarde.');
      }
    };

    fetchGrupos();
  }, [userId]);

  const handleGroupChange = async (e) => {
    const selectedGroupId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      grupo: selectedGroupId,
    }));

    try {
      const response = await getMembersByGroupId(selectedGroupId);
      if (response.members && Array.isArray(response.members)) {
        setMiembros(response.members);
        setPorcentajes(
          response.members.map((member) => ({
            member_id: member.id,
            porcentaje: '',
          }))
        );
      } else {
        setMiembros([]);
      }
    } catch (error) {
      console.error('Error al cargar miembros del grupo:', error);
      setError('No se pudo cargar los miembros del grupo. Intenta nuevamente.');
      setMiembros([]);
    }
  };

  const handleDivisionTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      divisionType: type,
    }));
    if (type === 'porcentajes' && formData.grupo) {
      handleGroupChange({ target: { value: formData.grupo } }); // Cargar miembros si seleccionas "Porcentajes"
    }
  };

  const handlePorcentajeChange = (index, value) => {
    const updatedPorcentajes = [...porcentajes];
    updatedPorcentajes[index].porcentaje = value;
    setPorcentajes(updatedPorcentajes);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      foto: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.grupo) {
      setError('Debe seleccionar un grupo válido.');
      return;
    }

    if (formData.divisionType === 'porcentajes') {
      const totalPorcentaje = porcentajes.reduce((sum, item) => sum + parseFloat(item.porcentaje || 0), 0);
      if (totalPorcentaje !== 100) {
        setError('El porcentaje total debe ser exactamente 100%.');
        return;
      }
    }

    try {
      const ticketData = {
        id_proyecto: formData.grupo,
        id_usuario: userId,
        fecha_compra: formData.fecha,
        monto_total: formData.monto,
        imagen: formData.foto,
        division_type: formData.divisionType,
        members: formData.divisionType === 'porcentajes' ? porcentajes : [],
      };

      await createTicket(ticketData);

      setError('');
      setSuccessMessage('El ticket se cargó correctamente.');
      setTimeout(() => {
        navigate('/menu');
      }, 2000);
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      setError('Error al crear el ticket. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex flex-grow items-center justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Ingrese su Ticket</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Fecha */}
            <div className="mb-4">
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">Fecha:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
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
                value={formData.grupo}
                onChange={handleGroupChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Seleccione un grupo</option>
                {grupos.map((group) => (
                  <option key={group.id_grupo} value={group.id_grupo}>
                    {group.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Botones para seleccionar tipo de división */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de división:</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${formData.divisionType === 'equitativo' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleDivisionTypeChange('equitativo')}
                >
                  Equitativo
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${formData.divisionType === 'porcentajes' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleDivisionTypeChange('porcentajes')}
                >
                  Porcentajes
                </button>
              </div>
            </div>

            {/* Porcentajes */}
            {formData.divisionType === 'porcentajes' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Asignar porcentajes:</label>
                {miembros.map((miembro, index) => (
                  <div key={miembro.id} className="flex items-center space-x-4 mb-2">
                    <span className="text-gray-700">{miembro.nombre}</span>
                    <input
                      type="number"
                      value={porcentajes[index]?.porcentaje || ''}
                      onChange={(e) => handlePorcentajeChange(index, e.target.value)}
                      className="block w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="%"
                    />
                  </div>
                ))}
              </div>
            )}

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
