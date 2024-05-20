import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const AgregarPago = ({ crud, setCrud, tratamientosConsulta }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/pagos/${
      tratamientosConsulta.id
    }`;

    axios
      .post(
        url,
        {
          ...data,
          consultorioId: tratamientosConsulta.consultorioId,
        },
        config
      )
      .then((res) => {
        setCrud('');
        toast.success('El pago   se agrego exitosamente');
      })
      .catch((err) => {
        toast.error('hubo un error al agregar el pago');
        setCrud('');
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'createPago' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>
          Agregar nuevo pago para el tratamiento{' '}
          {tratamientosConsulta?.titulo}
        </h3>
        {crud === 'createPago' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="titulo">Titulo:</label>
              <input
                {...register('titulo')}
                id="titulo"
                type="text"
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="fecha">Fecha:</label>
              <input
                {...register('fecha')}
                id="fecha"
                type="date"
                required
              />
            </div>{' '}
            <div className="crud__div">
              <label htmlFor="pago">Pago:</label>
              <input
                {...register('pago')}
                id="pago"
                type="number"
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
            Agregar Pago
          </button>
        </section>
      </form>
    </div>
  );
};

export default AgregarPago;
