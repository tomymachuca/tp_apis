import apiClient from './axios'; // Asegúrate de tener configurado el apiClient con Axios

/**
 * Crear un nuevo ticket
 * @param {Object} ticketData - Los datos necesarios para crear el ticket
 * @param {number} ticketData.id_proyecto - ID del proyecto asociado al ticket
 * @param {number} ticketData.id_usuario - ID del usuario que crea el ticket
 * @param {string} ticketData.fecha_compra - Fecha de la compra (YYYY-MM-DD)
 * @param {number} ticketData.monto_total - Monto total del ticket
 * @param {File} ticketData.imagen - Archivo de imagen asociado al ticket
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
    formData.append('imagen', ticketData.imagen); // Archivo de imagen

    // Realizar la solicitud al backend
    const response = await apiClient.post('/tickets/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Encabezado necesario para archivos
      },
    });

    console.log('Ticket creado con éxito:', response.data);
    return response.data; // Devuelve la respuesta al componente
  } catch (error) {
    console.error('Error al crear el ticket:', error.response?.data || error.message);
    throw error; // Propagar el error para que el componente lo maneje
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
    console.log('Tickets obtenidos:', response.data);
    return response.data; // Return the fetched tickets
  } catch (error) {
    console.error('Error al obtener los tickets:', error.response?.data || error.message);
    throw error; // Propagate the error
  }
};