import React, { useEffect, useState } from 'react';
import './pagesStyle/calendario.css';
import NuevoPaciente from '../components/calendario/NuevoPaciente';
import CalendarioSelectPaciente from '../components/calendario/CalendarioSelectPaciente';
import CrearPacientes from '../components/pacientes/CrearPacientes';
import axios from 'axios';
import config from '../utils/getToken';
import TablaCitas from '../components/calendario/TablaCitas';
import EditarCita from '../components/calendario/EditarCita';
import EliminarCita from '../components/calendario/EliminarCita';
import { useNavigate, useParams } from 'react-router-dom';
import EditarCitaLinea from '../components/calendario/EditarCitaLinea';

const Calendar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crud, setCrud] = useState('');
  const [verPacientes, setVerPacientes] = useState(false);
  const [date, setDate] = useState(new Date());
  const [allCitas, setallCitas] = useState();
  const [verTabla, setVerTabla] = useState(false);
  const [selectCita, setSelectCita] = useState();
  const [allCitasEnLinea, setallCitasEnLinea] = useState();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/cita/consultorio/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        setallCitas(res.data.citas);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud]);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/cita-linea/consultorio/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        setallCitasEnLinea(res.data.citasEnLinea);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud]);

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setDate((prevDate) => {
      const prevMonthDate = new Date(prevDate);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      return prevMonthDate;
    });
  };

  const nextMonth = () => {
    setDate((prevDate) => {
      const nextMonthDate = new Date(prevDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      return nextMonthDate;
    });
  };

  const renderDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysCount = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const currentDay = i.toString().padStart(2, '0');
      const currentDate = `${year}-${(month + 1)
        .toString()
        .padStart(2, '0')}-${currentDay}`;

      const citasLineaForDay = allCitasEnLinea?.filter((cita) => {
        const citaDate = cita.fecha;
        return currentDate === citaDate;
      });
      const citasForDay = allCitas?.filter((cita) => {
        const citaDate = cita.fecha;
        return currentDate === citaDate;
      });

      days.push(
        <div
          key={i}
          className="dias"
          style={
            citasForDay?.length > 0
              ? { backgroundColor: 'var(--body-yeloow)' }
              : null
          }
        >
          <span>{i}</span>
          {citasForDay?.map((cita, index) => (
            <ul
              key={index}
              onClick={() =>
                navigate(
                  `/consultorio/${id}/historial/${cita.paciente.id}`
                )
              }
            >
              <li
                style={{
                  color: 'var(--text-color-blue)',
                  fontWeight: '500',
                }}
              >
                {cita.paciente.nombres}{' '}
                {cita.paciente.apellidoPaterno}{' '}
                {cita.paciente.apellidoMaterno}
              </li>
              <li
                style={{
                  color: 'var(--text-color-darkSkyBlue)',
                  fontWeight: '500',
                }}
              >
                {cita.titulo}
              </li>
              <li style={{ color: 'var(--text-color-gray)' }}>
                {cita.descripcion}
              </li>
            </ul>
          ))}
          {citasLineaForDay?.length > 0 && <p>citas en linea:</p>}
          {citasLineaForDay?.map((cita, index) => (
            <ul
              key={index}
              onClick={() => {
                if (cita.estado === 'confirmar') {
                  setCrud('updateCitaLinea');
                  setSelectCita(cita);
                }
                if (cita.estado !== 'confirmar') {
                  navigate(`/consultorio/${id}/consultas`);
                }
              }}
            >
              {cita.estado === 'confirmar' && (
                <li style={{ fontSize: '10px' }}>por confirmar</li>
              )}
              <li
                style={{
                  color:
                    cita.estado === 'confirmar'
                      ? 'var(--text-color-grayLigth)'
                      : 'var(--text-color-blue)',
                  fontWeight: '500',
                }}
              >
                {cita.nombresApellidos}{' '}
              </li>
              <li
                style={{
                  color:
                    cita.estado === 'confirmar'
                      ? 'var(--text-color-grayLigth)'
                      : 'var(--text-color-gray)',
                  fontWeight: '500',
                }}
              >
                {cita.comentario}{' '}
              </li>
            </ul>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendario__container">
      <section className="calendario__sectionOne">
        <h1>Calendario</h1>
        <article>
          <button onClick={() => setVerTabla(!verTabla)}>
            {verTabla ? 'Ver Calendario' : 'Ver tabla'}
          </button>
          <button onClick={() => setVerPacientes(true)}>
            Nueva Cita
          </button>
        </article>
      </section>
      {verTabla ? (
        <TablaCitas
          allCitas={allCitas}
          setSelectCita={setSelectCita}
          setCrud={setCrud}
          crud={crud}
        />
      ) : (
        <section className="calendario__sectionTwo">
          <div className="calendar__header">
            <button onClick={prevMonth}>Prev</button>
            <h2>
              {date.toLocaleString('default', { month: 'long' })}{' '}
              {date.getFullYear()}
            </h2>
            <button onClick={nextMonth}>Next</button>
          </div>
          <div className="calendario__dias">
            <div className="calendario__diasSemana">
              <p>Domingo</p>
              <p>Lunes</p>
              <p>Martes</p>
              <p>Miércoles</p>
              <p>Jueves</p>
              <p>Viernes</p>
              <p>Sábado</p>
            </div>
            <div className="calendario__diasMes">{renderDays()}</div>
          </div>
        </section>
      )}
      <EditarCita
        setCrud={setCrud}
        crud={crud}
        selectCita={selectCita}
        setSelectCita={setSelectCita}
      />{' '}
      <EditarCitaLinea
        setCrud={setCrud}
        crud={crud}
        selectCita={selectCita}
        setSelectCita={setSelectCita}
      />
      <EliminarCita
        setCrud={setCrud}
        crud={crud}
        selectCita={selectCita}
        setSelectCita={setSelectCita}
      />
      <NuevoPaciente setCrud={setCrud} crud={crud} />
      <CalendarioSelectPaciente
        setCrud={setCrud}
        crud={crud}
        verPacientes={verPacientes}
        setVerPacientes={setVerPacientes}
      />
      <CrearPacientes setCrud={setCrud} crud={crud} />
    </div>
  );
};

export default Calendar;
