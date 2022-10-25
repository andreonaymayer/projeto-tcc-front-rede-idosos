import './login.scss';
import React, { useState } from 'react';
import submit from '../../../images/enter.svg'
import help from '../../../images/help.svg'
import register from '../../../images/register.svg'
import { useApi } from '../../../hooks/api';
import { Link, useHistory } from 'react-router-dom';

export function LoginBox() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const api = useApi();

	async function createToken() {
		const response = await api.createToken(email, password);
		if (response && response.status === 200) {
      history.push('/home')
		} else {
			console.log('deu ruim')
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		createToken();
	}

	function onChangeEmail(event) {
		setEmail(event.target.value);
	}

	function onChangePassword(event) {
		setPassword(event.target.value);
	}

	return (
		<div className='login-container'>
      <div className='login-container__welcome'>
        <h1 className='login-title'>Bem-vindo ao Rede idosos!</h1>
        <h2 className='login-subtitle'>Identifique-se e entre, ou registre-se caso ainda não tenha um cadastro</h2>
      </div>
      <div className='login-wrapper'>
        <div className='login-wrapper__enter'>
          <h2 className='login-wrapper__title'>Identificação</h2>
          <br/>
          <div className='login-wrapper__inputs'>
            <label className='login-wrapper__input-mail'>E-mail</label>
            <input type='email' placeholder='Exemplo: seunome@exemplo.com' className='login-wrapper__input' onChange={onChangeEmail}></input>
            <label className='login-wrapper__input-password'>Senha</label>
            <input type='password' placeholder='Exemplo: @!MinhaS3nha*' className='login-wrapper__input' onChange={onChangePassword}></input>
          </div>
          <div className='login-submit'>
            <button className='login-submit__button' onClick={handleSubmit}>
              Entrar&nbsp;&nbsp;
              <img src={submit} />
            </button>

            <Link className='login-submit__button login-submit__button--reset link' to='/reset'>
              Não lembro minha senha&nbsp;&nbsp;
              <img src={help} />
            </Link>
          </div>
        </div>
        <div className='login-wrapper__register'>
          <label className='login-wrapper__title'>Não tem cadastro? <br/> Clique no botão abaixo <br/> para se registrar.</label>
          <Link className='login-submit__button login-submit__button--register link' to={`/register`}>
            Registrar&nbsp;&nbsp;
            <img src={register} />
          </Link>
        </div>
      </div>
    </div>
	);
}
