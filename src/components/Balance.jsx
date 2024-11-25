import React, { useEffect, useState } from "react";

// Miembros de ejemplo y pagos simulados
const members = [
  { nombre: "Tomas machuca", email: "tomasmachuca@gmail.com" },
  { nombre: "Marco riccitelli", email: "marcoriccitelli@gmail.com" },
  { nombre: "Franco Magurno", email: "francomagurno@gmail.com" },
];

const payments = [
  { paidBy: "tomasmachuca@gmail.com", amount: 999 },
  { paidBy: "marcoriccitelli@gmail.com", amount: 400 },
  { paidBy: "francomagurno@gmail.com", amount: 80 },
];

export const Balance = () => {
  const [balances, setBalances] = useState([]);

  // Función para calcular los balances
  const calculateBalances = () => {
    const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
    const share = totalAmount / members.length; // Cuánto debería pagar cada uno
    const tempBalances = members.map((member) => {
      const paidByMember =
        payments.find((payment) => payment.paidBy === member.email)?.amount || 0;
      const balance = paidByMember - share; // Positivo significa que debe cobrar, negativo que debe pagar

      const porPagar = balance < 0 ? Math.abs(balance).toFixed(2) : 0;
      const porCobrar = balance > 0 ? balance.toFixed(2) : 0;

      let estado = "A Favor";
      let estadoClass = "bg-green-200 text-green-700"; // Estilos para A Favor
      if (porPagar > porCobrar) {
        estado = "Deuda";
        estadoClass = "bg-red-200 text-red-700"; // Estilos para Deuda
      }

      return {
        nombre: member.nombre,
        email: member.email,
        porPagar: `$${porPagar}`,
        porCobrar: `$${porCobrar}`,
        estado,
        estadoClass, // Clase CSS para el estilo condicional
      };
    });
    setBalances(tempBalances);
  };

  useEffect(() => {
    calculateBalances();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Título y descripción */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Balance de Transacciones</h1>
        <p className="text-gray-600">
          Este es un resumen del balance financiero, mostrando las cantidades
          por pagar o por cobrar de los miembros.
        </p>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-4 text-left text-gray-700 font-semibold">Nombre</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Email</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Por Pagar</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Por Cobrar</th>
              <th className="p-4 text-left text-gray-700 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((balance, index) => (
              <tr key={index} className="border-t">
                <td className="p-4 text-gray-900">
                  {balance.nombre}
                  {balance.nombre === "Tomas machuca" && (
                    <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-lg">
                      Tú
                    </span>
                  )}
                </td>
                <td className="p-4 text-gray-600">{balance.email}</td>
                <td className="p-4 text-gray-600">{balance.porPagar}</td>
                <td className="p-4 text-gray-600">{balance.porCobrar}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${balance.estadoClass}`}>
                    {balance.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Balance;
