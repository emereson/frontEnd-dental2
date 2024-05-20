import React, { useEffect, useState } from 'react';
import './pagesStyle/consultas.css';
import axios from 'axios';
import config from '../utils/getToken';
import TablaConsultas from '../components/planTratamiento/TablaConsultas';
import * as XLSX from 'xlsx';
import { useParams } from 'react-router-dom';

const Reportes = () => {
  const { id } = useParams();
  const today = new Date().toISOString().split('T')[0];
  const [crud, setCrud] = useState('');
  const [consultas, setConsultas] = useState();
  const [date, setDate] = useState(today);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/plan-tratamiento/consultorio/${id}/?date=${date}`;
    axios
      .get(url, config)
      .then((res) => {
        setConsultas(res.data.planTratamientos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [crud, date]);

  console.log(consultas);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedDate = formData.get('date');
    setDate(selectedDate);
  };

  const exportToExcel = () => {
    const filename = 'reporte_consultas.xlsx';
    const ws = XLSX.utils.json_to_sheet(consultas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Consultas');
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="consultas__container">
      <section className="consultas__sectionOne">
        <h1>Reporte de Consultas</h1>
      </section>
      <section className="consultas__sectionTwo">
        <h2>Tus Consultas de {today === date ? 'Hoy' : date}</h2>
        <button onClick={exportToExcel}>Exportar Excel</button>
      </section>
      <section className="consultas__sectionThree">
        <h3>Filtrar por Fecha</h3>
        <form onSubmit={handleSubmit}>
          <input type="date" name="date" defaultValue={date} />
          <button type="submit">Filtrar</button>
        </form>
      </section>

      <TablaConsultas consultas={consultas} setCrud={setCrud} />
    </div>
  );
};

export default Reportes;
