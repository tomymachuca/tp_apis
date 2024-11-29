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
    // Realiza una solicitud POST para cerrar el balance del grupo
    const response = await apiClient.post(`/balances/groups/${groupId}/close-balance`);
    console.log('Balance cerrado correctamente:', response.data);
    return response.data; // Retorna las transacciones realizadas
  } catch (error) {
    console.error('Error al cerrar balance:', error.response?.data || error.message);
    throw error;
  }
};