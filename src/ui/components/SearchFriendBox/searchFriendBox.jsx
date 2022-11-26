import './searchFriend.scss';
import perfil from '../../../images/perfil.jpeg'
import { Link, useHistory } from 'react-router-dom';
import { ModalBox } from '../ModalBox/modalBox';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';

export function SearchFriendBox({ profile, setShowModalFailed, setShowModalSuccess }) {
  const history = useHistory();
	const api = useApi();

  async function handleAddAsFriend() {
    const response = await api.addAsFriend(profile.nick);
    if (response && response.status === 201) {
      setShowModalSuccess(true)
    } else {
      setShowModalFailed(true)
    }
  }

  function handleGoToUserProfile() {
    console.log(profile)
    sessionStorage.setItem('user', JSON.stringify(profile));
    sessionStorage.setItem('isNotYourProfile', true);
    history.push('profile')
  }

	return (
    <div className='searchResult'>
      {profile.url
        ? <img src={profile.url} alt="foto do usuário" className='searchResult__photo'/>
        : <img src={perfil} alt="foto do usuário" className='searchResult__photo'/>
      }
      <h2>{profile.name}</h2>
      <button className="searchResult__button" onClick={handleGoToUserProfile}>Ver mais</button>
      <button className="searchResult__button" onClick={handleAddAsFriend}>Adicionar</button>
    </div>
	);
}

