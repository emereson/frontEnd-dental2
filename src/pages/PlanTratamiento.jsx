import React, { useEffect, useState } from 'react';
import './pagesStyle/consultas.css';
import axios from 'axios';
import config from '../utils/getToken';
import TablaConsultas from '../components/planTratamiento/TablaConsultas';
import ConsultaPacientea from '../components/planTratamiento/ConsultaPacientea';
import CrearPacientes from '../components/pacientes/CrearPacientes';
import ListaTratamiento from '../components/planTratamiento/ListaTratamiento';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlanTratamiento = () => {
  const { id } = useParams();
  const today = new Date().toISOString().split('T')[0];
  const [crud, setCrud] = useState('');
  const [consultas, setConsultas] = useState();
  const [verPacientes, setVerPacientes] = useState(false);
  const [tratamientosConsulta, setTratamientosConsulta] = useState();
  const [date, setDate] = useState(today);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/plan-tratamiento/consultorio/${id}/?date=${date}`;
    axios
      .get(url, config)
      .then((res) => {
        console.log(res);
        setConsultas(res.data.planTratamientos);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedDate = formData.get('date');
    setDate(selectedDate);
    // Aquí puedes agregar la lógica para filtrar los datos por fecha
  };

  return (
    <div className="consultas__container">
      <section className="consultas__sectionOne">
        <h1> Plan de Tratamiento</h1>
      </section>
      <section className="consultas__sectionTwo">
        <h2>Tus Tratamientos {today === date ? 'Hoy' : date}</h2>
        <button onClick={() => setVerPacientes(true)}>
          Nueva Tratamiento
        </button>
      </section>
      <section className="consultas__sectionThree">
        <h3>Filtrar por Fecha</h3>
        <form onSubmit={handleSubmit}>
          <input type="date" name="date" defaultValue={date} />
          <button type="submit">Filtrar</button>
        </form>
      </section>

      <TablaConsultas
        consultas={consultas}
        setCrud={setCrud}
        setTratamientosConsulta={setTratamientosConsulta}
      />
      <ConsultaPacientea
        verPacientes={verPacientes}
        setVerPacientes={setVerPacientes}
        setCrud={setCrud}
        crud={crud}
      />
      <ListaTratamiento
        tratamientosConsulta={tratamientosConsulta}
        setTratamientosConsulta={setTratamientosConsulta}
      />
      <CrearPacientes setCrud={setCrud} crud={crud} />
    </div>
  );
};

export default PlanTratamiento;
