import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../utils/getToken';
import './consultasStyle/crearConsulta.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const CrearConsulta = ({
  crud,
  setCrud,
  selectPaciente,
  setSelectDiente,
  listaTratamientos,
  setListaTratamientos,
  setVerPacientes,
  setVerOdontograma,
}) => {
  const { id } = useParams();

  const { register, handleSubmit, reset } = useForm();
  const [selectedFileImg, setSelectedFileImg] = useState(null);

  console.log(selectedFileImg);
  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/plan-tratamiento/${
      selectPaciente.id
    }`;

    const formData = new FormData();
    formData.append('linkFile', selectedFileImg);

    // Agregar otros datos al FormData
    formData.append('data', JSON.stringify(data));
    formData.append(
      'tratamientosDental',
      JSON.stringify(listaTratamientos)
    );
    formData.append('consultorioId', id);

    axios
      .post(url, formData, config)
      .then((res) => {
        setListaTratamientos([]);
        setCrud('');
        setSelectDiente();
        setVerPacientes(false);
        setSelectedFileImg();
        setVerOdontograma(false);
        toast.success('El tratamiento  se creo exitosamente');
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
  const montoTotal = () => {
    let total = 0;

    total = listaTratamientos?.reduce(
      (acc, tratamiento) => acc + Number(tratamiento.precio),
      0
    );

    return total;
  };

  return (
    <div
      className={`AñadirTratamiento__container ${
        crud ? 'crearConsulta' : 'AñadirTratamiento__closeContainer'
      }`}
    >
      <form
        className="crearConsulta_form"
        onSubmit={handleSubmit(submit)}
      >
        <h3>
          Guardar el tratamiento para el Paciente{' '}
          {selectPaciente?.nombres} {selectPaciente?.apellidoPaterno}
        </h3>
        {crud === 'crearConsulta' ? (
          <section className="crearConsulta__sectionOne ">
            <div className="crearConsultaForm__div">
              <label htmlFor="titulo">Titulo:</label>
              <input
                {...register('titulo')}
                id="titulo"
                type="text"
                onKeyPress={soloLetrasYEspacios}
                required
              />
            </div>
            <div className="crearConsultaForm__div">
              <label htmlFor="observaciones">Observaciones:</label>
              <textarea
                {...register('observaciones')}
                id="observaciones"
                onKeyPress={soloLetrasYEspacios}
                rows={4}
                required
              />
            </div>
            <div className="crearConsultaForm__div">
              <label htmlFor="montoTotal">Precio Total:</label>
              <input
                {...register('montoTotal')}
                id="montoTotal"
                type="number"
                value={montoTotal()}
                required
              />
            </div>
            <div className="crearConsultaForm__div">
              <label htmlFor="acuenta">Acuenta:</label>
              <input
                {...register('acuenta')}
                id="acuenta"
                type="number"
                required
              />
            </div>
            <div className="crearConsultaForm__div">
              <label htmlFor="linkFile">Subir documento :</label>
              <input
                {...register('linkFile')}
                name="linkFile"
                id="linkFile"
                onChange={(e) =>
                  setSelectedFileImg(e.target.files[0])
                }
                type="file"
              />
            </div>
          </section>
        ) : null}
        <section className="crud__sectionTwo">
          <button type="button" onClick={() => setCrud('')}>
            Cancelar
          </button>

          <button type="submit" className="crud__button">
            Crear Tratamiento
          </button>
        </section>
      </form>
    </div>
  );
};

export default CrearConsulta;
