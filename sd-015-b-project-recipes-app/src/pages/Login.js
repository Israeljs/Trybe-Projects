import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppRecipesContext from '../context/AppRecipesContext';

function Login({ history }) {
  const { email, setEmail } = useContext(AppRecipesContext);
  const [password, setPassword] = useState('');
  // const [isDisabled, setIsDisabled] = useState(true);

  function validateEmail() {
    // ^[a-z]+@[a-z]+\.[a-z]+$/;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  function validatePassword() {
    const noMagicNumberPassword = 7;
    if (password.length >= noMagicNumberPassword) {
      return password;
    }
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }
  return (
    <form className="loginContent">
      <h1>App de Receitas</h1>
      <input
        data-testid="email-input"
        placeholder="Email"
        onChange={ (event) => setEmail(event.target.value) }
        name="email"
        value={ email }
        type="text"
      />
      <input
        data-testid="password-input"
        placeholder="Senha"
        onChange={ (event) => setPassword(event.target.value) }
        name="password"
        value={ password }
        type="password"
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !(validateEmail() && validatePassword()) }
        onClick={ handleClick }
      >
        <p>Entrar</p>
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
