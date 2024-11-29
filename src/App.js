import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandinPage from './Pages/LandinPage';
import SingIn from './Pages/SingIn';
import SignUp from './Pages/SignUp';
import Menu from './Pages/Menu';
import ChargeTicket from './Pages/ChargeTicket';
import CreateGroup from './components/CreateGroup';
import TeamMembersComponent from './components/TeamMembers';
import UserProfileComponent from './components/UserProfileComponent';
import AddMembers from './components/AddMembers';
import Historial from './components/Historial';
import Balance from './components/Balance';
import SettleBalanceComponent from './components/SettleBalanceComponent';
import Saldos from './components/Saldos';
import TicketGroupForm from './components/Ticket-Grupo';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<LandinPage />} />

        {/* Ruta para la página de inicio de sesión */}
        <Route path="/iniciar-sesion" element={<SingIn />} />

        {/* Ruta para la página de registro */}
        <Route path="/registrarse" element={<SignUp />} />

        {/* Ruta para la página del menú */}
        <Route path="/menu" element={<Menu />} />

        {/* Ruta para la página de cargar ticket */}
        <Route path="/cargar-ticket" element={<ChargeTicket />} />

        {/* Ruta para crear un grupo */}
        <Route path="/crear-grupo" element={<CreateGroup />} />

        {/* Ruta para ver los miembros del equipo */}
        <Route path="/miembros/:id_grupo" element={<TeamMembersComponent />} />

        {/* Ruta para el perfil de usuario */}
        <Route path="/tu-perfil/:id_usuario" element={<UserProfileComponent />} />

        {/* Ruta para agregar miembros */}
        <Route path="/add-members" element={<AddMembers />} />
        <Route path="/historial/:id_grupo" element={<Historial />} />
        <Route path="/balance/:groupId" element={<Balance />} />
        <Route path="/cerrar-balance" element={<SettleBalanceComponent />} />
        <Route path="/saldo" element={<Saldos />} />
        <Route path="/ticket-grupo" element={<TicketGroupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
