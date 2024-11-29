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
    divisionType: 'equitativo', // Valor inicial
    porcentajes: [],
  });

  const [grupos, setGrupos] = useState([]);
  const [miembros, setMiembros] = useState([]);
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
        setFormData((prevData) => ({
          ...prevData,
          porcentajes: response.members.map((member) => ({
            id_usuario: member.id,
            porcentaje: '',
          })),
        }));
      } else {
        setMiembros([]);
        setFormData((prevData) => ({ ...prevData, porcentajes: [] }));
      }
    } catch (error) {
      console.error('Error al cargar miembros del grupo:', error);
      setError('No se pudo cargar los miembros del grupo. Intenta nuevamente.');
      setMiembros([]);
      setFormData((prevData) => ({ ...prevData, porcentajes: [] }));
    }
  };

  const handleDivisionTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      divisionType: type,
    }));
  };

  const handlePorcentajeChange = (index, value) => {
    const updatedPorcentajes = [...formData.porcentajes];
    updatedPorcentajes[index].porcentaje = value;
    setFormData((prevData) => ({
      ...prevData,
      porcentajes: updatedPorcentajes,
    }));
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
      const totalPorcentaje = formData.porcentajes.reduce((sum, item) => sum + parseFloat(item.porcentaje || 0), 0);
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
        descripcion: formData.descripcion,
        imagen: formData.foto,
        division_type: formData.divisionType,
        porcentajes: formData.divisionType === 'porcentajes' ? formData.porcentajes : [],
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
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">Fecha:</label>
              <input
                type="date"
                id="fecha"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-2">Monto Total:</label>
              <input
                type="number"
                id="monto"
                value={formData.monto}
                onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="grupo" className="block text-sm font-medium text-gray-700 mb-2">Nombre del grupo:</label>
              <select
                id="grupo"
                value={formData.grupo}
                onChange={handleGroupChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="" disabled>Seleccione un grupo</option>
                {grupos.map((group) => (
                  <option key={group.id_grupo} value={group.id_grupo}>
                    {group.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">Descripción:</label>
              <textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                rows="4"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-2">Foto:</label>
              <input
                type="file"
                id="foto"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700"
              />
            </div>

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

            {formData.divisionType === 'porcentajes' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Distribución porcentual:</label>
                {miembros.map((miembro, index) => (
                  <div key={miembro.id} className="flex items-center mb-2">
                    <span className="mr-4">{miembro.nombre}</span>
                    <input
                      type="number"
                      value={formData.porcentajes[index]?.porcentaje || ''}
                      onChange={(e) => handlePorcentajeChange(index, e.target.value)}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
            >
              Enviar Ticket
            </button>
          </form>

          {successMessage && (
            <p className="text-green-500 text-sm mt-4">{successMessage}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TicketForm;
