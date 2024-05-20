import React from 'react';
import axios from 'axios';
import config from '../../utils/getToken';

const EliminarCita = ({
  crud,
  setCrud,
  selectCita,
  setSelectCita,
}) => {
  const handleSubmit = () => {
    const url = `${import.meta.env.VITE_URL_API}/cita/${
      selectCita?.id
    }`;

    axios
      .delete(url, config)
      .then((res) => {
        setCrud('');
        setSelectCita();
      })
      .catch((err) => {
        setSelectCita();
        setCrud(''); // Mensaje de error
      });
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'eliminarCita' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form">
        <h3>Seguro que quiere eliminar la cita?</h3>

        <section className="crud__sectionTwo">
          <button
            type="button"
            className=" crud__button crudForm__cancelDelete"
            onClick={() => setCrud('')}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="crud__button"
            onClick={handleSubmit}
          >
            Eliminar
          </button>
        </section>
      </form>
    </div>
  );
};

export default EliminarCita;
