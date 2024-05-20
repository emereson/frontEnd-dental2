import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../pages/pagesStyle/crud.css';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const CreateTipoSangre = ({ crud, setCrud, id }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/tipo-sangre`;

    axios
      .post(url, { ...data, consultorioId: id }, config)
      .then((res) => {
        setCrud('');
        toast.success('El tipo de sangre  se creo exitosamente');
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
        toast.error('hubo un error al crear el tipo de sangre');
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'createUser' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Nuevo Tipo de sangre</h3>
        {crud === 'createUser' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="nombre">
                Nombre del tipo de sangre:
              </label>
              <input
                {...register('nombre')}
                id="nombre"
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
            Agregar
          </button>
        </section>
      </form>
    </div>
  );
};

export default CreateTipoSangre;
