import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Menu/Navbar';
import ResetPasswordModal from './ResetPasswordModal';
import { getUserProfileById, updateProfilePicture } from '../api/users'; // Servicio para obtener y actualizar la foto de perfil

const UserProfileComponent = () => {
  const { id_usuario } = useParams(); // Obtén el id_usuario de la URL
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfileById(id_usuario);
        setUsername(response.nombre);
        setEmail(response.correo);

        // Si la foto existe, concatenamos el dominio con la ruta de la foto
        const imageUrl = response.foto_perfil
          ? `http://localhost:3000${response.foto_perfil}`
          : 'https://via.placeholder.com/150'; // Foto predeterminada en caso de que no haya

        setProfilePicture(imageUrl); // Actualiza el estado de la foto de perfil
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        navigate('/');
      }
    };

    fetchUserProfile();
  }, [id_usuario, navigate]); // Usamos id_usuario como dependencia

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
      setPhotoFile(file); // Guardamos el archivo seleccionado
    }
  };

  const handleSaveChanges = () => {
    console.log('Cambios guardados:', { username, email });
    setIsEditingName(false);
    setIsEditingEmail(false);
  };

  const handleConfirmDelete = () => {
    if (deleteEmail.length > 0 && deletePassword.length > 0) {
      setShowDeleteModal(false);
      setSuccessMessage('Tu cuenta ha sido eliminada correctamente.');
      setTimeout(() => {
        navigate('/'); // Redirige al inicio después de 3 segundos
      }, 3000);
    } else {
      setDeleteError('Por favor, ingrese un correo y una contraseña.');
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteError('');
    setDeleteEmail('');
    setDeletePassword('');
  };

  const handleOpenResetPasswordModal = () => {
    setIsResetPasswordModalOpen(true);
  };

  const handleCloseResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
  };
  const handleUpdateProfilePicture = async () => {
    if (photoFile) {
      const formData = new FormData();
      formData.append('foto_perfil', photoFile);
  
      try {
        // Aquí estamos enviando el token en las cabeceras para la autenticación
        const token = localStorage.getItem('authToken'); // Suponiendo que guardas el token en localStorage
        const response = await updateProfilePicture(id_usuario, formData, token);  // Asegúrate de pasar el token
  
        setSuccessMessage('Foto de perfil actualizada exitosamente.');
        setProfilePicture(`http://localhost:3000${response.foto_perfil}`);
      } catch (error) {
        console.error('Error al actualizar la foto de perfil:', error);
        setSuccessMessage('Error al actualizar la foto de perfil.');
      }
    } else {
      setSuccessMessage('Por favor, selecciona una foto.');
    }
  };

  const handleGoToMenu = () => {
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex flex-grow items-center justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full mx-4 max-w-lg">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center">Tu Perfil</h1>
          </div>

          {/* Mensaje de éxito */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-md">
              {successMessage}
            </div>
          )}

          {/* Foto de perfil */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={profilePicture || 'https://via.placeholder.com/150'} // URL predeterminada si no hay foto
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />
              <label
                htmlFor="file-upload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536M9 11l3.232 3.232M7.5 3h4.586l1 1h2.828L19.5 7v2.828l-3.5 3.5v4.586l-1 1H7.5v-4.586L3.5 10.5V7h4.586l3-3z"
                  />
                </svg>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </div>
          </div>

          {/* Nombre de usuario */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Nombre de Usuario</label>
              {isEditingName ? (
                <button onClick={handleSaveChanges} className="text-blue-500 hover:underline text-sm">
                  Guardar
                </button>
              ) : (
                <button onClick={() => setIsEditingName(true)} className="text-blue-500 hover:underline text-sm">
                  Editar
                </button>
              )}
            </div>
            {isEditingName ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <p className="mt-2 text-sm text-gray-800">{username}</p>
            )}
          </div>

          {/* Correo Electrónico */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Correo Electrónico</label>
              {isEditingEmail ? (
                <button onClick={handleSaveChanges} className="text-blue-500 hover:underline text-sm">
                  Guardar
                </button>
              ) : (
                <button onClick={() => setIsEditingEmail(true)} className="text-blue-500 hover:underline text-sm">
                  Editar
                </button>
              )}
            </div>
            {isEditingEmail ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <p className="mt-2 text-sm text-gray-800">{email}</p>
            )}
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex flex-col gap-4">
            <button
              onClick={handleUpdateProfilePicture}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Actualizar Foto de Perfil
            </button>
            <button
              onClick={handleOpenResetPasswordModal}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Restablecer Contraseña
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Eliminar Cuenta
            </button>
          </div>
        </div>
      </main>

      {/* Modal de restablecimiento de contraseña */}
      {isResetPasswordModalOpen && <ResetPasswordModal onClose={handleCloseResetPasswordModal} />}

      {/* Modal de eliminación de cuenta */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold text-center">Eliminar Cuenta</h2>
            <p className="text-sm text-center text-gray-700 mb-4">Para eliminar tu cuenta, ingresa tu correo y contraseña.</p>
            <input
              type="email"
              value={deleteEmail}
              onChange={(e) => setDeleteEmail(e.target.value)}
              placeholder="Correo Electrónico"
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
            />
            {deleteError && <p className="text-red-500 text-xs">{deleteError}</p>}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCloseDeleteModal}
                className="py-2 px-4 bg-gray-500 hover:bg-gray-400 text-white font-semibold rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileComponent;
