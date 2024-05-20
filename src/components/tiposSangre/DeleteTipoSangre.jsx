import React from 'react';
import axios from 'axios';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const DeleteTipoSangre = ({ crud, setCrud, selectTratamiento }) => {
  const handleSubmit = () => {
    const url = `${import.meta.env.VITE_URL_API}/tipo-sangre/${
      selectTratamiento?.id
    }`;

    axios
      .delete(url, config)
      .then((res) => {
        setCrud('');
        toast.success('El tip de sangre se elimino exitosamente');
      })
      .catch((err) => {
        console.log(err);
        setCrud(''); // Mensaje de error
      });
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'deleteUser' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form">
        <h3>
          Seguro que quiere eliminar el tipo de sangre{' '}
          {selectTratamiento?.nombre}?
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

export default DeleteTipoSangre;
