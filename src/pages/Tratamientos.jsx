import React, { useEffect, useState } from 'react';
import './pagesStyle/users.css';
import axios from 'axios';
import config from '../utils/getToken';
import { useParams } from 'react-router-dom';
import CreateTratamiento from '../components/tratamientos/CreateTratamiento';
import TableTratamientos from '../components/tratamientos/TableTratamientos';
import UpdateTratamiento from '../components/tratamientos/UpdateTratamiento';
import DeleteTratamiento from '../components/tratamientos/DeleteTratamiento';

const Tratamientos = () => {
  const { id } = useParams();

  const [crud, setCrud] = useState('');
  const [allTratamientos, setallTratamientos] = useState();
  const [selectTratamiento, setSelectTratamiento] = useState();

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
  }, [crud]);

  return (
    <div className="users__container">
      <section className="users__sectionOne">
        <h1>Tratamientos</h1>
      </section>
      <section className="users__sectionTwo">
        <h2>Tus Tratamientos</h2>
        <button onClick={() => setCrud('createUser')}>
          Nuevo Tratamiento
        </button>
      </section>
      <TableTratamientos
        allTratamientos={allTratamientos}
        setSelectTratamiento={setSelectTratamiento}
        setCrud={setCrud}
      />
      <CreateTratamiento setCrud={setCrud} crud={crud} id={id} />

      <UpdateTratamiento
        setCrud={setCrud}
        crud={crud}
        selectTratamiento={selectTratamiento}
        setSelectTratamiento={setSelectTratamiento}
      />
      <DeleteTratamiento
        setCrud={setCrud}
        crud={crud}
        selectTratamiento={selectTratamiento}
      />
    </div>
  );
};

export default Tratamientos;
