import apiClient from './axios'; // Reutiliza tu cliente Axios configurado

// Obtener grupos por ID de usuario
export const getGroupsByUserId = async (id_usuario) => {
  try {
    const response = await apiClient.get(`/projects/user/${id_usuario}/groups`);
    console.log('Datos obtenidos del backend:', response.data); // Log para confirmar
    return response.data; // Retorna la respuesta
  } catch (error) {
    console.error('Error en getGroupsByUserId:', error);
    throw error; // Lanza el error si falla
  }
};

// Crear un nuevo grupo
export const createGroup = async (groupData) => {
  try {
    const response = await apiClient.post(`/projects/create`, groupData);
    return response.data;
  } catch (error) {
    console.error("Error al crear grupo:", error);
    throw error; // Propaga el error para manejarlo donde sea necesario
  }
};

// Eliminar un grupo por ID
export const deleteGroupById = async (id_grupo) => {
  try {
    const response = await apiClient.delete(`/projects/delete/${id_grupo}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando el grupo:', error);
    throw error;
  }
};

// Obtener miembros de un grupo por su ID
export const getMembersByGroupId = async (id_grupo) => {
  try {
    const response = await apiClient.get(`/projects/group/${id_grupo}/members`);
    console.log('Miembros obtenidos del backend:', response.data); // Confirmación de los datos
    return response.data;
  } catch (error) {
    console.error('Error al obtener miembros del grupo:', error);
    throw error;
  }
};

// Agregar miembros a un grupo
export const addMembersToGroup = async (id_grupo, members) => {
  try {
    const responses = [];
    for (const member of members) {
      const response = await apiClient.post(`/projects/group/${id_grupo}/add-member`, { correo: member });
      responses.push(response.data);
      console.log('Miembro agregado exitosamente:', response.data); // Log para confirmar
    }
    return responses; // Devuelve un array con las respuestas del backend
  } catch (error) {
    console.error('Error al agregar miembros al grupo:', error);
    throw error;
  }
};