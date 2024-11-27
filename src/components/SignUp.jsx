import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/users";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    setErrorMessage("");
    setSuccessMessage("");
  
    if (!validateEmail(email)) {
      setErrorMessage("Formato de email inválido.");
      return;
    }
  
    if (password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
  
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("nombre", username);
      formData.append("correo", email);
      formData.append("contrasena", password);
      if (profilePhoto) formData.append("foto_perfil", profilePhoto);
  
      // Call the registerUser function to send data to the backend
      const response = await registerUser(formData);
  
      console.log("Backend Response:", response);
  
      // Validate the backend response structure
      if (response && response.token && response.usuario) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.usuario));
  
        console.log("Token and user saved to localStorage:", {
          token: response.token,
          user: response.usuario,
        });
  
        setSuccessMessage("Usuario registrado exitosamente.");
        setTimeout(() => navigate("/menu"), 2000);
      } else {
        console.error("Unexpected backend response structure:", response);
        throw new Error("La respuesta del servidor no contiene los datos esperados.");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setErrorMessage(
        error.response?.data?.error || "Error al registrar usuario. Intenta nuevamente."
      );
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleGoToLanding = () => {
    navigate("/");
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div
          className="flex justify-center mb-6 cursor-pointer"
          onClick={handleGoToLanding}
        >
          <div className="text-2xl font-semibold text-blue-600">SliceTicket</div>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="relative flex items-center mb-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full py-3 px-10 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Nombre de usuario"
              required
            />
          </div>

          <label
            htmlFor="profile-photo"
            className="flex items-center px-3 py-3 mx-auto mb-3 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span className="mx-3 text-gray-400">Foto de perfil</span>
            <input
              id="profile-photo"
              type="file"
              name="foto_perfil"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>

          {photoPreview && (
            <div className="flex items-center justify-center mb-4">
              <img
                src={photoPreview}
                alt="Vista previa de la foto de perfil"
                className="w-16 h-16 rounded-full border"
              />
            </div>
          )}

          <div className="relative flex items-center mb-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-3 px-10 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="relative flex items-center mb-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full py-3 px-10 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Contraseña"
              required
            />
          </div>

          <div className="relative flex items-center mb-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full py-3 px-10 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirmar contraseña"
              required
            />
          </div>

          {errorMessage && <p className="text-red-500 text-sm mb-6">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-6">{successMessage}</p>}

          <button className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Registrarse
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
