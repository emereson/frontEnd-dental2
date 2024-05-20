import React from 'react';
import '../../pages/pagesStyle/tables.css';

const TableTipoSangre = ({
  allTratamientos,
  setSelectTratamiento,
  setCrud,
}) => {
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th>Nombre del tipo de sangre</th>
          <th>acciones</th>
        </tr>
      </thead>
      <tbody>
        {allTratamientos?.map((tratamiento) => (
          <tr key={tratamiento.id}>
            <td>{tratamiento.nombre}</td>

            <td className="tablle__tdButton">
              <button
                className="edit-button"
                onClick={() => {
                  setSelectTratamiento(tratamiento);
                  setCrud('updateUser');
                }}
              >
                <i className="bx bxs-edit-alt"></i>
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  setSelectTratamiento(tratamiento);
                  setCrud('deleteUser');
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

export default TableTipoSangre;
