import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../utils/getToken';
import { useParams } from 'react-router-dom';
import ListaTratamiento from '../components/planTratamiento/ListaTratamiento';
import './pagesStyle/historialPaciente.css';
import AgregarConsulta from '../components/historialPacientes/AgregarConsulta';
import HistorialConsultas from '../components/historialPacientes/HistorialConsultas';
import HistorialPagos from '../components/historialPacientes/HistorialPagos';
import AgregarPago from '../components/historialPacientes/AgregarPago';
const HistorialPacientes = () => {
  const { id } = useParams();

  const [consultas, setConsultas] = useState();
  const [crud, setcrud] = useState();
  const [tratamientosConsulta, setTratamientosConsulta] = useState();
  const [verCitas, setverCitas] = useState(false);
  const [allCitas, setallCitas] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/cita/paciente/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        setallCitas(res.data.citas);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/plan-tratamiento/paciente/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        setConsultas(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id, crud]);

  return (
    <div className="HistorialPacientes__container">
      <section className="HistorialPacientes__sectionOne">
        <h1>
          Historial del paciente {consultas?.paciente.nombres}{' '}
          {consultas?.paciente.apellidoPaterno}{' '}
          {consultas?.paciente.apellidoMaterno}
        </h1>
        <button onClick={() => setverCitas(!verCitas)}>
          {verCitas ? 'Ver Consultas' : 'Ver Citas'}
        </button>
      </section>
      {verCitas ? (
        <section className="HistorialPacientes__sectionTwo">
          <h3>Citas</h3>
          <table className="table__container">
            <thead>
              <tr>
                <th>Cita</th>
                <th>Descripcion</th>
                <th style={{ width: '150px' }}>fecha</th>
                <th style={{ width: '100px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {allCitas?.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.titulo}</td>
                  <td>{cita.descripcion}</td>
                  <td>{cita.fecha}</td>

                  <td>{cita.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="HistorialPacientes__sectionTwo">
          <h3>Tratamientos del paciente</h3>
          <table className="table__container">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Observaciones</th>
                <th style={{ width: '150px' }}>Precio Total</th>
                <th style={{ width: '150px' }}>Acuenta</th>
                <th style={{ width: '150px' }}>Deuda</th>
                <th style={{ width: '150px' }}>
                  Documento de la Consulta
                </th>
                <th style={{ width: '150px' }}>Odontograma </th>
                <th>historial del cosultas</th>
                <th>historial de pagos</th>
              </tr>
            </thead>
            <tbody>
              {consultas?.planTratamiento?.map((consulta) => (
                <tr key={consulta.id}>
                  <td>{consulta.titulo}</td>
                  <td>{consulta.observaciones}</td>
                  <td>{consulta.montoTotal}</td>
                  <td>{consulta.acuenta}</td>
                  <td>{consulta.deuda}</td>

                  <td>
                    <a
                      href={consulta.linkFile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Documento
                    </a>
                  </td>
                  <td
                    onClick={() => {
                      setcrud('view'),
                        setTratamientosConsulta(consulta);
                    }}
                  >
                    Ver odontograma
                  </td>
                  <td
                    onClick={() => {
                      setcrud('consultas'),
                        setTratamientosConsulta(consulta);
                    }}
                  >
                    ver historial de consultas
                  </td>
                  <td
                    onClick={() => {
                      setcrud('pagos'),
                        setTratamientosConsulta(consulta);
                    }}
                  >
                    ver historial de pagos
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      {crud === 'view' && (
        <ListaTratamiento
          tratamientosConsulta={tratamientosConsulta}
          setTratamientosConsulta={setTratamientosConsulta}
        />
      )}

      <HistorialConsultas
        crud={crud}
        setCrud={setcrud}
        tratamientosConsulta={tratamientosConsulta}
        setTratamientosConsulta={setTratamientosConsulta}
      />
      <HistorialPagos
        crud={crud}
        setCrud={setcrud}
        tratamientosConsulta={tratamientosConsulta}
        setTratamientosConsulta={setTratamientosConsulta}
      />
      <AgregarConsulta
        crud={crud}
        setCrud={setcrud}
        tratamientosConsulta={tratamientosConsulta}
        setTratamientosConsulta={setTratamientosConsulta}
      />
      <AgregarPago
        crud={crud}
        setCrud={setcrud}
        tratamientosConsulta={tratamientosConsulta}
        setTratamientosConsulta={setTratamientosConsulta}
      />
    </div>
  );
};

export default HistorialPacientes;
