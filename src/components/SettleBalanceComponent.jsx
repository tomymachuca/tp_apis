import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettleBalanceComponent = () => {
  const members = [
    { nombre: "Tomas Machuca", email: "tomasmachuca@gmail.com" },
    { nombre: "Marco Riccitelli", email: "marcoriccitelli@gmail.com" },
    { nombre: "Franco Magurno", email: "francomagurno@gmail.com" },
  ];

  // Tickets simulados
  const tickets = [
    { paidBy: "tomasmachuca@gmail.com", amount: 1000, division: "equal" }, // Equitativo
    {
      paidBy: "marcoriccitelli@gmail.com",
      amount: 500,
      division: "parts",
      percentages: [
        { email: "tomasmachuca@gmail.com", percentage: 50 },
        { email: "marcoriccitelli@gmail.com", percentage: 30 },
        { email: "francomagurno@gmail.com", percentage: 20 },
      ],
    },
  ];

  const [balanceDetails, setBalanceDetails] = useState([]);
  const navigate = useNavigate(); // Para redirigir

  const calculateBalances = () => {
    const totalBalances = {};

    // Inicializar balances
    members.forEach((member) => {
      totalBalances[member.email] = 0;
    });

    // Procesar tickets
    tickets.forEach((ticket) => {
      const { paidBy, amount, division, percentages } = ticket;

      if (division === "equal") {
        const share = amount / members.length;
        members.forEach((member) => {
          totalBalances[member.email] -= share; // Restar lo que debe pagar
        });
        totalBalances[paidBy] += amount; // Sumar lo que pagó
      } else if (division === "parts") {
        percentages.forEach(({ email, percentage }) => {
          const share = (amount * percentage) / 100;
          totalBalances[email] -= share; // Restar lo que debe pagar según porcentaje
        });
        totalBalances[paidBy] += amount; // Sumar lo que pagó
      }
    });

    // Convertir balances en deudas entre miembros
    const balancesArray = Object.entries(totalBalances).map(([email, balance]) => ({
      email,
      nombre: members.find((member) => member.email === email)?.nombre || "Desconocido",
      balance,
    }));

    const toPay = [];
    const owes = balancesArray.filter((b) => b.balance < 0);
    const surplus = balancesArray.filter((b) => b.balance > 0);

    while (owes.length && surplus.length) {
      const payer = owes[0]; // Quien debe pagar
      const receiver = surplus[0]; // Quien debe recibir

      const amount = Math.min(-payer.balance, receiver.balance);

      toPay.push({
        from: payer.nombre,
        to: receiver.nombre,
        amount: amount.toFixed(2),
      });

      payer.balance += amount;
      receiver.balance -= amount;

      if (payer.balance === 0) owes.shift();
      if (receiver.balance === 0) surplus.shift();
    }

    setBalanceDetails(toPay);
  };

  const handleGoBack = () => {
    navigate("/miembros", { state: { balanceClosed: true } }); // Envía el estado balanceClosed
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-semibold text-blue-600">SliceTicket</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 bg-gray-100">
        <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Cerrar Balance</h2>
          <p className="text-sm text-gray-600 mb-6">
            Calcula quién le debe a quién basado en los tickets cargados.
          </p>

          {/* Tabla de tickets */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="p-2 sm:p-4 text-left text-gray-700 font-semibold">Pagado Por</th>
                  <th className="p-2 sm:p-4 text-left text-gray-700 font-semibold">Monto Total</th>
                  <th className="p-2 sm:p-4 text-left text-gray-700 font-semibold">Tipo de División</th>
                  <th className="p-2 sm:p-4 text-left text-gray-700 font-semibold">Desglose</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 sm:p-4 text-gray-800">
                      {members.find((member) => member.email === ticket.paidBy)?.nombre || "Desconocido"}
                    </td>
                    <td className="p-2 sm:p-4 text-gray-600">${ticket.amount.toFixed(2)}</td>
                    <td className="p-2 sm:p-4 text-gray-600">
                      {ticket.division === "equal" ? "Equitativo" : "Por Partes"}
                    </td>
                    <td className="p-2 sm:p-4 text-gray-600">
                      {ticket.division === "equal" ? (
                        <ul>
                          {members.map((member) => (
                            <li key={member.email}>
                              {member.nombre}: ${(ticket.amount / members.length).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul>
                          {ticket.percentages.map(({ email, percentage }) => {
                            const member = members.find((m) => m.email === email);
                            return (
                              <li key={email}>
                                {member?.nombre || "Desconocido"}: {percentage}% (
                                ${(ticket.amount * (percentage / 100)).toFixed(2)})
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botón para calcular balances */}
          <div className="flex justify-center mb-6">
            <button
              onClick={calculateBalances}
              className="px-4 sm:px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
            >
              Calcular Balances
            </button>
          </div>

          {/* Mostrar detalles de quién le debe a quién */}
          {balanceDetails.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Deudas Calculadas</h3>
              {balanceDetails.map((detail, index) => (
                <div key={index} className="text-gray-700 mb-2">
                  <strong>{detail.from}</strong> le debe <strong>${detail.amount}</strong> a <strong>{detail.to}</strong>.
                </div>
              ))}
            </div>
          )}

          {/* Botón para regresar */}
          {balanceDetails.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleGoBack}
                className="px-4 sm:px-6 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring"
              >
                Volver a la lista de miembros
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SettleBalanceComponent;
