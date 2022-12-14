import './login.scss';
import React, { useState } from 'react';
import submit from '../../../images/enter.svg'
import help from '../../../images/help.svg'
import register from '../../../images/register.svg'
import { useApi } from '../../../hooks/api';
import { Link, useHistory } from 'react-router-dom';
import { ModalBox } from '../ModalBox/modalBox';

export function LoginBox() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showModalFailed, setShowModalFailed] = useState(false);
	const history = useHistory();
	const api = useApi();

	async function createToken() {
		const response = await api.createToken(email, password);
		if (response && response.status === 200) {
      history.push('/home')
		} else {
      setShowModalFailed(true)
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

  function closeModal() {
		setShowModalFailed(false);
  }

	return (
    <>
			<ModalBox
        show={showModalFailed}
        handleClose={() => closeModal()}
        title='Tivemos um problema!'
        mainText='Tivemos um problema, tente novamente.'
				buttonText='Login não realizado'
				buttonClass='modal-main__button--danger'
      />
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
              <input type='email' placeholder='Clique aqui e digite seu e-mail.' className='login-wrapper__input' onChange={onChangeEmail}></input>
              <label className='login-wrapper__input-password'>Senha</label>
              <input type='password' placeholder='Digite sua senha aqui' className='login-wrapper__input' onChange={onChangePassword}></input>
            </div>
            <div className='login-submit'>
              <button className='login-submit__button' onClick={handleSubmit}>
                Entrar&nbsp;&nbsp;
                <img src={submit} />
              </button>

              <Link className='login-submit__button login-submit__button--reset link'  to='/reset' >
                Não lembro minha senha
                <img src={help} />
              </Link>
            </div>
          </div>
          <div className='login-wrapper__register'>
            <label className='login-wrapper__title'>Não tem cadastro? <br/> Clique no botão abaixo <br/> para se registrar.</label>
            <Link className='login-submit__button login-submit__button--register link' to={`/register`}>
              Registrar&nbsp;&nbsp;
              <img src={register}/>
            </Link>&nbsp;&nbsp;
            <label className='login-wrapper__title'>Não sabe usar o computador? Não sabe por onde começar?<br/> Clique no botão abaixo.</label>
            <Link className='login-submit__ajudinha login-submit__ajudinha--register link' to={`/help-initial`}>
              Ajuda&nbsp;&nbsp;
            </Link>
          </div>
        </div>
      </div>
    </>
	);
}
