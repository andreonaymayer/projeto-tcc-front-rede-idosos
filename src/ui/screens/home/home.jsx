import React, {useEffect, useState} from 'react';
import {useApi} from '../../../hooks/api';
import {Chat, Header, ModalBox, PostBox, PostModalBox, TutorialModalBox} from '../../components';
import perfil from '../../../images/perfil1.jpeg'
import './index.scss'
import feed_1 from '../../../images/feed/feed-01.jpg'
import feed_2 from '../../../images/feed/feed-02.jpg'
import feed_3 from '../../../images/feed/feed-03.jpg'
import feed_4 from '../../../images/feed/feed-04.jpg'
import feed_5 from '../../../images/feed/feed-05.jpg'
import feed_6 from '../../../images/feed/feed-06.jpg'
import feed_7 from '../../../images/feed/feed-07.jpg'
import feed_8 from '../../../images/feed/feed-08.jpg'
import feed_9 from '../../../images/feed/feed-09.jpg'
import feed_10 from '../../../images/feed/feed-10.jpg'
import feed_11 from '../../../images/feed/feed-11.jpg'

export function HomeScreen() {
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [modalPost, setModalPost] = useState();
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [renderPosts, setRenderPosts] = useState(false);
  const [postContent, setPostContent] = useState([]);
  const [helpModal, setHelpModal] = useState(false);
  const [svgClasses, setSvgClasses] = useState('home-container__svg');
  const nick = sessionStorage.getItem('nickname');
  const api = useApi();

  useEffect(() => {
    async function getFeed() {
      const response = await api.getFeed();
      if (response.status === 200) {
        setFriendsPosts(response.data)
      }
    }

    getFeed();
  }, [showModalSuccess, renderPosts]);

  async function handleSoftDelete(post) {
    const response = await api.softDeletePost(post.id);

    if (response.status === 200) {
      setShowModalSuccess(true)
    } else {
      setShowModalFailed(true);
    }
  }

  function closeModal() {
    setShowModalSuccess(false);
    setShowModalFailed(false);
    setHelpModal(false);
  }

  function renderNewPosts() {
    setRenderPosts(!renderPosts)
    setSvgClasses('home-container__show-svg home-container__svg')

    setTimeout(() => {
      setSvgClasses('home-container__svg')
    }, 2000);
  }

  function openChat() {
    setRenderPosts(!renderPosts)
    localStorage.setItem('isOpened', true);
  }

  async function handleReaction(postId) {
    const response = await api.setReaction(postId);
    if (response.status === 200) {
      setRenderPosts(!renderPosts)
    }
  }

  function handleCommment(post) {
    setModalPost(post.id)
    setPostContent(post)
  }

  return (
    <>
      <Chat isFromHome={true} />
      {modalPost && <PostModalBox setHelpModal={setHelpModal} helpModal={helpModal} setModalPost={setModalPost}
                                  modalPost={modalPost} post={postContent} setRenderPosts={setRenderPosts}
                                  renderPosts={renderPosts}/>}
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal}
                        carrouselImages={[feed_1, feed_2, feed_3, feed_4, feed_5, feed_6, feed_7, feed_8, feed_9, feed_10, feed_11]} showImage={false} htmlBody={
        <div className='andreo'>
          <h1 id="ajuda-inicio-ver-publica-es">Ajuda: Inicio - Ver publica????es</h1>
          <p>Nessa tela, s??o exibidas todas as publica????es / postagens das pessoas da sua lista de amigos. E tamb??m as suas, por ordem cronol??gica.</p>
          <ul>
            <li><a href="#ajuda--inicio---ver-publicaes">Ajuda: Inicio - Ver publica????es</a><ul>
              <li><a href="#botoes-importantes">Bot??es importantes</a></li>
              <li><a href="#o-menu-lateral">O menu lateral</a></li>
              <li><a href="#chat">Chat</a></li>
              <li><a href="#o-que-posso-fazer-com-as-postagens">O que posso fazer com as postagens</a><ul>
                <li><a href="#Bot??o-expandir-e-comentar">Bot??o Expandir e Comentar</a><ul>
                  <li><a href="#adicionando-um-comentrio">Adicionando um coment??rio</a></li>
                  <li><a href="#removendo-um-comentario">Removendo um comentario</a></li>
                </ul>
                </li>
              </ul>
              </li>
            </ul>
            </li>
          </ul>
          <h2 id="botoes-importantes">Botoes importantes</h2>
          <ol>
            <li><p>Procurar novas publica????es:</p>
              <p> Busca novas publica????es dos seus amigos.</p>
            </li>
            <li><p>Ajuda</p>
              <p> Abre uma janela com informa????es e instru????es de como utilizar nossa rede social</p>
            </li>
            <li><p>Abrir Chat</p>
              <p> Inicia o fluxo de conversa, como ?? explicado abaixo na se????o <strong>Chat</strong></p>
            </li>
            <li><p>Sair</p>
              <p> Desliga o site do usu??rio. Podendo ser efetuada a entrada posteriormente.</p>
            </li>
          </ol>
          <h2 id="o-menu-lateral">O menu lateral</h2>
          <p>O menu da esquerda ?? onde voc?? encontra todas funcionalidades do sistema.</p>
          <ol>
            <li>Clicando no logo &quot;Melhor Rede - Clique aqui para voltar&quot; voc?? volta para a tela inicial (mural de publica????es).</li>
            <li><p>Meu perfil:</p>
              <p> Mostra as suas informa????es e permite que voc?? edite.</p>
            </li>
            <li><p>Criar publica????o:</p>
              <p> Vai para a tela de cria????o de publica????o</p>
            </li>
            <li><p>Ver publica????es:</p>
              <p> ?? o mural de publica????es, vai para a tela inicial, assim como clicando no logo (Passo 1)</p>
            </li>
            <li><p>Procurar por amigos:</p>
              <p> Vai para a tela da busca de pessoas.</p>
            </li>
            <li><p>Solicita????es de amizade:</p>
              <p> Vai para a lista das pessoas que enviaram solicita????o de amizade para voc??.</p>
            </li>
            <li><p>Amizades:</p>
              <p> Vai para a lista das pessoas j?? aceitas na sua rede como uma amizade.</p>
            </li>
            <li><p>Criar evento:</p>
              <p> Vai para a tela de cria????o de evento.</p>
            </li>
            <li><p>Ver eventos:</p>
              <p> Vai para o mural de eventos.</p>
            </li>
            <li><p>Meu Album:</p>
              <p>Lista todas imagens que voc?? publicou na Melhor Rede.</p>
            </li>
          </ol>
          <h2 id="chat">Chat</h2>
          <p>Voc?? pode iniciar uma conversa em tempo real com seus amigos atrav??s do chat.</p>
          <p>?? bem simples:</p>
          <ol>
            <li>Clique no bot??o <strong>Abrir chat</strong>;<ol>
              <li>Ao clicar, ser?? aberta uma pequena janela com o campo: procurar amigos.</li>
            </ol>
            </li>
            <li>Clique e digite no campo <strong>Procurar amigos</strong> o nome do amigo com quem deseja falar, ou clique no bot??o <strong>conversar</strong> ao lado do nome do seu amigo.<ol>
              <li>Ser?? aberta outra janela, essa ?? a janela da conversa.</li>
            </ol>
            </li>
            <li>Para enviar uma mensagem basta escrever a mensagem no campo <strong>Envie sua mensagem</strong> e clicar no ??cone do avi??o de papel para enviar.</li>
          </ol>
          <h2 id="o-que-posso-fazer-com-as-postagens">O que posso fazer com as postagens</h2>
          <p>?? possivel comentar e reagir como &quot;Interessante&quot; as postagens.</p>
          <p>Os coment??rios s??o p??blicos e as rea????es s??o anonimas.</p>
          <table>
            <thead>
            <tr>
              <th>Bot??o</th>
              <th>Fun????o</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Interessante</td>
              <td>Demonstra que voc?? achou relevante, especial ou interessante a publica????o do seu amigo. Ao clicar, contabiliza a sua rea????o.</td>
            </tr>
            <tr>
              <td>Comentar</td>
              <td>Abre uma tela para inserir e ler os coment??rios da publica????o.</td>
            </tr>
            <tr>
              <td>Expandir</td>
              <td>Abre a exibi????o ampliada da imagem</td>
            </tr>
            </tbody>
          </table>
          <p> <strong>As publica????es criadas por voc?? podem ser excluidas ou modificadas.</strong></p>
          <h3 id="Bot??o-expandir-e-comentar">Bot??o Expandir e Comentar</h3>
          <p>Ao clicar em expandir, ser?? aberta uma janela com a imagem ampliada e a lista de coment??rios da imagem.</p>
          <h4 id="adicionando-um-coment-rio">Adicionando um coment??rio</h4>
          <ol>
            <li>Clique no campo onde est?? escrito &quot;Adicione um coment??rio&quot;, o campo ir?? ficar azul e o cursor (onde o texto ser?? escrito) vai piscar. Ent??o digite o que deseja comentar.</li>
            <li>Ap??s digitar o que deseja comentar, clique no bot??o em que tem um ??cone de avi??o de papel para enviar o coment??rio.</li>
          </ol>
          <h4 id="removendo-um-comentario">Removendo um coment??rio</h4>
          <ol>
            <li><p>Clique no bot??o &quot;Deletar&quot;, na caixa da mensagem que deseja remover.</p>
              <p> <strong><em>Apenas ?? poss??vel remover seus pr??prios coment??rios.</em></strong></p>
            </li>
          </ol>

          <div className='fim'></div>
        </div>
      }/>
      <ModalBox
        show={showModalSuccess}
        handleClose={() => closeModal()}
        title='Publica????o deletada com sucesso!'
        mainText='A sua publica????o foi deletada.'
        buttonText='Publica????o deletada'
        buttonClass='modal-main__button--success'
      />
      <ModalBox
        show={showModalFailed}
        handleClose={() => closeModal()}
        title='Tivemos um problema!'
        mainText='Tivemos um problema, tente novamente.'
        buttonText='Publica????o n??o foi deletada!'
        buttonClass='modal-main__button--danger'
      />
      <div className="home-container">
        <Header/>
        <div className="home-container__posts">
          <div className='home-container__buttons'>
            <button className='home-container__button' onClick={renderNewPosts}>Procurar novas publica????es</button>
            <button className='chat-button' onClick={() => openChat()}>Abrir Chat</button>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class={svgClasses} width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <circle cx="50" cy="50" fill="none" stroke="#1d0e0b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
              </circle>
            </svg>
          </div>
          {friendsPosts && friendsPosts.length === 0 && <h3 lassName='home-container__none-posts'>Voc?? n??o possui nenhuma publica????o para ver!</h3>}
          {friendsPosts ? friendsPosts.map(post => post.active &&
            <PostBox post={post} handleSoftDelete={handleSoftDelete} isMyPost={post.autor.nick === nick}
                     handleCommment={handleCommment} handleReaction={handleReaction} setHelpModal={setHelpModal}
                     helpModal={helpModal}/>) : null}
        </div>
      </div>
    </>

  );
}
