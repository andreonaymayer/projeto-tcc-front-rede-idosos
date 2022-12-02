import './register.scss';
import React, { useEffect, useState } from 'react';
import register from '../../../images/register.svg'
import back from '../../../images/back.svg'
import { Link, useHistory } from 'react-router-dom';
import { useApi } from '../../../hooks/api';
import { ModalBox } from '../index';

export function RegisterBox() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [state, setState] = useState('');
	const [details, setDetails] = useState('');
	const [states, setStates] = useState(0);
	const [city, setCity] = useState('');
	const [cities, setCities] = useState('');
	const [showModalSuccess, setShowModalSuccess] = useState(false);
	const [showModalFailed, setShowModalFailed] = useState(false);
	const history = useHistory();
	const api = useApi();

  async function showState() {
		const response = await api.showStates();
		if (response && response.status === 200) {
			setStates(response.data)
		}
	}

  async function showCity(stateId) {
		const response = await api.showCities(stateId);
		if (response && response.status === 200) {
			setCities(response.data)
		}
	}



	async function newUserRegister() {
		const response = await api.newUserRegister(
      birthDate,
      city,
      details,
      email,
      name,
      password
		);
		if (response && response.status === 200) {
			setShowModalSuccess(true)
		} else {
			setShowModalFailed(true)
		}
	}


	function handleSubmit(event) {
		event.preventDefault();
		newUserRegister();
	}

	function onChangeName(event) {
		setName(event.target.value);
	}

	function onChangePassword(event) {
		setPassword(event.target.value);
	}

	function onChangeEmail(event) {
		setEmail(event.target.value);
	}

  function onChangeState(event) {
    showState();
    showCity(event.target.value);
	}

  function onChangeDetails(event) {
		setDetails(event.target.value);
	}

  function onChangeCity(event) {
    setCity(event.target.value);
	}

	function onChangeBirthDate(event) {
		setBirthDate(event.target.value);
	}

	function closeModal(succeed) {
		setShowModalSuccess(false);
		setShowModalFailed(false);

    if (succeed) history.push('/')
	}

	return (
		<>
			<ModalBox
        show={showModalSuccess}
        handleClose={() => closeModal(true)}
        title='Cadastro realizado!'
        mainText='O seu cadastro foi realizado com sucesso.'
				buttonText='Cadastro bem sucedido!'
				buttonClass='modal-main__button--success'
      />
			<ModalBox
        show={showModalFailed}
        handleClose={() => closeModal()}
        title='Cadastro não realizado!'
        mainText='O seu cadastro não foi realizado.'
				buttonText='Falha ao cadastrar!'
				buttonClass='modal-main__button--danger'
      />
			<div className='register-container'>
				<div className='register-container__welcome'>
					<h1 className='register-title'>Que bom que chegou aqui!</h1>
					<h2 className='register-subtitle'>
						Precisamos de algumas informações para criar o seu perfil, <br/> preencha os campos abaixo.
						Ao registrar-se está pronto para usar nossa rede.
					</h2>
				</div>
				<div className='register-wrapper'>
					<div className='register-wrapper__enter'>
						<div className='register-wrapper__layout'>
							<div className='register-wrapper__inputs'>
								<label className='register-wrapper__input-password'>Nome</label>
								<input type='text' placeholder='Exemplo: Dominique da Silva' className='register-wrapper__input' onChange={onChangeName}></input>
								<label className='register-wrapper__input-password'>Email</label>
								<input type='email' placeholder='Exemplo: seunome@exemplo.com' className='register-wrapper__input' onChange={onChangeEmail}></input>
								<label className='register-wrapper__input-password'>Senha</label>
								<input type='password' placeholder='Exemplo: @!MinhaS3nha*' className='register-wrapper__input' onChange={onChangePassword}></input>
								<label className='register-wrapper__input-password'>Data de nascimento</label>
								<input type='date' placeholder='Exemplo: 01/01/1962' className='register-wrapper__input' onChange={onChangeBirthDate}></input>
							</div>
							<div className='register-submit'>
								<label className='register-wrapper__input-password'>Estado</label>
								<select onClick={onChangeState} className='register-wrapper__input register-wrapper__input--select'>{states ? states.map(state => <option key={state.id} value={state.id}>{state.name}</option>) : <option>Seleciona o seu estado</option>}</select>
								<label className='register-wrapper__input-password'>Cidade</label>
								<select onClick={onChangeCity} className='register-wrapper__input register-wrapper__input--select' disabled={!cities}>{cities && cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}</select>
								<label className='register-wrapper__input-password'>Bio</label>
								<textarea type='text' placeholder='Fale sobre você' className='register-wrapper__input register-wrapper__input--area' onChange={onChangeDetails}></textarea>
							</div>
						</div>
						<div className='register-wrapper__layout'>
							<button className='register-submit__button' onClick={handleSubmit}>
								Registrar&nbsp;&nbsp;
								<img src={register} />
							</button>

							<Link to='/' className='register-submit__button register-submit__button--reset link'>
								Já sou cadastrado&nbsp;&nbsp;
								<img src={back} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
