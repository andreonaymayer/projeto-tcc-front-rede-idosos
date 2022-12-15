import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Chat, Header, ListFriendsBox, ModalBox, TutorialModalBox } from '../../components';
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
      <Chat />
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal} carrouselImages={[amizade_1,amizade_2,amizade_3]} showImage={false}
      htmlBody={
        <div className='andreo'>
          <h1 id="ajuda-amizades">Ajuda: Amizades</h1>
          <p>Sobre a tela amizades, é bem simples, lista todos seus amigos e da opções de ver seus perfis ou remover amizade.</p>
          <ul>
            <li><a href="#ajuda--amizades">Ajuda: Amizades</a><ul>
              <li><a href="#elementos">Elementos</a><ul>
                <li><a href="#botes">Botões</a><ul>
                  <li><a href="#o-que-posso-fazer">O que posso fazer?</a></li>
                </ul>
                </li>
              </ul>
              </li>
            </ul>
            </li>
          </ul>
          <h2 id="elementos">Elementos</h2>
          <p>Uma breve explicação sobre os campos e botões da tela <strong>Meu perfil</strong></p>
          <h3 id="bot-es">Botões</h3>
          <p>Apenas dois botões:</p>
          <ul>
            <li>Ver mais</li>
            <li>Adicionar</li>
          </ul>
          <h4 id="o-que-posso-fazer-">O que posso fazer?</h4>
          <ol>
            <li>Para adicionar uma pessoa, encontre o seu cartão com nome e foto e clique no botão <strong>Adicionar</strong>.</li>
            <li><p>Para ver o perfil completo, clique em <strong>ver mais</strong>. As informações são.</p>
            </li>
            <li><p>Nome;</p>
            </li>
            <li>Estado;</li>
            <li>Cidade;</li>
            <li>Bio (detalhes).</li>
          </ol>
          <p>Para sair da tela de detalhes, clique em voltar.</p>

          <div className='fim'></div>
        </div>
      }/>
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
            <button className='help-button searchFriends__help-button help-cursor' onClick={handleHelp}>Ajuda</button>
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
