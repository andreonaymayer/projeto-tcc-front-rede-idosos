/* eslint-disable react/prop-types */
import './personProfile.scss';
import React from 'react';
import back from '../../../images/back.svg'
import perfil from '../../../images/perfil.jpeg'
import { Link } from 'react-router-dom';

export function PersonProfileBox({ user }) {
  function handleGoBack() {
    sessionStorage.setItem('isNotYourProfile', false)
  }


	return (
    <>
      <div className='profile-container'>
        <div className='profile-wrapper'>
          <div className='profile-wrapper__enter'>
            <div className='profile-wrapper__layout'>
              <div className='profile-wrapper__inputs'>
                <h1 className='profile-title'>Informações do usuário</h1>
                <label className='profile-wrapper__input-password'>Nome</label>
                <label>{user.name}</label>
                <label className='profile-wrapper__input-password'>Estado</label>
                <label>{user.state}</label>
                <label className='profile-wrapper__input-password'>Cidade</label>
                <label>{user.city}</label>
                <label className='profile-wrapper__input-password'>Detalhes</label>
                <label>{user.details}</label>
              </div>
            </div>
            <div className='profile-wrapper__layout'>
              <div className='profile-wrapper__editor'>
                {user.url
                  ? <img className='profile-wrapper__image' src={user.url} alt='Foto do usuário' />
                  : <img className='profile-wrapper__image' src={perfil} alt='Foto do usuário' />
                }
              </div>
              <Link to='/home' className='profile-submit__button profile-submit__button--reset link' onClick={handleGoBack}>
                Voltar&nbsp;&nbsp;
                <img src={back} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
	);
}
