import apiClient from './axios'; // Importa el cliente Axios

// Servicio para registrar usuarios
export const registerUser = async (userData) => {
  const response = await apiClient.post('/users/register', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Servicio para iniciar sesión
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error en la solicitud');
  }
};

// Servicio para obtener todos los usuarios
export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

// Servicio para obtener un usuario por email
export const getUserByEmail = async (email) => {
  const response = await apiClient.get(`/users/email?email=${email}`);
  return response.data;
};

// Servicio para obtener el perfil de usuario por ID
export const getUserProfileById = async (id_usuario) => {
  const response = await apiClient.get(`/users/usuarios/${id_usuario}`); // Usamos el id_usuario en la URL
  return response.data;
};

// Servicio para actualizar la foto de perfil del usuario
export const updateProfilePicture = async (id_usuario, formData) => {
  try {
    const response = await apiClient.put(`users/profile-picture/${id_usuario}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Especifica que estamos enviando un archivo
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al actualizar la foto de perfil');
  }
};
