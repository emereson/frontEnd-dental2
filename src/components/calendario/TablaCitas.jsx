import React from 'react';

const TablaCitas = ({ allCitas, setSelectCita, setCrud, crud }) => {
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th>Cita</th>
          <th>Descripcion</th>
          <th style={{ width: '150px' }}>fecha</th>
          <th style={{ width: '100px' }}>Estado</th>
          <th style={{ width: '100px' }}>Editar</th>
          <th style={{ width: '100px' }}>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {allCitas?.map((cita) => (
          <tr key={cita.id}>
            <td>{cita.titulo}</td>
            <td>{cita.descripcion}</td>
            <td>{cita.fecha}</td>
            <td>{cita.estado}</td>
            <td
              onClick={() => {
                setSelectCita(cita);
                setCrud('editarCita');
              }}
            >
              editar
            </td>
            <td
              onClick={() => {
                setSelectCita(cita);
                setCrud('eliminarCita');
              }}
            >
              eliminar
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaCitas;
