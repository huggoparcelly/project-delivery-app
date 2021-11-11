import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';
import { setOnLocalStorage } from '../services/servicesLocalStorage';
import { loginService } from '../services/servicesLogin';

function Login() {
  const [disableBtn, setDisableBtn] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const validateFields = ({ email, password }) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordLength = password.length;
    const minPassword = 5;
    if ((regex.test(email)) && (passwordLength > minPassword)) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const history = useHistory();
  const handleClick = async () => {
    const checkLogin = await loginService(login);
    if (checkLogin.message.id) {
      const { message } = checkLogin;
      setOnLocalStorage('login', message);
      history.push('/bebidas');
      console.log('dentro');
    }
    setHidden(false);
    console.log('fora');// logica para estourar o erro do login
  };

  useEffect(() => {
    validateFields(login);
  }, [login]);
  return (
    <div>
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <label htmlFor="email-input">
        <input
          id="email-input"
          className="email-input"
          type="email"
          name="email"
          data-testid="common_login__input-email"
          placeholder="Email"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password-input">
        <input
          id="password-input"
          className="password-input"
          type="password"
          name="password"
          data-testid="common_login__input-password"
          placeholder="Senha"
          onChange={ handleChange }
        />
      </label>
      <div className="loginButton">
        <button
          className="loginButton"
          type="button"
          data-testid="common_login__button-login"
          disabled={ disableBtn }
          onClick={ handleClick }
        >
          Entrar/Logar
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="common_login__button-register"
          disabled={ disableBtn }
        >
          Registrar novo usuario
        </button>
      </div>
      <h2
        data-testid="common_login__element-invalid-email"
        hidden={ hidden }
      >
        Email ou Senha invalidos
      </h2>
    </div>
  );
}

export default Login;
