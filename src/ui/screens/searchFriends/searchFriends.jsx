import {useEffect} from 'react';
import {useState} from 'react';
import {useApi} from '../../../hooks/api';
import perfil from '../../../images/perfil1.jpeg'
import {Chat, Header, ModalBox, SearchFriendBox, TutorialModalBox} from '../../components';
import './index.scss'
import procurar_1 from '../../../images/procurarpessoas/procurarpessoas-1.jpg'
import procurar_2 from '../../../images/procurarpessoas/procurarpessoas-2.jpg'
import procurar_3 from '../../../images/procurarpessoas/procurarpessoas-3.jpg'
import procurar_4 from '../../../images/procurarpessoas/procurarpessoas-4.jpg'

export function SearchFriendsScreen() {
  const [searchText, setSearchText] = useState('');
  const [profiles, setProfiles] = useState('');
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const api = useApi();

  useEffect(() => {

    async function showProfiles() {
      const response = await api.showProfiles(searchText);
      if (response && response.status === 200) {
        setProfiles(response.data)
      }
    }

    showProfiles();
  }, [searchText]);


  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  function closeModal() {
    setShowModalSuccess(false);
    setShowModalFailed(false);
    setHelpModal(false);
  }

  function handleHelp() {
    setHelpModal(!helpModal)
  }


  return (
    <>
      <Chat/>
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal} carrouselImages={[procurar_1,
        procurar_2,
        procurar_3,
        procurar_4]}
                        showImage={false}
                        htmlBody={
                          <div className="andreo">
                            <h1 id="ajuda-procurar-amigos">Ajuda: Procurar amigos</h1>
                            <p>A seção de procurar amigos é bem simples, basta clicar no campo <strong>Procurar
                              amigos</strong> e digitar o nome da pessoa que voce deseja encontrar.</p>
                            <p>Você pode digitar devagar e os resultados aparecerão conforme o nome que você esta
                              escrevendo for parecido com o nome da pessoa que você busca.</p>
                            <p>Caso não haja pessoas com o nome digitado, não aparecerá nenhum resultado.</p>
                            <ul>
                              <li><a href="#ajuda--procurar-amigos">Ajuda: Procurar amigos</a>
                                <ul>
                                  <li><a href="#o-que-posso-fazer">O que posso fazer</a></li>
                                </ul>
                              </li>
                            </ul>
                            <h3 id="o-que-posso-fazer">O que posso fazer</h3>
                            <ol>
                              <li>Para adicionar uma pessoa, encontre o seu cartão com nome e foto e clique no
                                botão <strong>Adicionar</strong>.
                              </li>
                              <li><p>Para ver o perfil completo, clique em <strong>ver mais</strong>. As informações
                                são.</p>
                                <ul>
                                  <li>Nome;</li>
                                  <li>Estado;</li>
                                  <li>Cidade;</li>
                                  <li>Bio (detalhes).</li>
                                </ul>
                                <p>Para sair da tela de detalhes, clique em voltar.</p>
                              </li>
                            </ol>
                            <div className="fim"></div>
                          </div>}
      />
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
        <Header/>
        <div className='searchFriends__container'>
          <div className='searchFriends__search'>
            <h1>Procurar pessoas</h1>
            <div className='searchFriends__help'>
              <button className='help-button searchFriends__help-button help-cursor' onClick={handleHelp}>Ajuda</button>
              <input type="text" placeholder='Procurar amigos' onChange={handleSearchText}
                     className="searchFriends__input" value={searchText}></input>
            </div>
          </div>
          <div className='searchFriends__results'>
            {profiles && profiles.map(profile => <SearchFriendBox profile={profile}
                                                                  setShowModalSuccess={setShowModalSuccess}
                                                                  setShowModalFailed={setShowModalFailed}/>)}
          </div>
        </div>
      </div>
    </>
  );
}
