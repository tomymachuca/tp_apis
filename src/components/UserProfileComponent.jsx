import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Menu/Navbar';
import ResetPasswordModal from './ResetPasswordModal';
import { getUserProfile } from '../api/users'; // Servicio para obtener el perfil del usuario

const UserProfileComponent = () => {
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
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada al backend para obtener los datos del usuario
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUsername(response.nombre);
        setEmail(response.correo);
        setProfilePicture(response.foto_perfil || ''); // Actualiza con la URL de la foto de perfil si existe
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        navigate('/'); // Redirige al inicio si no se puede obtener el perfil
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
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
        navigate('/');
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
            <button
              onClick={handleGoToMenu}
              className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Volver al Menú
            </button>
          </div>
        </div>
      </main>

      {/* Modal de restablecer contraseña */}
      {isResetPasswordModalOpen && <ResetPasswordModal onClose={handleCloseResetPasswordModal} />}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmar Eliminación</h2>
            {deleteError && <p className="text-red-500 text-sm mb-2">{deleteError}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-500 focus:outline-none"
              >
                Confirmar
              </button>
              <button
                onClick={handleCloseDeleteModal}
                className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-md hover:bg-gray-500 focus:outline-none"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileComponent;
