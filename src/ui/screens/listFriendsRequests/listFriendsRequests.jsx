import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Chat, Header, ListFriendRequestBox, ModalBox, TutorialModalBox } from '../../components';
import perfil from '../../../images/perfil1.jpeg'
import './index.scss'
import pedidosamizade_1 from '../../../images/pedidosamizade/pedidosamizade-1.jpg'
import pedidosamizade_2 from '../../../images/pedidosamizade/pedidosamizade-2.jpg'
import pedidosamizade_3 from '../../../images/pedidosamizade/pedidosamizade-3.jpg'

export function ListFriendsRequestsScreen() {
	const [requests, setRequests] = useState([]);
	const api = useApi();
	const [showModalAdded, setShowModalAdded] = useState(false);
	const [showModalDenied, setShowModalDenied] = useState(false);
	const [helpModal, setHelpModal] = useState(false);

  useEffect(() => {

		async function showSolicitations() {
			const response = await api.showSolicitations();
			if (response && response.status === 200) {
				setRequests(response.data)
			}
		}

    showSolicitations();
  },[showModalAdded, showModalDenied]);

  function closeModal() {
		setShowModalAdded(false);
		setShowModalDenied(false);
    setHelpModal(false);
	}

  function handleHelp() {
    setHelpModal(!helpModal)
  }


	return (
    <>
      <Chat />
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal} carrouselImages={[pedidosamizade_1,pedidosamizade_2,pedidosamizade_3]}/>
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
        mainText='Você recusou o pedido de amizade'
				buttonText='Pedido de amizade recusado!'
				buttonClass='modal-main__button--danger'
      />
      <div className='listFriendsRequests'>
        <Header />
        <div className='listFriendsRequests__container'>
          <div className='listFriendsRequests__search'>
            <h1>Pedidos de amizade</h1>
            <button className='help-button searchFriends__help-button' onClick={handleHelp}>Ajuda</button>
          </div>
          <div className='listFriendsRequests__results'>
            {requests && requests.length > 0 ? requests.map(request => <ListFriendRequestBox request={request} setShowModalAdded={setShowModalAdded} setShowModalDenied={setShowModalDenied}/>) : <h3>Você não possui nenhuma solicitação pendente!</h3>}
          </div>
        </div>
      </div>
    </>
	);
}
