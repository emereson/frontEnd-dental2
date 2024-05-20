import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './pagesStyle/login.css';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/usuario/login`;

    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data.usuario.consultorioId);
        localStorage.setItem('token', res.data.token);
        const userDataJSON = JSON.stringify(res.data);
        localStorage.setItem('userData', userDataJSON);

        if (res.data.usuario.consultorioId) {
          navigate(
            `/consultorio/${res.data.usuario.consultorioId}/inicio`
          );
          window.location.reload();
        } else {
          navigate('/');
          window.location.reload();
        }
      })

      .catch((err) => {
        console.log(err);
      });

    reset();
  };

  return (
    <div className="longin__container">
      <form className="login__form" onSubmit={handleSubmit(submit)}>
        <img src="/logo.png" alt="" />
        <h1>INICIAR SESION</h1>
        <div className="login__div">
          <label htmlFor="email">CORREO:</label>
          <input
            {...register('email')}
            id="email"
            type="text"
            required
          />
        </div>
        <div className="login__div">
          <label htmlFor="contraseña">CONTRASEÑA:</label>
          <input
            {...register('contraseña')}
            id="contraseña"
            type="password"
            required
          />
        </div>
        <button>iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
