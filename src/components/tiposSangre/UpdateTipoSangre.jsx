import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const UpdateTipoSangre = ({
  crud,
  setCrud,
  selectTratamiento,
  setSelectTratamiento,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/tipo-sangre/${
      selectTratamiento?.id
    }`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setCrud('');
        setSelectTratamiento();
        toast.success(
          'Los datos del tipo de sangre se actualizaron exitosamente'
        );
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
      });
    reset();
  };

  return (
    <div
      className={`crud__container  ${
        crud === 'updateUser' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Editar Tipo de sangre {selectTratamiento?.nombre}</h3>
        {crud === 'updateUser' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="nombre">
                Nombre del tipo de sangre:
              </label>
              <input
                {...register('nombre')}
                id="nombre"
                type="text"
                defaultValue={selectTratamiento.nombre}
                required
              />
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button
            type="button"
            onClick={() => {
              setCrud(''), setSelectTratamiento(), reset();
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

export default UpdateTipoSangre;
