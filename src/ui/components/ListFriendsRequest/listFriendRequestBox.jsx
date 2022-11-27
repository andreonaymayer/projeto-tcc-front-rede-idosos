import './listFriendRequest.scss';
import perfil from '../../../images/perfil.jpeg'
import { useApi } from '../../../hooks/api';
import { useHistory } from 'react-router-dom';

export function ListFriendRequestBox({ request, setShowModalAdded, setShowModalDenied }) {
  const history = useHistory();
	const api = useApi();

  async function handleAddAsFriend() {
    const response = await api.acceptAsFriend(request.nick);
    if (response && response.status === 200) {
      setShowModalAdded(true)
    }
  }

  async function handleDenyAsFriend() {
    const response = await api.denyAsFriend(request.nick);
    if (response && response.status === 200) {
      setShowModalDenied(true)
    }
  }

  function goToProfile() {
    sessionStorage.setItem('user', JSON.stringify(request));
    sessionStorage.setItem('isNotYourProfile', true);
    history.push('profile')
  }

	return (
    <>
      <div className='friendsRequests'>
        {request.url
          ? <img src={request.url} alt="foto do usuário" className='friendsRequests__photo'/>
          : <img src={perfil} alt="foto do usuário" className='friendsRequests__photo'/>
        }
        <h4>{request.name}</h4>
        <button className="friendsRequests__button" onClick={handleAddAsFriend}>Adicionar</button>
        <button className="friendsRequests__button" onClick={handleDenyAsFriend}>Recusar</button>
        <button className="friendsRequests__button"  onClick={goToProfile}>Ver mais</button>
      </div>
    </>
	);
}

