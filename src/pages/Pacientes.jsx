import React, { useEffect, useState } from 'react';
import './pagesStyle/pacientes.css';
import axios from 'axios';
import config from '../utils/getToken';
import CrearPacientes from '../components/pacientes/CrearPacientes';
import EliminarPaciente from '../components/pacientes/EliminarPaciente';
import TablaPacientes from '../components/pacientes/TablaPacientes';
import EditarPaciente from '../components/pacientes/EditarPaciente';
import { useParams } from 'react-router-dom';

const Pacientes = () => {
  const { id } = useParams();
  const [crud, setCrud] = useState('');
  const [pacientes, setPacientes] = useState();
  const [selectPaciente, setSelectPaciente] = useState();
  const [search, setSearch] = useState('');

  console.log(pacientes);

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
    }/paciente/consultorio/${id}?search=${search}`;
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
    <div className="pacientes__container">
      <section className="pacientes__sectionOne">
        <h1> Pacientes</h1>
      </section>
      <section className="pacientes__sectionTwo">
        <h2>Tus Pacientes</h2>
        <button onClick={() => setCrud('createUser')}>
          Nuevo Paciente
        </button>
      </section>
      <form
        className="calendarioSelectPaciente__form"
        onSubmit={filterPacientes}
        style={{ margin: '10px' }}
      >
        <input
          type="text"
          placeholder="buscar paciente"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">Buscar</button>
      </form>

      <TablaPacientes
        pacientes={pacientes}
        setSelectPaciente={setSelectPaciente}
        setCrud={setCrud}
      />

      <CrearPacientes setCrud={setCrud} crud={crud} id={id} />
      <EditarPaciente
        setCrud={setCrud}
        crud={crud}
        selectPaciente={selectPaciente}
      />
      <EliminarPaciente
        setCrud={setCrud}
        crud={crud}
        selectPaciente={selectPaciente}
      />
    </div>
  );
};

export default Pacientes;
