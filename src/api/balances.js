import apiClient from './axios'; // Configuración del cliente Axios

/**
 * Obtener balances por ID de grupo
 * @param {number} groupId - ID del grupo para calcular balances
 * @returns {Promise<Object>} - Respuesta del backend con los balances
 */
export const getBalancesByGroupId = async (groupId) => {
  try {
    // Realiza una solicitud GET para obtener los balances del grupo
    const response = await apiClient.get(`/balances/groups/${groupId}`);
    
    // Procesar los balances y formatearlos
    console.log('Balances obtenidos:', response.data);
    return response.data; // Retorna los balances obtenidos
  } catch (error) {
    console.error('Error al obtener balances:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Cerrar balance de un grupo
 * @param {number} groupId - ID del grupo para cerrar balances
 * @returns {Promise<Object>} - Respuesta del backend con las transacciones realizadas
 */
export const closeBalanceByGroupId = async (groupId) => {
  try {
    const response = await apiClient.post(`balances/groups/${groupId}/close-balance`);
    console.log(response.data); // Aquí deberías recibir el mensaje de éxito.
  } catch (error) {
    console.error("Error en la solicitud:", error.response?.data || error.message);
  }
};


/**
 * Actualizar el estado de un balance (de pendiente a pagado)
 * @param {number} groupId - ID del grupo para el balance
 * @param {number} balanceId - ID del balance que se actualizará
 * @param {string} estado - Nuevo estado del balance ("pagado" o "pendiente")
 * @returns {Promise<Object>} - Respuesta del backend con el resultado de la actualización
 */
export const updateBalanceStatus = async (groupId, balanceId, estado) => {
  try {
    const response = await apiClient.patch(`/balances/groups/${groupId}/close-balance/${balanceId}`, {
      estado, // Enviar el nuevo estado del balance
    });
    
    console.log('Estado actualizado correctamente:', response.data);
    return response.data; // Retorna la respuesta del backend
  } catch (error) {
    console.error('Error al actualizar el estado del balance:', error.response?.data || error.message);
    throw error; // Propaga el error para su manejo en el componente
  }
};