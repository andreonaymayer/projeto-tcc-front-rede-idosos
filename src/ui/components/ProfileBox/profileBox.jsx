import './profile.scss';
import React, { useEffect, useState } from 'react';
import back from '../../../images/back.svg'
import register from '../../../images/register.svg'
import perfil from '../../../images/perfil.jpeg'
import { Link, useHistory } from 'react-router-dom';
import { useApi } from '../../../hooks/api';

export function Profile() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [state, setState] = useState('');
	const [details, setDetails] = useState('');
	const [states, setStates] = useState(0);
	const [city, setCity] = useState('');
	const [cities, setCities] = useState('');
	const history = useHistory();
	const api = useApi();

  async function showState() {
		const response = await api.showStates();
		if (response && response.status === 200) {
			setStates(response.data)
		} else {
			console.log("deu ruim")
		}
	}

  async function showCity(stateId) {
		const response = await api.showCities(stateId);
		if (response && response.status === 200) {
			setCities(response.data)
		} else {
			console.log("deu ruim")
		}
	}

  useEffect(() => {
    showState();
  },[]);

	async function newUserprofile() {
		const response = await api.newUserprofile(
      birthDate,
      city,
      details,
      email,
      name,
      password
		);
		if (response && response.status === 201) {
			history.push('/');
		} else {
			console.log("deu ruim")
		}
	}


	function handleSubmit(event) {
		event.preventDefault();
		newUserprofile();
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
		setState(event.target.value);
    showCity(event.target.value);
	}

  function onChangeDetails(event) {
		setDetails(event.target.value);
	}

  function onChangeCity(event) {
    setCity(event.target.value);
	}

	function onChangeBirthDate() {
		setBirthDate(
			'2022-10-13T23:11:50.592Z'
		);
	}

	return (
		<div className='profile-container'>
      <div className='profile-wrapper'>
        <div className='profile-wrapper__enter'>
          <div className='profile-wrapper__layout'>
            <div className='profile-wrapper__inputs'>
              <h1 className='profile-title'>Minhas informações</h1>
              <label className='profile-wrapper__input-password'>Nome</label>
              <input type='text' placeholder='Exemplo: Dominique da Silva' className='profile-wrapper__input' onChange={onChangeName}></input>
              <label className='profile-wrapper__input-password'>Email</label>
              <input type='email' placeholder='Exemplo: seunome@exemplo.com' className='profile-wrapper__input' onChange={onChangeEmail}></input>
              <label className='profile-wrapper__input-password'>Senha</label>
              <input type='password' placeholder='Exemplo: @!MinhaS3nha*' className='profile-wrapper__input' onChange={onChangePassword}></input>
              <label className='profile-wrapper__input-password'>Data de nascimento</label>
              <input type='text' placeholder='Exemplo: 01/01/1962' className='profile-wrapper__input' onChange={onChangeBirthDate}></input>
              <label className='profile-wrapper__input-password'>Estado</label>
              <select onClick={onChangeState} className='profile-wrapper__input profile-wrapper__input--select'>{states && states.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}</select>
              <label className='profile-wrapper__input-password'>Cidade</label>
              <select onClick={onChangeCity} className='profile-wrapper__input profile-wrapper__input--select' disabled={!cities}>{cities && cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}</select>
              <label className='profile-wrapper__input-password'>Detalhes</label>
              <textarea type='text' placeholder='Fale sobre você' className='profile-wrapper__input profile-wrapper__input--area' onChange={onChangeDetails}></textarea>
            </div>
          </div>
          <div className='profile-wrapper__layout'>
            <div className='profile-wrapper__editor'>
              <img className='profile-wrapper__image' src={perfil} />
              <button className='profile-submit__button profile-submit__button--image' onClick={handleSubmit}>
                Selecionar uma nova foto
              </button>
            </div>

            <div className='profile-wrapper__editor'>
              <button className='profile-submit__button' onClick={handleSubmit}>
                Registrar&nbsp;&nbsp;
                <img src={register} />
              </button>
              <Link to='/' className='profile-submit__button profile-submit__button--reset link'>
                Não desejo mudar nada&nbsp;&nbsp;
                <img src={back} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
	);
}
