import React from 'react';
import axios from 'axios';
import config from '../../utils/getToken';

const DeleteUser = ({ crud, setCrud, selectUser }) => {
  const handleSubmit = () => {
    const url = `${import.meta.env.VITE_URL_API}/usuario/${
      selectUser?.id
    }`;

    axios
      .delete(url, config)
      .then((res) => {
        setCrud('');
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
          Seguro que quiere desactivar al usuario{' '}
          {selectUser?.nombres}?
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
            Desactivar
          </button>
        </section>
      </form>
    </div>
  );
};

export default DeleteUser;
