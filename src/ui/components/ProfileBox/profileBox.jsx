/* eslint-disable react/prop-types */
import './profile.scss';
import React, { useEffect, useState } from 'react';
import back from '../../../images/back.svg'
import register from '../../../images/register.svg'
import perfil from '../../../images/perfil.jpeg'
import { Link, useHistory } from 'react-router-dom';
import { useApi } from '../../../hooks/api';

export function Profile({ user }) {
  console.log(user)
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [birthDate, setBirthDate] = useState(user.birthDate);
	const [state, setState] = useState('');
	const [details, setDetails] = useState(user.details);
	const [states, setStates] = useState(0);
	const [city, setCity] = useState(user.city);
	const [cities, setCities] = useState('');
  const [imagePreview, setImagePreview] = useState();
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


  async function putUserInfo() {
		const response = await api.putUserInfo(email, name, birthDate, details, city);
	}

	function handleSubmit(event) {
		event.preventDefault();
		putUserInfo();
	}

	function onChangeName(event) {
		setName(event.target.value);
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

	function onChangeBirthDate(event) {
		setBirthDate(event.target.value);
	}

  async function addPhoto(event) {
    let file = event.target.files[0];
    let image = new FormData();
    image.append('file', file);
    event.target.value = null;
    const response = await api.uploadPostImage(image);
    setImagePreview(response.data);

    if (response.status === 200) {
      alert('imagem carregada com sucesso')
    } else {
      alert('imagem com erro')
    }
	}

	return (
		<div className='profile-container'>
      <div className='profile-wrapper'>
        <div className='profile-wrapper__enter'>
          <div className='profile-wrapper__layout'>
            <div className='profile-wrapper__inputs'>
              <h1 className='profile-title'>Minhas informações</h1>
              <label className='profile-wrapper__input-password'>Nome</label>
              <input type='text' placeholder='Exemplo: Dominique da Silva' className='profile-wrapper__input' onChange={onChangeName} value={name}></input>
              <label className='profile-wrapper__input-password'>Email</label>
              <input type='email' placeholder='Exemplo: seunome@exemplo.com' className='profile-wrapper__input' onChange={onChangeEmail} value={email}></input>
              <label className='profile-wrapper__input-password'>Data de nascimento</label>
              <input type='date' placeholder='Exemplo: 01/01/1962' className='profile-wrapper__input' onChange={onChangeBirthDate} value={birthDate}></input>
              <label className='profile-wrapper__input-password'>Estado</label>
              <select onClick={onChangeState} className='profile-wrapper__input profile-wrapper__input--select'>{states && states.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}</select>
              <label className='profile-wrapper__input-password'>Cidade</label>
              <select onClick={onChangeCity} className='profile-wrapper__input profile-wrapper__input--select' disabled={!cities}>{cities && cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}</select>
              <label className='profile-wrapper__input-password'>Detalhes</label>
              <textarea type='text' placeholder='Fale sobre você' className='profile-wrapper__input profile-wrapper__input--area' onChange={onChangeDetails} value={details}></textarea>
            </div>
          </div>
          <div className='profile-wrapper__layout'>
            <div className='profile-wrapper__editor'>
              {imagePreview
                ? <img className='profile-wrapper__image' src={imagePreview} />
                : <img className='profile-wrapper__image' src={perfil} />
              }
              <div className='profile-submit__container'>
                <button className='profile-submit__button profile-submit__button--image'>
                  Selecionar uma nova foto
                </button>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  className="profile-submit__input"
                  onChange={addPhoto}
                />
				      </div>
            </div>

            <div className='profile-wrapper__editor'>
              <button className='profile-submit__button' onClick={handleSubmit}>
                Registrar&nbsp;&nbsp;
                <img src={register} />
              </button>

              <Link to="/change-password" className='profile-submit__button link'>
                Alterar senha&nbsp;&nbsp;
                <img src={back} className="back-image-rotate" />
              </Link>
              <Link to='/home' className='profile-submit__button profile-submit__button--reset link'>
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
