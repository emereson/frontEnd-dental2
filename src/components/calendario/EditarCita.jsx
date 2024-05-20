import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../utils/getToken';
import { useEffect } from 'react';

const EditarCita = ({ crud, setCrud, selectCita, setSelectCita }) => {
  const { register, handleSubmit, reset } = useForm();
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [fecha, setFecha] = useState();

  console.log(fecha);

  useEffect(() => {
    setTitulo(selectCita?.titulo);
    setDescripcion(selectCita?.descripcion);
    setFecha(selectCita?.fecha);
  }, [selectCita]);

  console.log(titulo);

  const submit = () => {
    const url = `${import.meta.env.VITE_URL_API}/cita/${
      selectCita?.id
    }`;

    const newData = {
      titulo: titulo,
      descripcion: descripcion,
      fecha: fecha,
    };

    axios
      .patch(url, newData, config)
      .then((res) => {
        setCrud('');
        setSelectCita();
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
      });
    reset();
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
      key={setSelectCita.id}
      className={`crud__container  ${
        crud === 'editarCita' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Editar Cita</h3>
        {crud === 'editarCita' ? (
          <section className="crearCita__sectionOne">
            <div className="crearCita__div">
              <label htmlFor="titulo">Titulo:</label>
              <input
                id="titulo"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
            <div className="crearCita__div">
              <label htmlFor="descripcion">Descripcion:</label>
              <textarea
                id="descripcion"
                type="text"
                rows={5}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            <div className="crearCita__div">
              <label htmlFor="fecha">Fecha:</label>
              <input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button
            type="button"
            onClick={() => {
              setCrud('');
              setSelectCita(null); // Cambiar a null para limpiar el selectCita
            }}
          >
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            Guardar
          </button>
        </section>
      </form>
    </div>
  );
};

export default EditarCita;
