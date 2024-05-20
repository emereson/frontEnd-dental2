import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../pages/pagesStyle/crud.css';
import soloLetrasYEspacios from '../../hooks/LetrasYespacios';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const NuevoPaciente = ({ crud, setCrud }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/usuario/signup`;

    axios
      .post(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('El paciente  se creo exitosamente');
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
        toast.error('hubo un error al crear el paciente');
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'nuevoPaciente' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Nueva Cita</h3>
        {crud === 'nuevoPaciente' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="nombres">Etapa:</label>
              <select
                {...register('rol')}
                id="rol"
                type="text"
                required
              >
                <option value="administrador">etapa 1</option>
                <option value="doctor">estapa 2</option>
              </select>
            </div>
            <div className="crud__div">
              <label htmlFor="apellidos">Paciente:</label>
              <input
                {...register('apellidos')}
                id="apellidos"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="email">Correo:</label>
              <input
                {...register('email')}
                id="email"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="telefono">telefono:</label>
              <input
                {...register('telefono')}
                id="telefono"
                type="number"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                {...register('contraseña')}
                id="contraseña"
                type="password"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="rol">Rol:</label>
              <select
                {...register('rol')}
                id="rol"
                type="text"
                required
              >
                <option value="administrador">Administrador</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button type="button" onClick={() => setCrud('')}>
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            Crear Usuario
          </button>
        </section>
      </form>
    </div>
  );
};

export default NuevoPaciente;
