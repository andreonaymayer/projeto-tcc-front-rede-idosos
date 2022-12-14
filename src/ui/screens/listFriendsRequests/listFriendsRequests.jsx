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
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal} carrouselImages={[pedidosamizade_1,pedidosamizade_2,pedidosamizade_3]} showImage={false}
      htmlBody={
        <div className='andreo'>
          <h1 id="ajuda-solicita-es-de-amizade">Ajuda: Solicitações de amizade</h1>
          <p>Esta tela é onde encontramos as solicitações de outras pessoas para estarem na sua lista de amigos na Melhor Rede.</p>
          <ul>
            <li><a href="#ajuda--solicitaes-de-amizade">Ajuda: Solicitações de amizade</a><ul>
              <li><a href="#elementos">Elementos</a><ul>
                <li><a href="#lista">Lista</a></li>
              </ul>
              </li>
              <li><a href="#o-que-posso-fazer">O que posso fazer?</a></li>
            </ul>
            </li>
          </ul>
          <h3 id="elementos">Elementos</h3>
          <p>Uma breve explicação sobre os campos e botões da tela <strong>Solicitações de amizade</strong></p>
          <h4 id="lista">Lista</h4>
          <p>A lista de amizades será exibida onde cada solicitação vai ter um cartão.</p>
          <p>O cartão possui a imagem e nome da pessoa que esta solicitando entrar na sua lista de amigos.</p>
          <h3 id="o-que-posso-fazer-">O que posso fazer?</h3>
          <ol>
            <li>Para adicionar uma pessoa, encontre o seu cartão com nome e foto e clique no botão <strong>Adicionar</strong>.</li>
            <li>Caso não conheça ou não deseja que a pessoa veja suas publicações como um amigo, clique em Recusar.</li>
            <li><p>Para ver o perfil completo, clique em <strong>ver mais</strong>. As informações são.</p>
              <ul>
                <li>Nome;</li>
                <li>Estado;</li>
                <li>Cidade;</li>
                <li><p>Bio (detalhes).</p>
                  <p>Para sair da tela de detalhes, clique em voltar.</p>
                </li>
              </ul>
            </li>
          </ol>

          <div className='fim'></div>
        </div>
      }/>
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
