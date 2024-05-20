import React, { useEffect, useState } from 'react';
import './pagesStyle/users.css';
import axios from 'axios';
import config from '../utils/getToken';
import { useParams } from 'react-router-dom';
import CreateTipoSangre from '../components/tiposSangre/CreateTipoSangre';
import TableTipoSangre from '../components/tiposSangre/TableTipoSangre';
import UpdateTipoSangre from '../components/tiposSangre/UpdateTipoSangre';
import DeleteTipoSangre from '../components/tiposSangre/DeleteTipoSangre';

const TiposSangre = () => {
  const { id } = useParams();

  const [crud, setCrud] = useState('');
  const [allTratamientos, setallTratamientos] = useState();
  const [selectTratamiento, setSelectTratamiento] = useState();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/tipo-sangre/consultorio/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        setallTratamientos(res.data.tiposSangre);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [crud]);

  return (
    <div className="users__container">
      <section className="users__sectionOne">
        <h1>Tipos de Sangre</h1>
      </section>
      <section className="users__sectionTwo">
        <h2>Tus tipos de sangre</h2>
        <button onClick={() => setCrud('createUser')}>
          Nuevo tipo de sangre
        </button>
      </section>
      <TableTipoSangre
        allTratamientos={allTratamientos}
        setSelectTratamiento={setSelectTratamiento}
        setCrud={setCrud}
      />
      <CreateTipoSangre setCrud={setCrud} crud={crud} id={id} />

      <UpdateTipoSangre
        setCrud={setCrud}
        crud={crud}
        selectTratamiento={selectTratamiento}
        setSelectTratamiento={setSelectTratamiento}
      />
      <DeleteTipoSangre
        setCrud={setCrud}
        crud={crud}
        selectTratamiento={selectTratamiento}
      />
    </div>
  );
};

export default TiposSangre;
