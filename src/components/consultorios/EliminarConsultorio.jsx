import React from 'react';
import axios from 'axios';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const EliminarConsultorio = ({
  crud,
  setCrud,
  selectConsultorio,
}) => {
  const handleSubmit = () => {
    const url = `${import.meta.env.VITE_URL_API}/consultorio/${
      selectConsultorio?.id
    }`;

    axios
      .delete(url, config)
      .then((res) => {
        setCrud('');
        toast.success('El consultorio se elimino   exitosamente');
      })
      .catch((err) => {
        console.log(err);
        setCrud(''); // Mensaje de error
      });
  };

  console.log(crud);
  return (
    <div
      className={`crud__container  ${
        crud === 'delete' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form">
        <h3>
          Seguro que quiere eliminar{' '}
          {selectConsultorio?.nombreConsultorio}?
        </h3>

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

export default EliminarConsultorio;
