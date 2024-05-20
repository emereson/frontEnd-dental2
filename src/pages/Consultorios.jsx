import React, { useEffect, useState } from 'react';
import './pagesStyle/consultorios.css';
import TablaConsultorios from '../components/consultorios/TablaConsultorios';
import axios from 'axios';
import config from '../utils/getToken';
import CrearConsultorio from '../components/consultorios/CrearConsultorio';
import EditarConsultorio from '../components/consultorios/EditarConsultorio';
import EliminarConsultorio from '../components/consultorios/EliminarConsultorio';
const Consultorios = () => {
  const [crud, setCrud] = useState('');
  const [allConsultorios, setallConsultorios] = useState();
  const [selectConsultorio, setSelectConsultorio] = useState();

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
  }, [crud]);

  console.log(crud);
  return (
    <div className="consultorios__container">
      <section className="consultorio__sectionOne">
        <h1>Consultorios</h1>
      </section>
      <section className="consultorio__sectionTwo">
        <h2>Tus Consultorios</h2>
        <button onClick={() => setCrud('create')}>
          Nuevo Consultorio
        </button>
      </section>
      <TablaConsultorios
        allConsultorios={allConsultorios}
        setSelectConsultorio={setSelectConsultorio}
        setCrud={setCrud}
      />
      <CrearConsultorio setCrud={setCrud} crud={crud} />

      <EditarConsultorio
        setCrud={setCrud}
        crud={crud}
        selectConsultorio={selectConsultorio}
        setSelectConsultorio={setSelectConsultorio}
      />
      <EliminarConsultorio
        setCrud={setCrud}
        crud={crud}
        selectConsultorio={selectConsultorio}
      />
    </div>
  );
};

export default Consultorios;
