import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../pages/pagesStyle/crud.css';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const CrearConsultorio = ({ crud, setCrud }) => {
  const { register, handleSubmit, reset } = useForm();
  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/consultorio`;

    axios
      .post(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('El consultorio  se creo exitosamente');
      })
      .catch((err) => {
        toast.error('hubo un error al crear el consultorio');
        setCrud('');
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'create' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Nuevo Paciente</h3>
        {crud === 'create' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="nombreConsultorio">
                Nombre del Consultorio:
              </label>
              <input
                {...register('nombreConsultorio')}
                id="nombreConsultorio"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="direccion">Direccion:</label>
              <input
                {...register('direccion')}
                id="direccion"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="telefono">Telefono:</label>
              <input
                {...register('telefono')}
                id="telefono"
                type="number"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="linkGoogleMaps">Ubicacion:</label>
              <input
                {...register('linkGoogleMaps')}
                id="linkGoogleMaps"
                type="text"
                required
              />
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button type="button" onClick={() => setCrud('')}>
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            Crear Consultorio
          </button>
        </section>
      </form>
    </div>
  );
};

export default CrearConsultorio;
