import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';

const UpdateUser = ({ crud, setCrud, selectUser, setSelectUser }) => {
  const { register, handleSubmit, reset } = useForm();
  const [allConsultorios, setallConsultorios] = useState();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/usuario/${
      selectUser?.id
    }`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setCrud('');
        setSelectUser();
        toast.success(
          'Los datos del usuario  se actualizo exitosamente'
        );
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
      });
    reset();
  };

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/consultorio`;
    axios
      .get(url, config)
      .then((res) => {
        setallConsultorios(res.data.consultorios);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <h3> Usuario {selectUser?.nombres}</h3>
        {crud === 'updateUser' ? (
          <section className="crud__sectionOne">
            <div className="crud__div">
              <label htmlFor="consultorioId">
                Seleccione Un Consultorio:
              </label>
              <select
                {...register('consultorioId')}
                id="consultorioId"
                type="text"
              >
                {allConsultorios.map((consultorio) => (
                  <option key={consultorio.id} value={consultorio.id}>
                    {consultorio.nombreConsultorio}
                  </option>
                ))}
              </select>
            </div>
            <div className="crud__div">
              <label htmlFor="nombres">Nombres:</label>
              <input
                {...register('nombres')}
                id="nombres"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                defaultValue={selectUser.nombres}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="apellidos">Apellidos:</label>
              <input
                {...register('apellidos')}
                id="apellidos"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                defaultValue={selectUser?.apellidos}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="email">Correo:</label>
              <input
                {...register('email')}
                id="email"
                type="text"
                defaultValue={selectUser?.email}
                required
              />
            </div>
            <div className="crud__div">
              <label htmlFor="telefono">telefono:</label>
              <input
                {...register('telefono')}
                id="telefono"
                type="number"
                defaultValue={selectUser?.telefono}
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
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="Administrador">Administrador</option>
                <option value="Doctor">Doctor</option>
                <option value="Secretaria">Secretaria</option>
              </select>
            </div>
            {selectUser.estado === 'Desconectado' && (
              <div className="crud__div">
                <label htmlFor="estado">Estado:</label>
                <select
                  {...register('estado')}
                  id="estado"
                  defaultValue={selectUser.estado}
                  required
                >
                  <option value="Activo">Activo</option>
                  <option value="Desconectado">Desconectado</option>
                </select>
              </div>
            )}
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button
            type="button"
            onClick={() => {
              setCrud(''), setSelectUser(), reset();
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

export default UpdateUser;
