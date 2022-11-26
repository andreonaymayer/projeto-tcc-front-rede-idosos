import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, ModalBox, SearchFriendBox } from '../../components';
import './index.scss'

export function SearchFriendsScreen() {
	const [searchText, setSearchText] = useState('');
	const [profiles, setProfiles] = useState('');
	const [showModalSuccess, setShowModalSuccess] = useState(false);
	const [showModalFailed, setShowModalFailed] = useState(false);
	const api = useApi();

  useEffect(() => {

		async function showProfiles() {
			const response = await api.showProfiles(searchText);
			if (response && response.status === 200) {
				setProfiles(response.data)
			}
		}

    showProfiles();
  },[searchText]);


	function handleSearchText(event) {
		setSearchText(event.target.value);
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
        title={'Pedido de amizade'}
        mainText={'O seu pedido de amizade foi realizado com sucesso'}
				buttonText={'Pedido de amizade realizado'}
				buttonClass='modal-main__button--success'
      />
			<ModalBox
        show={showModalFailed}
        handleClose={() => closeModal()}
        title='Tivemos um problema!'
        mainText='Tivemos um problema, tente novamente.'
				buttonText='Pedido de amizade não realizado!'
				buttonClass='modal-main__button--danger'
      />
      <div className='searchFriends'>
        <Header />
        <div className='searchFriends__container'>
          <div className='searchFriends__search'>
            <h1>Procurar pessoas</h1>
            <input type="text" placeholder='Procurar amigos' onChange={handleSearchText} className="searchFriends__input" value={searchText}></input>
          </div>
          <div className='searchFriends__results'>
            {profiles && profiles.map(profile => <SearchFriendBox profile={profile} setShowModalSuccess={setShowModalSuccess} setShowModalFailed={setShowModalFailed}/>)}
          </div>
        </div>
      </div>
    </>
	);
}
