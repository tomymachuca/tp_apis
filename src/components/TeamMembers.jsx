import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Balance from './Balance';
import Navbar from './Menu/Navbar';
import { getMembersByGroupId } from '../api/groups'; // API call to fetch members by group ID

const TeamMembersComponent = () => {
    const { id_grupo } = useParams(); // Get the id_grupo from the route params
    const [members, setMembers] = useState([]);
    const [activeTab, setActiveTab] = useState('members');
    const [balanceCalculated, setBalanceCalculated] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const navigate = useNavigate();

    // Fetch members on component mount
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getMembersByGroupId(id_grupo);
                if (response.members) {
                    setMembers(response.members); // Aquí nos aseguramos de actualizar correctamente la lista de miembros
                }
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        if (id_grupo) fetchMembers();
    }, [id_grupo]);

    // Handle Delete Member Modal
    const handleDelete = (index) => {
        setMemberToDelete(index);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        const updatedMembers = members.filter((_, i) => i !== memberToDelete);
        setMembers(updatedMembers);
        setShowDeleteModal(false);
    };

    const handleAddMember = () => {
        navigate('/add-members', { state: { id_grupo } }); // Pass id_grupo to the add-members page
    };

    const handleSettleBalance = () => {
        navigate('/cerrar-balance', { state: { id_grupo } }); // Pass id_grupo to settle balance
    };

    const handleViewSaldo = () => {
        navigate('/saldo', { state: { id_grupo } }); // Pass id_grupo to view balance
    };

    // Navigate to the Historial route
    const handleHistorialNavigation = () => {
        navigate(`/historial/${id_grupo}`); // Pass id_grupo to the historial route
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />

            <section className="container mx-auto px-4 py-6 mt-16">
                <div className="mb-6 md:flex md:items-center md:justify-between">
                    <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                        <button
                            className={`inline-flex items-center h-10 px-4 -mb-px text-sm ${activeTab === 'members' ? 'text-blue-600 border-blue-500 shadow-lg' : 'text-gray-700 border-transparent'} bg-transparent border-b-2 sm:text-base`}
                            onClick={() => setActiveTab('members')}
                        >
                            Miembros
                        </button>
                        <button
                            className={`inline-flex items-center h-10 px-4 -mb-px text-sm ${activeTab === 'Historial' ? 'text-blue-600 border-blue-500 shadow-lg' : 'text-gray-700 border-transparent'} bg-transparent border-b-2 sm:text-base`}
                            onClick={handleHistorialNavigation} // Redirige a la ruta del historial
                        >
                            Historial
                        </button>
                        <button
                            className={`inline-flex items-center h-10 px-4 -mb-px text-sm ${activeTab === 'balance' ? 'text-blue-600 border-blue-500 shadow-lg' : 'text-gray-700 border-transparent'} bg-transparent border-b-2 sm:text-base`}
                            onClick={() => setActiveTab('balance')}
                        >
                            Balance
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    {activeTab === 'members' ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <h2 className="text-2xl font-bold text-gray-900">Miembros</h2>
                                    <span className="ml-4 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                                        {members.length} Miembros
                                    </span>
                                </div>
                                <button
                                    onClick={handleAddMember}
                                    className="px-5 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                >
                                    Agregar Miembro
                                </button>
                            </div>

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
                                        {members.map((member, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="p-4 text-gray-900">{member.nombre}</td>
                                                <td className="p-4 text-gray-600">{member.correo}</td>
                                                <td className="p-4 text-gray-600">{member.rol}</td>
                                                <td className="p-4 text-gray-600">
                                                    {member.rol !== 'Creador' && (
                                                        <button
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleDelete(index)}
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
                        </>
                    ) : activeTab === 'balance' ? (
                        <Balance />
                    ) : null}
                </div>
            </section>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold">Confirmar Eliminación</h2>
                        <p>¿Estás seguro de eliminar a {members[memberToDelete]?.nombre}?</p>
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
