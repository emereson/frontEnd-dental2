import React from 'react';
import '../../pages/pagesStyle/tables.css';

const TableUsers = ({ allUsers, setSelectUser, setCrud }) => {
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th>Consultorio</th>
          <th>Rol</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {allUsers?.map((user) => (
          <tr key={user.id}>
            <td>{user.nombres}</td>
            <td>{user.apellidos}</td>
            <td>{user.email}</td>
            <td>{user.telefono}</td>
            <td>{user?.consultorio?.nombreConsultorio}</td>
            <td>{user.rol}</td>
            <td>{user.estado}</td>
            <td className="tablle__tdButton">
              <button
                className="edit-button"
                onClick={() => {
                  setSelectUser(user);
                  setCrud('updateUser');
                }}
              >
                <i className="bx bxs-edit-alt"></i>
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  setSelectUser(user);
                  setCrud('deleteUser');
                }}
              >
                <i className="bx bxs-trash"></i>
              </button>
              <button
                className="edit-button"
                style={{ backgroundColor: 'black' }}
                onClick={() => {
                  setSelectUser(user);
                  setCrud('updatePassword');
                }}
              >
                <i class="bx bxs-lock-open-alt"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableUsers;
