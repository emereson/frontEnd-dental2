import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const UpdateTratamiento = ({
  crud,
  setCrud,
  selectTratamiento,
  setSelectTratamiento,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/tratamiento/${
      selectTratamiento?.id
    }`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setCrud('');
        setSelectTratamiento();
        toast.success(
          'Los datos del tratamiento se actualizaron exitosamente'
        );
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
      });
    reset();
  };

  function soloLetrasYEspacios(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      !(charCode >= 65 && charCode <= 90) && // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32 && // Espacio
      charCode !== 8 // Tecla de retroceso
    ) {
      event.preventDefault();
    }
  }
  return (
    <div
      className={`crud__container  ${
        crud === 'updateUser' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3> Usuario {selectTratamiento?.nombre}</h3>
        {crud === 'updateUser' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="nombre">Nombre del Tratamiento:</label>
              <input
                {...register('nombre')}
                id="nombre"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                defaultValue={selectTratamiento.nombre}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="precio">Precio:</label>
              <input
                {...register('precio')}
                id="precio"
                type="text"
                defaultValue={selectTratamiento.precio}
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

export default UpdateTratamiento;
