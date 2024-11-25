import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from './Menu/Navbar'; // Importa el Navbar global

const Saldo = () => {
    const currentUser = "Tomas Machuca"; // Usuario actual simulado
    const [activeTab, setActiveTab] = useState('lo-que-debo');
    const [successMessage, setSuccessMessage] = useState(""); // Estado para mensajes de éxito
    const [balances, setBalances] = useState([
        { from: "Marco Riccitelli", to: "Tomas Machuca", amount: 300, type: "debo" },
        { from: "Franco Magurno", to: "Tomas Machuca", amount: 153, type: "debo" },
        { from: "Tomas Machuca", to: "Marco Riccitelli", amount: 400, type: "meDebes" },
        { from: "Tomas Machuca", to: "Franco Magurno", amount: 80, type: "meDebes" },
    ]); // Datos simulados
    const [confirmPayment, setConfirmPayment] = useState(null); // Estado del modal para confirmación de pago
    const navigate = useNavigate();

    // Simula marcar una deuda como pagada
    const handleMarkAsPaid = (to) => {
        setBalances(balances.filter(balance => !(balance.to === currentUser && balance.from === to)));
        setSuccessMessage(`Has pagado tu deuda a ${to}`);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Simula confirmar un pago recibido
    const handleConfirmReceivedPayment = (from) => {
        setBalances(balances.filter(balance => !(balance.from === currentUser && balance.to === from)));
        setSuccessMessage(`Has confirmado el pago de ${from}`);
        setConfirmPayment(null);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Abre el modal de confirmación de pago recibido
    const handleOpenConfirmPaymentModal = (from) => {
        setConfirmPayment({ from });
    };

    // Simula enviar un recordatorio
    const handleSendReminder = (to) => {
        setSuccessMessage(`Recordatorio enviado a ${to}`);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Vuelve a la lista de miembros
    const handleGoBack = () => {
        navigate("/miembros");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-grow p-4 sm:p-6 bg-gray-100 mt-16">
                <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Saldos de {currentUser}</h2>

                    {/* Mensaje de éxito */}
                    {successMessage && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-md">
                            {successMessage}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="mb-6 border-b border-gray-200">
                        <nav className="flex space-x-4 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('lo-que-debo')}
                                className={`px-4 py-2 text-sm font-medium focus:outline-none ${activeTab === 'lo-que-debo' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            >
                                Lo que Debo
                            </button>
                            <button
                                onClick={() => setActiveTab('lo-que-me-deben')}
                                className={`px-4 py-2 text-sm font-medium focus:outline-none ${activeTab === 'lo-que-me-deben' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            >
                                Lo que Me Deben
                            </button>
                        </nav>
                    </div>

                    {/* List of debts and credits */}
                    {activeTab === 'lo-que-debo' ? (
                        <div>
                            {balances
                                .filter((balance) => balance.to === currentUser && balance.type === 'debo')
                                .map((balance, index) => (
                                    <div key={index} className="bg-red-50 p-4 mb-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
                                        <div className="text-gray-800 mb-2 sm:mb-0 text-center sm:text-left">
                                            Debes <strong>${balance.amount}</strong> a <strong>{balance.from}</strong>
                                        </div>
                                        <button
                                            onClick={() => handleMarkAsPaid(balance.from)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                                        >
                                            Ya Pagué
                                        </button>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div>
                            {balances
                                .filter((balance) => balance.from === currentUser && balance.type === 'meDebes')
                                .map((balance, index) => (
                                    <div key={index} className="bg-green-50 p-4 mb-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
                                        <div className="text-gray-800 mb-2 sm:mb-0 text-center sm:text-left">
                                            <strong>{balance.to}</strong> te debe <strong>${balance.amount}</strong>
                                        </div>
                                        <div className="flex space-y-2 sm:space-y-0 sm:space-x-2 flex-col sm:flex-row w-full sm:w-auto">
                                            <button
                                                onClick={() => handleOpenConfirmPaymentModal(balance.to)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full"
                                            >
                                                Ya Me Pagó
                                            </button>
                                            <button
                                                onClick={() => handleSendReminder(balance.to)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
                                            >
                                                Enviar Recordatorio
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                {/* Botón de Volver */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleGoBack}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition w-full sm:w-auto"
                    >
                        Volver
                    </button>
                </div>

                {/* Confirmación de pago recibido modal */}
                {confirmPayment && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-auto">
                            <h3 className="text-xl font-bold mb-4 text-center">Confirmar Pago</h3>
                            <p className="text-gray-700 mb-4 text-center">
                                ¿Confirmas que has recibido el pago de <strong>{confirmPayment.from}</strong>?
                            </p>
                            <div className="flex space-x-4 justify-center">
                                <button
                                    onClick={() => handleConfirmReceivedPayment(confirmPayment.from)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
                                >
                                    Sí
                                </button>
                                <button
                                    onClick={() => setConfirmPayment(null)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Saldo;
