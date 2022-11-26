import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, ListFriendsBox, ModalBox } from '../../components';
import './index.scss'

export function ListFriendsScreen() {
	const [friends, setFriends] = useState();
	const [showModalAdded, setShowModalAdded] = useState(false);
	const [showModalDenied, setShowModalDenied] = useState(false);
	const api = useApi();

  useEffect(() => {

		async function showFriends() {
			const response = await api.showFriends();
			if (response && response.status === 200) {
				setFriends(response.data)
			}
		}

    showFriends();
  },[]);

  function closeModal() {
		setShowModalAdded(false);
		setShowModalDenied(false);
	}

	return (
    <>
			<ModalBox
        show={showModalAdded}
        handleClose={() => closeModal()}
        title={'Pedido de amizade'}
        mainText={'Você aceitou o pedido de amizade'}
				buttonText={'Pedido de amizade aceito'}
				buttonClass='modal-main__button--success'
      />
			<ModalBox
        show={showModalDenied}
        handleClose={() => closeModal()}
        title='Pedido de amizade'
        mainText='TVocê recusou o pedido de amizade'
				buttonText='Pedido de amizade recusado!'
				buttonClass='modal-main__button--danger'
      />
      <div className='listFriends'>
        <Header />
        <div className='listFriends__container'>
          <div className='listFriends__search'>
            <h1>Amizades</h1>
          </div>
          <div className='listFriends__results'>
            {friends && friends.map(friend => <ListFriendsBox friend={friend} setShowModalAdded={setShowModalAdded} setShowModalDenied={setShowModalDenied}/>)}
          </div>
        </div>
      </div>
    </>
	);
}
