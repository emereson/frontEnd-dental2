import React, { useEffect, useState } from 'react';
import './pagesStyle/users.css';
import axios from 'axios';
import TableUsers from '../components/users/TableUsers';
import CreateUser from '../components/users/CreateUser';
import UpdateUser from '../components/users/UpdateUser';
import DeleteUser from '../components/users/DeleteUser';
import config from '../utils/getToken';
import { useParams } from 'react-router-dom';
import UpdatePassword from '../components/users/UpdatePassword';

const Users = () => {
  const { id } = useParams();
  const [crud, setCrud] = useState('');
  const [allUsers, setallUsers] = useState();
  const [selectUser, setSelectUser] = useState();

  useEffect(() => {
    let url;
    if (id) {
      url = `${
        import.meta.env.VITE_URL_API
      }/usuario/consultorio/${id}`;
    } else {
      url = `${import.meta.env.VITE_URL_API}/usuario`;
    }

    axios
      .get(url, config)
      .then((res) => {
        setallUsers(res.data.usuarios);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, crud]); // Asegúrate de incluir consultorioId en la lista de dependencias si lo estás utilizando dentro del useEffect

  return (
    <div className="users__container">
      <section className="users__sectionOne">
        <h1> Usuarios</h1>
      </section>
      <section className="users__sectionTwo">
        <h2>Tus Usuarios</h2>
        <button onClick={() => setCrud('createUser')}>
          Nuevo Usuario
        </button>
      </section>
      <TableUsers
        allUsers={allUsers}
        setSelectUser={setSelectUser}
        setCrud={setCrud}
      />
      <CreateUser setCrud={setCrud} crud={crud} />

      <UpdateUser
        setCrud={setCrud}
        crud={crud}
        selectUser={selectUser}
        setSelectUser={setSelectUser}
      />
      <DeleteUser
        setCrud={setCrud}
        crud={crud}
        selectUser={selectUser}
      />
      {crud === 'updatePassword' && (
        <UpdatePassword selectUser={selectUser} setCrud={setCrud} />
      )}
    </div>
  );
};

export default Users;
