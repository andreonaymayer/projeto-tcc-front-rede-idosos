import './listFriendRequest.scss';
import perfil from '../../../images/perfil.jpeg'
import { ModalBox } from '../ModalBox/modalBox';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';

export function ListFriendRequestBox({ request }) {
	const [showModalAdded, setShowModalAdded] = useState(false);
	const [showModalDenied, setShowModalDenied] = useState(false);
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
      <div className='friendsRequests'>
        {request.url 
          ? <img src={request.url} alt="foto do usuário" className='friendsRequests__photo'/>
          : <img src={perfil} alt="foto do usuário" className='friendsRequests__photo'/>
        }
        <h4>{request.name}</h4>
        <button className="friendsRequests__button" onClick={handleAddAsFriend}>Adicionar</button>
        <button className="friendsRequests__button" onClick={handleDenyAsFriend}>Recusar</button>
        <button className="friendsRequests__button">Ver mais</button>
      </div>
    </>
	);
}

