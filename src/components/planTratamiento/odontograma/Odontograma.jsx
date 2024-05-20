import React, { useEffect, useRef, useState } from 'react';
import AñadirTratamiento from './AñadirTratamiento';
import Maxilar from './Maxilar';
import Mandibular from './Mandibular';
import '../consultasStyle/odontograma.css';
import CrearConsulta from '../CrearConsulta';
import textDocument from '../../../assets/texto';

const Odontograma = ({
  crud,
  verOdontograma,
  setVerOdontograma,
  setCrud,
  selectPaciente,
  setVerPacientes,
}) => {
  const [selectDiente, setSelectDiente] = useState();
  const [listaTratamientos, setListaTratamientos] = useState([]);
  const textAreaRef = useRef(null);

  function startRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error(
        'Speech recognition not supported in this browser.'
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'es-ES';
    recognition.interimResults = false;

    const textArea = textAreaRef.current;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;
      textArea.value = transcript;

      // Normaliza el texto
      const normalizedTranscript = transcript.trim().toLowerCase();
      const normalizedDocument = textDocument.toLowerCase();

      if (normalizedDocument.includes(normalizedTranscript)) {
        alert(`El texto:${transcript}, si existe en el documento`);
      } else {
        alert(`El texto:${transcript},no  existe en el documento`);
      }
    };

    recognition.start();
  }

  function stopRecognition() {
    window.speechSynthesis.cancel();
  }

  return (
    <div
      className={`odontograma__container ${
        verOdontograma ? '' : 'odontograma__closeContainer'
      }`}
    >
      {verOdontograma ? (
        <section className="odontograma__sectionOne">
          <article className="odontograma__sectionOne__article">
            <h2>ODONTOGRAMA DENTAL</h2>
            <p>Seleccione un Diente</p>
          </article>
          <div className="odontograma__sectionOne__div">
            <Maxilar
              setSelectDiente={setSelectDiente}
              listaTratamientos={listaTratamientos}
              selectPaciente={selectPaciente}
            />
            <Mandibular
              setSelectDiente={setSelectDiente}
              listaTratamientos={listaTratamientos}
              selectPaciente={selectPaciente}
            />
          </div>
          <article className="odontograma__sectionOne__buttons">
            <button onClick={() => setVerOdontograma(false)}>
              Atras
            </button>
            <button onClick={() => setCrud('crearConsulta')}>
              Continuar
            </button>
          </article>
        </section>
      ) : null}
      {selectDiente ? (
        <AñadirTratamiento
          selectPaciente={selectPaciente}
          selectDiente={selectDiente}
          setSelectDiente={setSelectDiente}
          setListaTratamientos={setListaTratamientos}
          listaTratamientos={listaTratamientos}
        />
      ) : (
        ''
      )}
      <CrearConsulta
        setCrud={setCrud}
        crud={crud}
        selectPaciente={selectPaciente}
        setSelectDiente={setSelectDiente}
        listaTratamientos={listaTratamientos}
        setVerPacientes={setVerPacientes}
        setListaTratamientos={setListaTratamientos}
        setVerOdontograma={setVerOdontograma}
      />
      <section className="sectionvoz">
        <button onClick={startRecognition} id="btnStart">
          COMENZAR
        </button>
        <button onClick={stopRecognition} id="btnStop">
          DETENER
        </button>
        <textarea
          id="textArea"
          cols="30"
          rows="10"
          ref={textAreaRef}
        ></textarea>
      </section>
    </div>
  );
};

export default Odontograma;
