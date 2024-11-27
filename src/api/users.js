import apiClient from './axios'; // Importa el cliente Axios

// Servicio para registrar usuarios
export const registerUser = async (userData) => {
  // No configuramos explícitamente el Content-Type aquí; axios lo hará automáticamente
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
    return response.data; // Asegúrate de que `response.data` contenga el token y el usuario.
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



export const getUserProfile = async () => {
  const response = await apiClient.get('/users/profile'); // Endpoint del backend para obtener el perfil
  return response.data;
};
