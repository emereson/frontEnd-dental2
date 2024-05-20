import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import Login from './pages/Login';
import Users from './pages/Users';
import ProtectedRoutes from './utils/ProtecteRoutes';
import Pacientes from './pages/Pacientes';
import Calendario from './pages/Calendario';
import Consultas from './pages/PlanTratamiento';
import HistorialPacientes from './pages/HistorialPacientes';
import Reportes from './pages/Reportes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Consultorios from './pages/Consultorios';
import { useState } from 'react';
import Tratamientos from './pages/Tratamientos';
import Perfil from './pages/Perfil';
import PlanTratamiento from './pages/PlanTratamiento';
import TiposSangre from './pages/TiposSangre';

function App() {
  const userDataJSON = localStorage.getItem('userData');
  const userData = JSON.parse(userDataJSON);
  const [idConsultorio, setidConsultorio] = useState();

  return (
    <>
      <ToastContainer />

      {userData ? (
        <Header
          userData={userData?.usuario}
          idConsultorio={idConsultorio}
          setidConsultorio={setidConsultorio}
        />
      ) : null}
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Consultorios />} />
          <Route
            path="/perfil"
            element={<Perfil userData={userData?.usuario} />}
          />
          <Route path="/users" element={<Users />} />

          <Route
            path="/consultorio/:id/inicio"
            element={<Home setidConsultorio={setidConsultorio} />}
          />
          <Route
            path="/consultorio/:id/pacientes"
            element={<Pacientes />}
          />
          <Route
            path="/consultorio/:id/calendario"
            element={<Calendario />}
          />
          <Route
            path="/consultorio/:id/consultas"
            element={<PlanTratamiento />}
          />
          <Route
            path="/consultorio/:consultorioId/historial/:id"
            element={<HistorialPacientes />}
          />
          <Route
            path="/consultorio/:id/reportes"
            element={<Reportes />}
          />
          <Route
            path="/consultorio/:id/tratamiento"
            element={<Tratamientos />}
          />
          <Route
            path="/consultorio/:id/tipo-sangre"
            element={<TiposSangre />}
          />
          <Route path="/consultorio/:id/users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
