import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './pagesStyle/header.css';
import config from '../utils/getToken';
import axios from 'axios';

const Header = ({ userData, idConsultorio, setidConsultorio }) => {
  const navigate = useNavigate();
  const [consultorio, setconsultorio] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/consultorio/${
      idConsultorio || userData.idConsultorio
    }`;
    axios

      .get(url, config)
      .then((res) => {
        setconsultorio(res.data.consultorio);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [idConsultorio, userData]);

  console.log(consultorio);
  return (
    <header className="header__container">
      {userData?.rol === 'SuperAdmin' && !idConsultorio && (
        <>
          <Link className="header__link" to="/">
            <i className="bx bxs-store"></i> <p>Tus Consultorios</p>
          </Link>

          <Link className="header__link" to="/users">
            <i className="bx bxs-user-circle"></i>
            <p>Usuarios</p>
          </Link>

          <Link
            className="header__link"
            onClick={() => {
              localStorage.clear();
              navigate('/');
              window.location.reload();
            }}
          >
            <i className="bx bxs-door-open"></i> <p>Cerrar Sesion</p>
          </Link>
        </>
      )}

      {userData?.rol === 'SuperAdmin' && idConsultorio && (
        <>
          <a className="header__link">
            <i class="bx bx-plus-medical"></i>{' '}
            <p> {consultorio?.nombreConsultorio}</p>
          </a>
          <Link
            className="header__link"
            to="/"
            onClick={() => setidConsultorio()}
          >
            <i class="bx bx-left-arrow-alt"></i> <p> volver</p>
          </Link>

          <Link className="header__link" to="/">
            <i className="bx bxs-store"></i> <p>Tus Consultorios</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${idConsultorio}/inicio`}
          >
            <i className="bx bxs-home-smile"></i>
            <p>Inicio</p>
          </Link>
          <Link
            to={`/consultorio/${idConsultorio}/calendario`}
            className="header__link"
          >
            <i className="bx bxs-calendar"></i> <p>Calendario</p>
          </Link>
          <Link
            to={`/consultorio/${idConsultorio}/consultas`}
            className="header__link"
          >
            <i className="bx bxs-calendar"></i>{' '}
            <p>Plan de Tratamiento</p>
          </Link>
          <Link
            to={`/consultorio/${idConsultorio}/pacientes`}
            className="header__link"
          >
            <i className="bx bxs-user-detail"></i> <p>Pacientes</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${idConsultorio}/users`}
          >
            <i className="bx bxs-user-circle"></i>
            <p>Usuarios</p>
          </Link>

          <Link
            className="header__link"
            to={`/consultorio/${idConsultorio}/reportes`}
          >
            <i className="bx bxs-report"></i> <p>Reportes</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${idConsultorio}/tratamiento`}
          >
            <i className="bx bxs-report"></i> <p>Tratamientos</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${idConsultorio}/tipo-sangre`}
          >
            <i class="bx bxs-donate-blood"></i> <p>Tipos de Sangre</p>
          </Link>
          <Link
            className="header__link"
            onClick={() => {
              localStorage.clear();
              navigate('/');
              window.location.reload();
            }}
          >
            <i className="bx bxs-door-open"></i> <p>Cerrar Sesion</p>
          </Link>
        </>
      )}
      {userData?.rol === 'Administrador' && (
        <>
          <a className="header__link">
            <i class="bx bx-plus-medical"></i>{' '}
            <p> {consultorio?.nombreConsultorio}</p>
          </a>
          <Link className="header__link" to={`/perfil`}>
            <i className="bx bxs-user"></i> <p>Perfil</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${userData.consultorioId}/inicio`}
          >
            <i className="bx bxs-home-smile"></i>
            <p>Inicio</p>
          </Link>
          <Link
            to={`/consultorio/${userData.consultorioId}/calendario`}
            className="header__link"
          >
            <i className="bx bxs-calendar"></i> <p>Calendario</p>
          </Link>
          <Link
            to={`/consultorio/${userData.consultorioId}/consultas`}
            className="header__link"
          >
            <i className="bx bxs-calendar"></i> <p>Consultas</p>
          </Link>
          <Link
            to={`/consultorio/${userData.consultorioId}/pacientes`}
            className="header__link"
          >
            <i className="bx bxs-user-detail"></i> <p>Pacientes</p>
          </Link>

          <Link
            className="header__link"
            to={`/consultorio/${userData.consultorioId}/users`}
          >
            <i className="bx bxs-user-circle"></i>
            <p>Usuarios</p>
          </Link>

          <Link
            className="header__link"
            to={`/consultorio/${userData.consultorioId}/reportes`}
          >
            <i className="bx bxs-report"></i> <p>Reportes</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${userData.consultorioId}/tratamiento`}
          >
            <i className="bx bxs-report"></i> <p>Tratamientos</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${userData.consultorioId}/tipo-sangre`}
          >
            <i class="bx bxs-donate-blood"></i> <p>Tipos de Sangre</p>
          </Link>
          <Link
            className="header__link"
            onClick={() => {
              localStorage.clear();
              navigate('/');
              window.location.reload();
            }}
          >
            <i className="bx bxs-door-open"></i> <p>Cerrar Sesion</p>
          </Link>
        </>
      )}
      {userData?.rol === 'Doctor' && (
        <>
          <a className="header__link">
            <i class="bx bx-plus-medical"></i>{' '}
            <p> {consultorio?.nombreConsultorio}</p>
          </a>
          <Link className="header__link" to={`/perfil`}>
            <i className="bx bxs-user"></i> <p>Perfil</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${userData.consultorioId}/inicio`}
          >
            <i className="bx bxs-home-smile"></i>
            <p>Inicio</p>
          </Link>
          <Link
            to={`/consultorio/${userData.consultorioId}/calendario`}
            className="header__link"
          >
            <i className="bx bxs-calendar"></i> <p>Calendario</p>
          </Link>
          <Link
            to={`/consultorio/${userData.consultorioId}/consultas`}
            className="header__link"
          >
            <i className="bx bxs-calendar"></i> <p>Consultas</p>
          </Link>
          <Link
            to={`/consultorio/${userData.consultorioId}/pacientes`}
            className="header__link"
          >
            <i className="bx bxs-user-detail"></i> <p>Pacientes</p>
          </Link>

          <Link
            className="header__link"
            to={`/consultorio/${userData.consultorioId}/reportes`}
          >
            <i className="bx bxs-report"></i> <p>Reportes</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${userData.consultorioId}/tratamiento`}
          >
            <i className="bx bxs-report"></i> <p>Tratamientos</p>
          </Link>
          <Link
            className="header__link"
            to={`/consultorio/${userData.consultorioId}/tipo-sangre`}
          >
            <i class="bx bxs-donate-blood"></i> <p>Tipos de Sangre</p>
          </Link>
          <Link
            className="header__link"
            onClick={() => {
              localStorage.clear();
              navigate('/');
              window.location.reload();
            }}
          >
            <i className="bx bxs-door-open"></i> <p>Cerrar Sesion</p>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
