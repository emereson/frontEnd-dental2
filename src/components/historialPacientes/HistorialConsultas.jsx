import React, { useEffect, useState } from 'react';
import config from '../../utils/getToken';
import axios from 'axios';

const HistorialConsultas = ({
  crud,
  setCrud,
  tratamientosConsulta,
}) => {
  const [allConsultas, setAllConsultas] = useState();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/consulta/plan-tratamiento/${tratamientosConsulta?.id}`;
    axios
      .get(url, config)
      .then((res) => {
        setAllConsultas(res.data.consultas);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud]);
  console.log(allConsultas);
  return (
    <div
      className={`calendarioSelectPaciente__containerFixed ${
        crud === 'consultas'
          ? ''
          : 'calendarioSelectPaciente__closeContainer'
      }`}
    >
      <div className="calendarioSelectPaciente__container">
        <section className="calendarioSelectPaciente__sectionOne">
          <h2>Historial de consultas</h2>
          <article>
            <button
              className="calendarioSelectPaciente__closeButton"
              type="button"
              onClick={() => setCrud()}
            >
              Cerrar
            </button>
            <button type="button" onClick={() => setCrud('create')}>
              Nuevo Consulta
            </button>
          </article>
        </section>
        <table className="table__container">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {allConsultas?.map((consulta) => (
              <tr key={consulta.id}>
                <td>{consulta.titulo}</td>
                <td>{consulta.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialConsultas;
