import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const EditarConsultorio = ({
  crud,
  setCrud,
  selectConsultorio,
  setSelectConsultorio,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/consultorio/${
      selectConsultorio?.id
    }`;

    axios
      .patch(url, data, config)
      .then((res) => {
        toast.success(
          'Los datos del consultorio se a actualizado   exitosamente'
        );
        setCrud('');
        setSelectConsultorio();
        reset();
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
      });
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'update' ? '' : 'closeCrud__container'
      }`}
    >
      <form
        className="crud__form"
        onSubmit={handleSubmit(submit)}
        key={selectConsultorio?.id}
      >
        <h3> {selectConsultorio?.nombreConsultorio}</h3>
        {crud === 'update' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="nombreConsultorio">
                Nombre del Consultorio:
              </label>
              <input
                {...register('nombreConsultorio')}
                id="nombreConsultorio"
                type="text"
                defaultValue={selectConsultorio.nombreConsultorio}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="direccion">Direccion:</label>
              <input
                {...register('direccion')}
                id="direccion"
                type="text"
                defaultValue={selectConsultorio.direccion}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="telefono">Telefono:</label>
              <input
                {...register('telefono')}
                id="telefono"
                type="number"
                defaultValue={selectConsultorio.telefono}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="linkGoogleMaps">Ubicacion:</label>
              <input
                {...register('linkGoogleMaps')}
                id="linkGoogleMaps"
                type="text"
                defaultValue={selectConsultorio.linkGoogleMaps}
                required
              />
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button
            type="button"
            onClick={() => {
              setCrud(''), setSelectConsultorio();
              reset();
            }}
          >
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            guardar
          </button>
        </section>
      </form>
    </div>
  );
};

export default EditarConsultorio;
