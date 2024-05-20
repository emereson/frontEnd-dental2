import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../utils/getToken';
import './calendarioStyle/calendarioSelectPaciente.css';
import CrearCita from './CrearCita';
import { useParams } from 'react-router-dom';

const CalendarioSelectPaciente = ({
  crud,
  setCrud,
  verPacientes,
  setVerPacientes,
}) => {
  const { id } = useParams();
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectPaciente, setSelectPaciente] = useState();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/paciente/consultorio/${id}/?search=${search}`;
    axios
      .get(url, config)
      .then((res) => {
        setPacientes(res.data.pacientes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Agregar 'search' como dependencia del useEffect

  const filterPacientes = () => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/paciente?search=${search}`;
    axios
      .get(url, config)
      .then((res) => {
        setPacientes(res.data.pacientes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`calendarioSelectPaciente__containerFixed ${
        verPacientes ? '' : 'calendarioSelectPaciente__closeContainer'
      }`}
    >
      {verPacientes ? (
        <div className="calendarioSelectPaciente__container">
          <section className="calendarioSelectPaciente__sectionOne">
            <h2>Seleccione Un Paciente</h2>
            <article>
              <button
                className="calendarioSelectPaciente__closeButton"
                type="button"
                onClick={() => setVerPacientes(false)}
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => setCrud('createUser')}
              >
                Nuevo Paciente
              </button>
            </article>
          </section>
          <form
            className="calendarioSelectPaciente__form"
            onSubmit={filterPacientes}
          >
            <input
              type="text"
              placeholder="buscar paciente"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button type="submit">Buscar</button>
          </form>

          <table className="table__container">
            <thead>
              <tr>
                <th>Carnet de Identidad</th>
                <th>Nombres</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Genero</th>
                <th>Telefono</th>
                <th>Fecha de Nacimiento</th>
                <th>Seleccionar Paciente</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.carnet}</td>
                  <td>{paciente.nombres}</td>
                  <td>{paciente.apellidoPaterno}</td>
                  <td>{paciente.apellidoMaterno}</td>
                  <td>{paciente.genero}</td>
                  <td>{paciente.telefono}</td>
                  <td>{paciente.fechaDeNacimiento}</td>
                  <td
                    onClick={() => {
                      setSelectPaciente(paciente),
                        setCrud('crearCita');
                    }}
                  >
                    seleccionar
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <CrearCita
        crud={crud}
        setCrud={setCrud}
        selectPaciente={selectPaciente}
        setSelectPaciente={setSelectPaciente}
      />
    </div>
  );
};

export default CalendarioSelectPaciente;
