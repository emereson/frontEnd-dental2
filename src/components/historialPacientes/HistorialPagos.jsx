import React, { useEffect, useState } from 'react';
import config from '../../utils/getToken';
import axios from 'axios';

const HistorialPagos = ({ crud, setCrud, tratamientosConsulta }) => {
  const [allConsultas, setAllConsultas] = useState();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/pagos/plan-tratamiento/${tratamientosConsulta?.id}`;
    axios
      .get(url, config)
      .then((res) => {
        setAllConsultas(res.data.pagosTratamiento);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud]);
  return (
    <div
      className={`calendarioSelectPaciente__containerFixed ${
        crud === 'pagos'
          ? ''
          : 'calendarioSelectPaciente__closeContainer'
      }`}
    >
      <div className="calendarioSelectPaciente__container">
        <section className="calendarioSelectPaciente__sectionOne">
          <h2>Historial de pagos</h2>
          <article>
            <button
              className="calendarioSelectPaciente__closeButton"
              type="button"
              onClick={() => setCrud()}
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={() => setCrud('createPago')}
            >
              Nuevo pago
            </button>
          </article>
        </section>
        <table className="table__container">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Fecha</th>
              <th>Pago</th>
            </tr>
          </thead>
          <tbody>
            {allConsultas?.map((consulta) => (
              <tr key={consulta.id}>
                <td>{consulta.titulo}</td>
                <td>{consulta.fecha}</td>
                <td>{consulta.pago}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialPagos;
