import './listFriends.scss';
import perfil from '../../../images/perfil.jpeg'
import { ModalBox } from '../ModalBox/modalBox';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';
import { useHistory } from 'react-router-dom';

export function ListFriendsBox({ friend, id, setShowModalDenied, setShowModalAdded }) {
	const api = useApi();
  const history = useHistory();

  async function handleRemoveAsFriend() {
    const response = await api.removeFriendship(friend.nick);
    if (response && response.status === 200) {
      setShowModalAdded(true)
    } else {
      setShowModalDenied(true)
    }
  }

  function handleGoToUserProfile() {
    sessionStorage.setItem('user', JSON.stringify(friend));
    sessionStorage.setItem('isNotYourProfile', true);
    history.push('profile')
  }

	return (
    <div className='friends' id={id}>
      {friend.url
        ? <img src={friend.url} alt="foto do usuário" className='friends__photo'/>
        : <img src={perfil} alt="foto do usuário" className='friends__photo'/>
      }
      <h4>{friend.name}</h4>
      <button className="friends__button" onClick={handleGoToUserProfile}>Ver mais</button>
      <button className="friendsRequests__button" onClick={handleRemoveAsFriend}>Remover Amizade</button>
    </div>
	);
}

