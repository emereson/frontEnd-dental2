import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../utils/getToken';

const EditarCitaLinea = ({
  crud,
  setCrud,
  selectCita,
  setSelectCita,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/cita-linea/${
      selectCita?.id
    }`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setCrud('');
        setSelectCita();
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
        crud === 'updateCitaLinea' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>
          CONFIRMAR EL ESTADO DE LA CITA DE{' '}
          {selectCita?.nombresApellidos}
        </h3>
        <i
          class="bx bxs-x-circle"
          onClick={() => {
            setCrud(''), setSelectCita();
            reset();
          }}
        ></i>
        {crud === 'updateCitaLinea' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="estado">seleccione una opcion:</label>
              <select
                {...register('estado')}
                id="estado"
                type="text"
                defaultValue={selectCita.estado}
                required
              >
                <option value="activo">Confirmar</option>
                <option value="inactivo">Cancelar</option>
              </select>
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button type="submit" className="crud__button">
            guardar
          </button>
        </section>
      </form>
    </div>
  );
};

export default EditarCitaLinea;
