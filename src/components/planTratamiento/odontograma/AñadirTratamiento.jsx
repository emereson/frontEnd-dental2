import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../consultasStyle/AñadirTratamiento.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../utils/getToken';

const AñadirTratamiento = ({
  selectDiente,
  setSelectDiente,
  setListaTratamientos,
  listaTratamientos,
}) => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [allTratamientos, setallTratamientos] = useState();
  const [dienteSeleccionado, setDienteSeleccionado] = useState(
    selectDiente?.codigoDiente
  );

  const [tratamientoSeleccionado, setTratamientoSeleccionado] =
    useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/tratamiento/consultorio/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        setallTratamientos(res.data.tratamientos);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    setTratamientoSeleccionado(
      listaTratamientos.find(
        (item) => Number(item.codigoDiente) === dienteSeleccionado
      )?.tratamiento
    );
    setPrecio(
      listaTratamientos.find(
        (item) => Number(item.codigoDiente) === dienteSeleccionado
      )?.precio
    );
  }, [dienteSeleccionado]);

  console.log(listaTratamientos);
  const handleDienteChange = (e) => {
    const nuevoDiente = e.target.value;
    setDienteSeleccionado(nuevoDiente);
  };

  const handleTratamientoChange = (e) => {
    const nuevoTratamiento = e.target.value;
    setTratamientoSeleccionado(nuevoTratamiento);

    setPrecio(
      allTratamientos?.find(
        (item) => item.nombre === nuevoTratamiento
      )?.precio
    );
  };

  const handleprecioChange = (e) => {
    const precio = e.target.value;
    setPrecio(precio);
  };

  const submit = (data) => {
    const updatedList = listaTratamientos.map((item) => {
      if (item.codigoDiente === data.codigoDiente) {
        return data;
      }
      return item;
    });
    if (
      !updatedList.some(
        (item) => item.codigoDiente === data.codigoDiente
      )
    ) {
      updatedList.push({ ...data, precio });
    }
    setListaTratamientos(updatedList);
    setSelectDiente();
  };
  const eliminar = () => {
    const nuevoListaTratamientos = listaTratamientos.filter(
      (item) => Number(item.codigoDiente) !== dienteSeleccionado
    );

    setListaTratamientos(nuevoListaTratamientos);
    setSelectDiente();
  };

  return (
    <div
      className={`AñadirTratamiento__container ${
        selectDiente ? '' : 'AñadirTratamiento__closeContainer'
      }`}
    >
      <form
        className="AñadirTratamiento__form"
        onSubmit={handleSubmit(submit)}
      >
        <h2>Añadir Tratamiento</h2>
        <section className="AñadirTratamientoForm__sectionOne">
          <div className="AñadirTratamientoForm__div">
            <label htmlFor="codigoDiente">Seleccione diente</label>
            <select
              {...register('codigoDiente')}
              id="codigoDiente"
              value={dienteSeleccionado}
              onChange={handleDienteChange}
              required
            >
              <option value={selectDiente.codigoDiente}>
                {selectDiente.codigoDiente}
              </option>
            </select>
          </div>
          <div className="AñadirTratamientoForm__div">
            <label htmlFor="tratamiento">
              Selecciona Tratamiento:
            </label>
            <select
              id="tratamiento"
              type="text"
              value={tratamientoSeleccionado}
              {...register('tratamiento')}
              onChange={handleTratamientoChange}
              required
            >
              <option value=""></option>
              {allTratamientos?.map((tratamiento, index) => (
                <option key={index} value={tratamiento.nombre}>
                  {tratamiento.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="AñadirTratamientoForm__div">
            <label htmlFor="precio">Precio:</label>
            <input
              id="precio"
              type="number"
              value={precio}
              onChange={handleprecioChange}
              required
            />
          </div>
        </section>
        <section className="AñadirTratamientoForm__sectionTwo">
          {listaTratamientos.find(
            (item) => Number(item.codigoDiente) === dienteSeleccionado
          ) ? (
            <button type="button" onClick={eliminar}>
              Eliminar
            </button>
          ) : null}
          <button type="button" onClick={() => setSelectDiente()}>
            Cancelar
          </button>
          <button type="submit">Añadir</button>
        </section>
      </form>
    </div>
  );
};

export default AñadirTratamiento;
