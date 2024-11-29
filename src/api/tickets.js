import apiClient from './axios'; // Configuración del cliente Axios

/**
 * Crear un nuevo ticket
 * @param {Object} ticketData - Los datos necesarios para crear el ticket
 * @param {number} ticketData.id_proyecto - ID del proyecto asociado al ticket
 * @param {number} ticketData.id_usuario - ID del usuario que crea el ticket
 * @param {string} ticketData.fecha_compra - Fecha de la compra (YYYY-MM-DD)
 * @param {number} ticketData.monto_total - Monto total del ticket
 * @param {File} ticketData.imagen - Archivo de imagen asociado al ticket
 * @param {string} ticketData.descripcion - Descripción del ticket
 * @param {string} ticketData.division_type - Tipo de división ("equitativo" o "porcentajes")
 * @param {Array} ticketData.porcentajes - Porcentajes para división (si aplica)
 * @returns {Promise<Object>} - La respuesta del backend
 */
export const createTicket = async (ticketData) => {
  try {
    // Crear un FormData para manejar la carga de archivos
    const formData = new FormData();
    formData.append('id_proyecto', ticketData.id_proyecto);
    formData.append('id_usuario', ticketData.id_usuario);
    formData.append('fecha_compra', ticketData.fecha_compra);
    formData.append('monto_total', ticketData.monto_total);
    formData.append('descripcion', ticketData.descripcion);
    formData.append('imagen', ticketData.imagen);
    formData.append('division_type', ticketData.division_type);

    if (ticketData.division_type === 'porcentajes') {
      // Agregar los porcentajes al FormData en formato JSON
      formData.append('porcentajes', JSON.stringify(ticketData.porcentajes));
    }

    // Realizar la solicitud al backend
    const response = await apiClient.post('/tickets/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Encabezado necesario para archivos
      },
    });

    console.log('Ticket creado con éxito:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el ticket:', error.response?.data || error.message);
    throw error; // Propagar el error para manejo en el componente
  }
};

/**
 * Obtener tickets por ID de proyecto
 * @param {number} id_proyecto - ID del proyecto para obtener los tickets
 * @returns {Promise<Array>} - Lista de tickets asociados al proyecto
 */
export const getTicketsByProjectId = async (id_proyecto) => {
  try {
    const response = await apiClient.get(`/tickets/${id_proyecto}`);
    
    // Verificar si no hay tickets
    if (!response.data || response.data.length === 0) {
      throw {
        response: {
          status: 404,
          data: { error: 'No se encontraron tickets para este proyecto.' },
        },
      };
    }

    console.log('Tickets obtenidos:', response.data);
    return response.data; // Retorna los tickets obtenidos
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Error 404:', error.response.data.error);
    } else {
      console.error('Error al obtener los tickets:', error.response?.data || error.message);
    }
    throw error; // Propaga el error para manejo en el componente
  }
};

/**
 * Actualizar un ticket
 * @param {number} id_ticket - ID del ticket a actualizar
 * @param {Object} updateData - Datos para actualizar
 * @returns {Promise<Object>} - Respuesta del backend
 */
export const updateTicket = async (id_ticket, updateData) => {
  try {
    const response = await apiClient.put(`/tickets/update/${id_ticket}`, updateData);
    console.log('Ticket actualizado con éxito:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el ticket:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un ticket por su ID
 * @param {number} id_ticket - ID del ticket a eliminar
 * @returns {Promise<Object>} - Respuesta del backend
 */
export const deleteTicket = async (id_ticket) => {
  try {
    const response = await apiClient.delete(`/tickets/delete/${id_ticket}`);
    console.log('Ticket eliminado con éxito:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el ticket:', error.response?.data || error.message);
    throw error;
  }
};
