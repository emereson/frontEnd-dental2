import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './calendarioStyle/crearCita.css';
import config from '../../utils/getToken';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CrearCita = ({
  crud,
  setCrud,
  selectPaciente,
  setSelectPaciente,
}) => {
  const { id } = useParams();

  const { register, handleSubmit, reset } = useForm();
  const [fecha, setFecha] = useState('');

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/cita/paciente/${
      selectPaciente?.id
    }`;

    const fechaSeleccionada = new Date(fecha);
    const fechaActual = new Date();

    if (fechaSeleccionada >= fechaActual) {
      axios
        .post(url, { ...data, consultorioId: id }, config)
        .then((res) => {
          setCrud('');
          setSelectPaciente();
          toast.success('La cita  se creo exitosamente');
        })
        .catch((err) => {
          setCrud('');
          setSelectPaciente();
        });
      reset();
    } else {
      toast.error(
        'La fecha seleccionada no puede ser anterior a la fecha actual'
      );
    }
  };

  function soloLetrasYEspacios(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      !(charCode >= 65 && charCode <= 90) && // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32 && // Espacio
      charCode !== 8 // Tecla de retroceso
    ) {
      event.preventDefault();
    }
  }

  return (
    <div
      className={`crud__container  ${
        crud === 'crearCita' ? '' : 'closeCrud__container'
      }`}
    >
      <form
        className="crearCita__form"
        onSubmit={handleSubmit(submit)}
      >
        <h3>Nueva Cita Para el Paciente {selectPaciente?.nombres}</h3>
        {crud === 'crearCita' ? (
          <section className="crearCita__sectionOne">
            <div className="crearCita__div">
              <label htmlFor="titulo">Titulo:</label>
              <input
                {...register('titulo')}
                id="titulo"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                required
              />
            </div>
            <div className="crearCita__div">
              <label htmlFor="descripcion">Descripcion:</label>
              <textarea
                {...register('descripcion')}
                id="descripcion"
                type="text"
                rows={5}
                required
              />
            </div>
            <div className="crearCita__div">
              <label htmlFor="fecha">Fecha:</label>
              <input
                {...register('fecha')}
                id="fecha"
                type="date"
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button type="button" onClick={() => setCrud('')}>
            Cancelar
          </button>

          <button type="submit">Crear Cita</button>
        </section>
      </form>
    </div>
  );
};

export default CrearCita;
