import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, ListFriendsBox, ModalBox, TutorialModalBox } from '../../components';
import perfil from '../../../images/perfil1.jpeg'
import './index.scss'
import amizade_1 from '../../../images/amizade/amizade-1.jpg'
import amizade_2 from '../../../images/amizade/amizade-2.jpg'
import amizade_3 from '../../../images/amizade/amizade-3.jpg'

export function ListFriendsScreen() {
	const [friends, setFriends] = useState();
	const [showModalAdded, setShowModalAdded] = useState(false);
	const [showModalDenied, setShowModalDenied] = useState(false);
	const [helpModal, setHelpModal] = useState(false);
	const api = useApi();

  useEffect(() => {

		async function showFriends() {
			const response = await api.showFriends();
			if (response && response.status === 200) {
				setFriends(response.data)
			}
		}

    showFriends();
  },[showModalAdded]);

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
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal} carrouselImages={[amizade_1,amizade_2,amizade_3]}/>
			<ModalBox
        show={showModalAdded}
        handleClose={() => closeModal()}
        title={'Amizade removida!'}
        mainText={'Você removeu a amizade'}
				buttonText={'Pedido de amizade removido'}
				buttonClass='modal-main__button--success'
      />
			<ModalBox
        show={showModalDenied}
        handleClose={() => closeModal()}
        title='Amizade não removida!'
        mainText='Falha ao remover a amizade'
				buttonText='Amizade não foi removido!'
				buttonClass='modal-main__button--danger'
      />
      <div className='listFriends'>
        <Header />
        <div className='listFriends__container'>
          <div className='listFriends__search'>
            <h1>Amizades</h1>
            <button className='help-button searchFriends__help-button' onClick={handleHelp}>Ajuda</button>
          </div>
          <div className='listFriends__results'>
            {friends && friends.length > 0
            ?
              friends.map((friend, key) =>
                <ListFriendsBox id={key} friend={friend} setShowModalAdded={setShowModalAdded} setShowModalDenied={setShowModalDenied}/>)
            : <h3>Você ainda não possui nenhuma amizade!</h3>
            }
          </div>
        </div>
      </div>
    </>
	);
}
