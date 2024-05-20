import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../utils/getToken';
import Odontograma from './odontograma/Odontograma';
import './consultasStyle/consultaPaciente.css';
import { useParams } from 'react-router-dom';

const ConsultaPacientea = ({
  crud,
  setCrud,
  verPacientes,
  setVerPacientes,
}) => {
  const { id } = useParams();

  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState('');
  const [verOdontograma, setVerOdontograma] = useState(false);
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
  }, [crud]);

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
                      setVerOdontograma(true),
                        setSelectPaciente(paciente);
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
      <Odontograma
        verOdontograma={verOdontograma}
        setVerOdontograma={setVerOdontograma}
        setCrud={setCrud}
        selectPaciente={selectPaciente}
        crud={crud}
        setVerPacientes={setVerPacientes}
      />
    </div>
  );
};

export default ConsultaPacientea;
