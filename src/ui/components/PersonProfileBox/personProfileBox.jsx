/* eslint-disable react/prop-types */
import './personProfile.scss';
import React from 'react';
import back from '../../../images/back.svg'
import perfil from '../../../images/perfil1.jpeg'
import { Link } from 'react-router-dom';

export function PersonProfileBox({ user }) {
  const isMobile = window.innerWidth < 500;
  function handleGoBack() {
    sessionStorage.setItem('isNotYourProfile', false)
  }


	return (
    <>
      <div className='person-profile-container'>
        <div className='person-profile-wrapper'>
          <div className='person-profile-wrapper__enter'>
            <div className='person-profile-wrapper__layout'>
              <div className='person-profile-wrapper__inputs'>
                <h1 className='person-profile-title'>Informações do usuário</h1>
                <div className='person-profile-wrapper__editor'>
                  {user.url
                    ? <img className='person-profile-wrapper__image' src={user.url} alt='Foto do usuário' />
                    : <img className='person-profile-wrapper__image' src={perfil} alt='Foto do usuário' />
                  }
                </div>
                <div className='person-profile-wrapper__position'>
                  <div className='person-profile-wrapper__div-label'>
                    <label className='person-profile-wrapper__input-password'>Nome: {user.name}</label>
                  </div>

                  <div className='person-profile-wrapper__div-label'>
                    <label className='person-profile-wrapper__input-password'>Estado: {user.state}</label>
                  </div>

                  <div className='person-profile-wrapper__div-label'>
                    <label className='person-profile-wrapper__input-password'>Cidade: {user.city}</label>
                  </div>

                  <div className='person-profile-wrapper__div-label'>
                    <label className='person-profile-wrapper__input-password'>Detalhes: {user.details}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='person-profile-wrapper__layout'>
              {isMobile
              ?
                <Link to='/home' className='person-profile-submit__button person-profile-submit__button--reset link' onClick={handleGoBack}>
                  Voltar&nbsp;&nbsp;
                  <img src={back} />
                </Link>
              : null
              }
            </div>

            {!isMobile
            ?
              <Link to='/home' className='person-profile-submit__button person-profile-submit__button--reset link' onClick={handleGoBack}>
                Voltar&nbsp;&nbsp;
                <img src={back} />
              </Link>
            : null
            }
          </div>
        </div>
      </div>
    </>
	);
}
