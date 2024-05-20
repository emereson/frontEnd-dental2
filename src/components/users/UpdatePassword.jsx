import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../utils/getToken';
const UpdatePassword = ({ selectUser, setCrud }) => {
  const { register, handleSubmit, reset } = useForm();

  console.log(selectUser);
  const submit = (data) => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/usuario/update-password/${selectUser.id}`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('La contraseña se Cambio exitosamente');
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
        toast.error('Hubo un error al cambiar la contraseña');
      });
    reset();
  };
  return (
    <div className="crud__container">
      {' '}
      <form
        className="crud__form"
        onSubmit={handleSubmit(submit)}
        style={{ maxWidth: '400px' }}
      >
        <h3>Cambia Tu Contaseña</h3>
        <div className="crud__div">
          <label htmlFor="contraseña">Nueva Contraseña:</label>
          <input
            {...register('contraseña')}
            id="contraseña"
            type="password"
            placeholder="ingrese su nueva contraseña"
            required
          />
        </div>

        <section className="crud__sectionTwo">
          <button type="button" onClick={() => setCrud('')}>
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            Cambiar contraseña
          </button>
        </section>
      </form>
    </div>
  );
};

export default UpdatePassword;
