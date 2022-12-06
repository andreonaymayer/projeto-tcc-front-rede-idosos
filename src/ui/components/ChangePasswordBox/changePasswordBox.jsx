import './changePassword.scss';
import React, { useState } from 'react';
import back from '../../../images/back.svg'
import { Link } from 'react-router-dom';
import { useApi } from '../../../hooks/api';
import { ModalBox } from '../index';

export function ChangePasswordBox() {
	const [actualPassword, setActualPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [showModalSuccess, setShowModalSuccess] = useState(false);
	const [showModalFailed, setShowModalFailed] = useState(false);
	const api = useApi();

  async function changePassword() {
		const response = await api.changePassword(newPassword, actualPassword);
		if (response && response.status === 200) {
      setShowModalSuccess(true)
		} else {
      setShowModalFailed(true)
		}
	}

  function handleSubmit() {
    changePassword()
  }

	function onChangeActualPassword(event) {
		setActualPassword(event.target.value);
	}

  function onChangeNewPassword(event) {
		setNewPassword(event.target.value);
	}

  function closeModal() {
		setShowModalSuccess(false);
		setShowModalFailed(false);
	}

	return (
    <>
      <ModalBox
        show={showModalSuccess}
        handleClose={() => closeModal()}
        title='Senha alterada!'
        mainText='A sua senha foi alterada com sucesso'
				buttonText='Senha alterada'
				buttonClass='modal-main__button--success'
      />
			<ModalBox
        show={showModalFailed}
        handleClose={() => closeModal()}
        title='Tivemos um problema!'
        mainText='Tivemos um problema, tente novamente.'
				buttonText='Cadastro não realizado!'
				buttonClass='modal-main__button--danger'
      />
      <div className='changePassword-container'>
        <div className='changePassword-container__welcome'>
          <h1 className='changePassword-title'>Alterar senha</h1>
          <h2 className='changePassword-subtitle'>
            Digite sua senha atual e sua nova senha.
          </h2>
        </div>
        <div className='changePassword-wrapper'>
          <div className='changePassword-wrapper__enter'>
            <h2 className='login-wrapper__title'>Senha</h2>
            <br/>
            <div className='changePassword-wrapper__layout'>
              <div className='changePassword-wrapper__inputs'>
                <label className='changePassword-wrapper__input-password'>Senha atual</label>
                <input type='Password' placeholder='Exemplo: seunome@exemplo.com' className='changePassword-wrapper__input' onChange={onChangeActualPassword}></input>
                <label className='changePassword-wrapper__input-password'>Nova senha</label>
                <input type='Password' placeholder='Exemplo: seunome@exemplo.com' className='changePassword-wrapper__input' onChange={onChangeNewPassword}></input>
              </div>
            </div>
            <div className='changePassword-wrapper__layout'>
              <button className='changePassword-submit__button' onClick={handleSubmit}>
                Atualizar senha
              </button>

              <Link to='/home' className='changePassword-submit__button changePassword-submit__button--reset link'>
                Não desejo mudar nada&nbsp;&nbsp;
                <img src={back} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
	);
}
