import React from 'react';
import '../../pages/pagesStyle/tables.css';
import { Link } from 'react-router-dom';

const TablaConsultorios = ({
  allConsultorios,
  setSelectConsultorio,
  setCrud,
}) => {
  console.log(allConsultorios);
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th>Nombre del Consultorio</th>
          <th>Direccion del Consultorio</th>
          <th>Telefono</th>
          <th>Ubicacion</th>
          <th>Ver Consultorio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {allConsultorios?.map((consultorios) => (
          <tr key={consultorios.id}>
            <td>{consultorios.nombreConsultorio}</td>
            <td>{consultorios.direccion}</td>
            <td>{consultorios.telefono}</td>
            <td>
              <a
                href={consultorios.linkGoogleMaps}
                target="_blank"
                rel="noopener noreferrer"
              >
                ver en mapa
              </a>
            </td>

            <td>
              {' '}
              <Link to={`/consultorio/${consultorios.id}/inicio`}>
                Ver{' '}
              </Link>
            </td>

            <td className="tablle__tdButton">
              <button
                className="edit-button"
                onClick={() => {
                  setSelectConsultorio(consultorios);
                  setCrud('update');
                }}
              >
                <i className="bx bxs-edit-alt"></i>
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  setSelectConsultorio(consultorios);
                  setCrud('delete');
                }}
              >
                <i className="bx bxs-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaConsultorios;
