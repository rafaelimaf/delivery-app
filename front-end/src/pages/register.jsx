import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;
const HTTP_CREATED = 201;
const HTTP_CONFLICT = 409;

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    function validateUserPayload() {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const emailValidation = email.match(emailRegex);
      const passwordValidation = password.length >= MIN_PASSWORD_LENGTH;
      const nameLengthValidation = userName.length >= MIN_NAME_LENGTH;

      if (emailValidation && passwordValidation && nameLengthValidation) {
        return setIsLoginBtnDisabled(false);
      } return setIsLoginBtnDisabled(true);
    } validateUserPayload();
  }, [email, password, userName]);

  const storageUserData = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const registerUser = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', { email, password, name: userName });

      if (response.status === HTTP_CREATED) {
        storageUserData(response.data);
        setIsLogged(true);
        setErrorMessage(false);
      }
    } catch (error) {
      if (error.response.status === HTTP_CONFLICT) {
        return setErrorMessage('usuário já está cadastrado');
      } return setErrorMessage(false);
    }
  };

  return (
    isLogged
      ? (<Navigate to="/customer/products" />)
      : (
        <form>
          <div>
            <input
              type="text"
              data-testid="common_register__input-name"
              placeholder="seu nome"
              onChange={ ({ target }) => setUserName(target.value) }
            />
            <input
              type="email"
              data-testid="common_register__input-email"
              placeholder="email@email.com"
              onChange={ ({ target }) => setEmail(target.value) }
            />
            <input
              type="password"
              data-testid="common_register__input-password"
              placeholder="**********"
              onChange={ ({ target }) => setPassword(target.value) }
            />
            <button
              type="button"
              data-testid="common_register__button-register"
              disabled={ isLoginBtnDisabled }
              onClick={ registerUser }
            >
              Cadastrar
            </button>
          </div>
          <p data-testid="common_register__element-invalid_register">
            {errorMessage}
          </p>
        </form>
      )
  );
}

export default Register;
