import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/RenderWithRouter';
import App from '../App';

const VALID_EMAIL = 'teste@teste.com';
const INVALID_EMAIL = 'emailinvalid';
const VALID_PASSWORD = 'awsd123';
const INVALID_PASSWORD = 'a1';

const components = () => ({
  inputEmail: screen.getByTestId('email-input'),
  inputPassword: screen.getByTestId('password-input'),
  buttonSumbit: screen.getByTestId('login-submit-btn'),
});

describe('Testa a Tela de Login', () => {
  it('O botão deve estar desativado se o email e o password forem inválidos', () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSumbit } = components();
    userEvent.type(inputEmail, INVALID_EMAIL);
    userEvent.type(inputPassword, INVALID_PASSWORD);
    expect(buttonSumbit).toBeInTheDocument();
    expect(buttonSumbit.disabled).toBe(true);
  });

  it('Botão deve estar ativado com email e password válidos', () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSumbit } = components();
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    expect(buttonSumbit).toBeInTheDocument();
    expect(buttonSumbit.disabled).toBe(false);
  });

  it('Os tokens mealsToken e cocktailsToken devem estar salvos no localStorage', () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSumbit } = components();
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    userEvent.click(buttonSumbit);
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
  });

  it('A chave user deve estar salva no localStorage', () => {
    renderWithRouter(<App />);
    // verificar chave no localstorage - provavelmente mesmo it linha 37 e seguintes
  });

  it('Após clicar no botão deve redirecionar para a página de comidas',
    () => {
      renderWithRouter(<App />);
      // verficiar se títula esta na "screem"
    });
});
