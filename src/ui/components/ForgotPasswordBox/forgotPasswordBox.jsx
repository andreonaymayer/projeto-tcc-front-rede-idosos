import './forgotPassword.scss';
import React, { useState } from 'react';
import back from '../../../images/back.svg'
import { Link, useHistory } from 'react-router-dom';
import { useApi } from '../../../hooks/api';

export function ForgotPassword() {
	const [email, setEmail] = useState('');
	const history = useHistory();
	const api = useApi();

  async function resetPassword() {
		const response = await api.resetPassword(email);
		if (response && response.status === 200) {
			console.log(response)
		} else {
			console.log("deu ruim")
		}
	}

  function handleSubmit() {
    resetPassword()
  }

	function onChangeEmail(event) {
		setEmail(event.target.value);
	}

	return (
		<div className='forgotPassword-container'>
      <div className='forgotPassword-container__welcome'>
        <h1 className='forgotPassword-title'>Esqueceu a senha?</h1>
        <h2 className='forgotPassword-subtitle'>
          Tudo bem, isso acontece mesmo. Digite nos campos abaixo algumas <br/>
          informações para recuperarmos sua senha.
        </h2>
      </div>
      <div className='forgotPassword-wrapper'>
        <div className='forgotPassword-wrapper__enter'>
          <h2 className='login-wrapper__title'>Identificação</h2>
          <br/>
          <div className='forgotPassword-wrapper__layout'>
            <div className='forgotPassword-wrapper__inputs'>
              <label className='forgotPassword-wrapper__input-password'>Email</label>
              <input type='email' placeholder='Exemplo: seunome@exemplo.com' className='forgotPassword-wrapper__input' onChange={onChangeEmail}></input>
            </div>
          </div>
          <div className='forgotPassword-wrapper__layout'>
            <button className='forgotPassword-submit__button' onClick={handleSubmit}>
              Recuperar senha
            </button>

            <Link to='/' className='forgotPassword-submit__button forgotPassword-submit__button--reset link'>
              Voltar para a identificação&nbsp;&nbsp;
              <img src={back} />
            </Link>
          </div>
        </div>
      </div>
    </div>
	);
}
