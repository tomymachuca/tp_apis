import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Balance from './Balance';
import Historial from './Historial';
import Navbar from './Menu/Navbar';

const TeamMembersComponent = () => {
    const [members, setMembers] = useState([
        {
            nombre: "Franco Magurno",
            email: "francomagurno@gmail.com",
        },
        {
            nombre: "Tomas Machuca",
            email: "tomasmachuca@gmail.com",
        },
        {
            nombre: "Marco Riccitelli",
            email: "marcoriccitelli@gmail.com",
        },
    ]);

    const [activeTab, setActiveTab] = useState('members'); // Estado para manejar la pestaña activa
    const [balanceCalculated, setBalanceCalculated] = useState(false); // Estado para mostrar o no el balance
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar el modal de eliminación
    const [memberToDelete, setMemberToDelete] = useState(null); // Estado para saber qué miembro se va a eliminar
    const navigate = useNavigate(); // Hook de navegación para redirigir
    const location = useLocation(); // Hook para recibir datos de navegación

    // Al montar el componente, agregar los nuevos miembros si existen
    useEffect(() => {
        if (location.state && location.state.newMembers) {
            const uniqueNewMembers = location.state.newMembers.filter(
                (newMember) => !members.some((member) => member.email === newMember.email)
            );
            setMembers((prevMembers) => [...prevMembers, ...uniqueNewMembers]);
        }

        // Si la navegación viene de SettleBalanceComponent, mostramos la tabla
        if (location.state && location.state.balanceClosed) {
            setBalanceCalculated(true); // Mostramos el balance una vez cerrado
        }
    }, [location.state, members]);

    // Función para abrir el modal de confirmación
    const handleDelete = (index) => {
        setMemberToDelete(index); // Guardamos el índice del miembro que se va a eliminar
        setShowDeleteModal(true); // Mostramos el modal
    };

    // Función para confirmar la eliminación
    const confirmDelete = () => {
        const updatedMembers = members.filter((_, i) => i !== memberToDelete);
        setMembers(updatedMembers);
        setShowDeleteModal(false); // Cerramos el modal después de eliminar
    };

    // Función para manejar la redirección a la página de agregar miembros
    const handleAddMember = () => {
        navigate('/add-members'); // Redirige a la página de agregar miembros
    };

    // Redirigir a la página de cerrar balance (settle-balance)
    const handleSettleBalance = () => {
        navigate('/cerrar-balance'); // Redirige a SettleBalanceComponent en la ruta /cerrar-balance
    };

    // Función para redirigir a la página de Saldos
    const handleViewSaldo = () => {
        navigate('/saldo'); // Redirige a la ruta /saldo donde está la página de saldos
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Importar Navbar */}
            <Navbar />

            {/* Contenido principal */}
            <section className="container mx-auto px-4 py-6 mt-16">
                {/* Pestañas */}
                <div className="mb-6 md:flex md:items-center md:justify-between">
                    <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                        
                        {/* Botón Miembros */}
                        <button
                        className={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center ${activeTab === 'members' ? 'text-blue-600 border-blue-500 shadow-lg' : 'text-gray-700 border-transparent'} bg-transparent border-b-2 sm:text-base dark:text-black whitespace-nowrap focus:outline-none hover:bg-gray-100 hover:text-blue-600`}
                        onClick={() => setActiveTab('members')}
                        >
                        Miembros
                        </button>

                        {/* Botón Historial */}
                        <button
                        className={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center ${activeTab === 'Historial' ? 'text-blue-600 border-blue-500 shadow-lg' : 'text-gray-700 border-transparent'} bg-transparent border-b-2 sm:text-base dark:text-black whitespace-nowrap focus:outline-none hover:bg-gray-100 hover:text-blue-600`}
                        onClick={() => setActiveTab('Historial')}
                        >
                        Historial
                        </button>

                        {/* Botón Balance */}
                        <button
                        className={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center ${activeTab === 'balance' ? 'text-blue-600 border-blue-500 shadow-lg' : 'text-gray-700 border-transparent'} bg-transparent border-b-2 sm:text-base dark:text-black whitespace-nowrap focus:outline-none hover:bg-gray-100 hover:text-blue-600`}
                        onClick={() => setActiveTab('balance')}
                        >
                        Balance
                        </button>
                    </div>
                    </div>

                {/* Contenido de la pestaña */}
                <div className="mt-6">
                    {activeTab === 'members' ? (
                        <>
                            {/* Título, subtítulo y botón "Agregar Miembro" en la parte superior derecha */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <h2 className="text-2xl font-bold text-gray-900 ml-6 mt-2">Miembros</h2> {/* Ajuste de margen izquierdo y superior */}
                                    <span className="ml-4 mt-4 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full"> {/* Ajuste de tamaño y posición */}
                                        {members.length} Miembros
                                    </span>
                                </div>
                                <button
                                    onClick={handleAddMember}
                                    className="flex items-center justify-center w-auto px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Agregar Miembro</span>
                                </button>
                            </div>

                            {/* Tabla de miembros */}
                            <div className="container mx-auto p-4">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                        <thead>
                                            <tr>
                                                <th className="p-4 text-left text-gray-700 font-semibold">Nombre</th>
                                                <th className="p-4 text-left text-gray-700 font-semibold">Email</th>
                                                <th className="p-4 text-left text-gray-700 font-semibold">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {members.map((member, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="p-4 text-gray-900">
                                                        {member.nombre}
                                                        {member.nombre === "Tomas Machuca" && (
                                                            <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-lg">
                                                                Tú
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 text-gray-600">{member.email}</td>
                                                    <td className="p-4 text-gray-600">
                                                        <button
                                                            className="text-red-500 font-semibold hover:text-red-700 cursor-pointer"
                                                            onClick={() => handleDelete(index)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Botón "Ver Saldo" debajo de la tabla, visible solo si el balance ha sido calculado */}
                                {balanceCalculated && (
                                    <div className="flex justify-center mt-6">
                                        <button
                                            onClick={handleViewSaldo}
                                            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            Ver Saldo
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : activeTab === 'Historial' ? (
                        <>
                            {/* Mostrar tabla de historial */}
                            <Historial />
                        </>
                    ) : activeTab === 'balance' ? (
                        <>
                            {/* Cerrar balance o ver balance */}
                            <div className="flex justify-end mb-4">
                                {!balanceCalculated ? (
                                    <button
                                        onClick={handleSettleBalance}
                                        className="flex items-center justify-center w-auto px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Cerrar Balance</span>
                                    </button>
                                ) : (
                                    <Balance />
                                )}
                            </div>
                        </>
                    ) : null}
                </div>
            </section>

            {/* Modal de confirmación de eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmar Eliminación</h2>
                        <p className="text-gray-600 mb-6">
                            ¿Estás seguro de eliminar a {members[memberToDelete].nombre}? Aunque elimines a {members[memberToDelete].nombre}, sus gastos no se eliminarán.
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
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

export default TeamMembersComponent;
