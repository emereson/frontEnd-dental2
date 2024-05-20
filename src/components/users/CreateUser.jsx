import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../pages/pagesStyle/crud.css';
import soloLetrasYEspacios from '../../hooks/LetrasYespacios';
import config from '../../utils/getToken';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const CreateUser = ({ crud, setCrud }) => {
  const { id } = useParams();

  const { register, handleSubmit, reset } = useForm();
  const [allConsultorios, setallConsultorios] = useState();

  const submit = (data) => {
    let url;
    if (id) {
      url = `${import.meta.env.VITE_URL_API}/usuario/signup/${id}`;
    } else {
      url = `${import.meta.env.VITE_URL_API}/usuario/signup/${
        data.consultorioId || 0
      }`;
    }

    axios
      .post(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('El usuario se creó exitosamente');
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
        toast.error(
          'Hubo un herror, ya existe un administrador para este consultorio'
        );
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

  console.log(allConsultorios);

  return (
    <div
      className={`crud__container  ${
        crud === 'createUser' ? '' : 'closeCrud__container'
      }`}
    >
      <form className="crud__form" onSubmit={handleSubmit(submit)}>
        <h3>Nuevo Usuario</h3>
        {crud === 'createUser' ? (
          <section className="crud__sectionOne">
            {' '}
            {!id && (
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
                    <option
                      value={consultorio.id}
                      key={consultorio.id}
                    >
                      {consultorio.nombreConsultorio}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="crud__div">
              <label htmlFor="nombres">Nombres:</label>
              <input
                {...register('nombres')}
                id="nombres"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                }}
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
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                }}
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
              <label htmlFor="contraseña">Carnet de Identidad:</label>
              <input
                {...register('contraseña')}
                id="contraseña"
                type="number"
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
                {!id && (
                  <option value="SuperAdmin">SuperAdmin</option>
                )}
                <option value="Administrador">Administrador</option>
                <option value="Doctor">Doctor</option>
                <option value="Secretaria">Secretaria</option>
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

export default CreateUser;
