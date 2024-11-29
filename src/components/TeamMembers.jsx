import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Menu/Navbar';
import { getMembersByGroupId, deleteMember } from '../api/groups'; // Incluye la función deleteMember

const TeamMembersComponent = () => {
    const { id_grupo } = useParams(); // Obtener el id_grupo desde la URL
    const [members, setMembers] = useState([]); // Lista de miembros
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de confirmación
    const [memberToDelete, setMemberToDelete] = useState(null); // ID del miembro a eliminar
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('members'); // Estado para la pestaña activa
    const navigate = useNavigate();

    // Obtener miembros al cargar el componente
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getMembersByGroupId(id_grupo);
                if (response.members) {
                    setMembers(response.members); // Actualizar la lista de miembros
                }
            } catch (error) {
                console.error('Error al obtener los miembros:', error);
                setError('Hubo un problema al cargar los miembros.');
            }
        };

        if (id_grupo) fetchMembers();
    }, [id_grupo]);

    // Mostrar modal de confirmación
    const handleDelete = (id) => {
        setMemberToDelete(id); // Guardar el ID del miembro a eliminar
        setShowDeleteModal(true); // Mostrar el modal
    };

    // Confirmar eliminación del miembro
    const confirmDelete = async () => {
        try {
            // Hacer la solicitud al servidor para eliminar el miembro
            await deleteMember(id_grupo, memberToDelete);

            // Actualizar la lista local eliminando el miembro
            const updatedMembers = members.filter((member) => member.id !== memberToDelete);
            setMembers(updatedMembers);

            // Limpiar estados y cerrar modal
            setShowDeleteModal(false);
            setMemberToDelete(null);
        } catch (error) {
            console.error('Error al eliminar el miembro:', error);
            setError('No se pudo eliminar el miembro. Intenta nuevamente.');
        }
    };

    const handleNavigation = (tab) => {
        setActiveTab(tab);
        if (tab === 'historial') navigate(`/historial/${id_grupo}`);
        else if (tab === 'balance') navigate(`/balance/${id_grupo}`);
    };

    const handleAddMember = () => {
        navigate('/add-members', { state: { id_grupo } });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />

            <section className="container mx-auto px-4 py-6 mt-16">
                {/* Selector de pestañas */}
                <div className="mb-6 md:flex md:items-center md:justify-between">
                    <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                        <button
                            className={`inline-flex items-center h-10 px-4 -mb-px text-sm ${
                                activeTab === 'members'
                                    ? 'text-blue-600 border-blue-500 shadow-lg'
                                    : 'text-gray-700 border-transparent'
                            } bg-transparent border-b-2 sm:text-base`}
                        >
                            Miembros
                        </button>
                        <button
                            className={`inline-flex items-center h-10 px-4 -mb-px text-sm ${
                                activeTab === 'historial'
                                    ? 'text-blue-600 border-blue-500 shadow-lg'
                                    : 'text-gray-700 border-transparent'
                            } bg-transparent border-b-2 sm:text-base`}
                            onClick={() => handleNavigation('historial')}
                        >
                            Historial
                        </button>
                        <button
                            className={`inline-flex items-center h-10 px-4 -mb-px text-sm ${
                                activeTab === 'balance'
                                    ? 'text-blue-600 border-blue-500 shadow-lg'
                                    : 'text-gray-700 border-transparent'
                            } bg-transparent border-b-2 sm:text-base`}
                            onClick={() => handleNavigation('balance')}
                        >
                            Balance
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Miembros</h2>
                    <button
                        onClick={handleAddMember}
                        className="px-5 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Agregar Miembro
                    </button>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="p-4 text-left text-gray-700 font-semibold">Nombre</th>
                                <th className="p-4 text-left text-gray-700 font-semibold">Email</th>
                                <th className="p-4 text-left text-gray-700 font-semibold">Rol</th>
                                <th className="p-4 text-left text-gray-700 font-semibold">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.id} className="border-t">
                                    <td className="p-4 text-gray-900">{member.nombre}</td>
                                    <td className="p-4 text-gray-600">{member.correo}</td>
                                    <td className="p-4 text-gray-600">{member.rol}</td>
                                    <td className="p-4 text-gray-600">
                                        {member.rol !== 'Creador' && (
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDelete(member.id)}
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Modal de confirmación */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold">Confirmar Eliminación</h2>
                        <p>
                            ¿Estás seguro de eliminar a{' '}
                            {members.find((member) => member.id === memberToDelete)?.nombre}?
                        </p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
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
