import React, { useState } from 'react';
import './pagesStyle/Perfil.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../utils/getToken';
import { toast } from 'react-toastify';
const Perfil = ({ userData }) => {
  const { register, handleSubmit, reset } = useForm();
  const [crud, setCrud] = useState();

  const submit = (data) => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/usuario/update-password/${userData.id}`;

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
    <div className="Perfil__container">
      <section className="Perfil__sectionOne">
        <h1>Mi Perfil</h1>
      </section>
      <section className="Perfil__sectionTwo">
        <ul>
          <li>
            nombre: {userData.nombres} {userData.apellidos}
          </li>
          <li>rol: {userData.rol}</li>
          <li>correo: {userData.email}</li>
          <li>telefono: {userData.telefono}</li>

          <button onClick={() => setCrud('update')}>
            Cambiar Contraseña
          </button>
        </ul>
      </section>{' '}
      <section
        className={`crud__container  ${
          crud === 'update' ? '' : 'closeCrud__container'
        }`}
      >
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
      </section>
    </div>
  );
};

export default Perfil;
