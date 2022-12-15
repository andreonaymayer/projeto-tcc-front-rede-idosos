/* eslint-disable react/prop-types */
import './post.scss';
import React, {useState} from 'react';
import register from '../../../images/register.svg'
import {useApi} from '../../../hooks/api';
import perfil from '../../../images/perfil1.jpeg'
import {Link, useHistory} from 'react-router-dom';
import Slider from 'react-slick';
import {ModalBox} from '../ModalBox/modalBox';
import {TutorialModalBox} from '../TutorialModalBox/tutorialModalBox';
import publicacao_1 from '../../../images/publicacao/publicacao-1.jpg'
import publicacao_2 from '../../../images/publicacao/publicacao-2.jpg'
import publicacao_3 from '../../../images/publicacao/publicacao-3.jpg'
import publicacao_4 from '../../../images/publicacao/publicacao-4.jpg'
import publicacao_5 from '../../../images/publicacao/publicacao-5.jpg'
import {Chat} from '../Chat/chat';

export function CreatePostBox({user}) {
  const post = JSON.parse(localStorage.getItem('post'))
  const editPost = localStorage.getItem('editPost');
  const [text, setText] = useState(post ? post.conteudo : '');
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState('Imagem adicionada com sucesso!');
  const [mainText, setMainText] = useState('Agora você pode adicionar mais imagens ou adicionar algum texto na sua publicação.');
  const [buttonText, setButtonText] = useState('Imagem adicionada');
  const [helpModal, setHelpModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(post ? post.midiaUrls : []);
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const history = useHistory();
  const selectPictureButton = editPost ? 'create-post-submit__button create-post-submit__button--disabled' : 'create-post-submit__button';
  const nameOfMonthBR = date.toLocaleString('pt-BR', {
    month: 'long',
  });
  const api = useApi();

  function onChangePostText(event) {
    setText(event.target.value);
  }

  const settings = {
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  async function addPhoto(event) {
    event.preventDefault();
    let file = event.target.files[0];
    let image = new FormData();
    image.append('file', file);
    event.target.value = null;
    const response = await api.postImage(image);
    if (imagePreview === []) {
      setImagePreview(imagePreview)
    } else {
      setImagePreview((imagePreview) => [
        ...imagePreview,
        response.data
      ]);
    }


    if (response.status === 200) {
      setShowModalSuccess(true)
    } else {
      setShowModalFailed(true)
    }
  }

  async function createPost() {
    let midiaUrl = []
    midiaUrl.push(imagePreview)
    if (text.length == 0 && midiaUrl == []) {
      setShowModalFailed(true)
      return;
    }

    const response = await api.createPost(text, midiaUrl);

    if (response.status === 200) {
      setShowModalSuccess(true)
      setTitle('Publicação criada com sucesso!')
      setMainText('A sua publicação irá aparecer na página inicial do site.')
      setButtonText('Publicação criada')
      setIsPublished(true)
    } else {
      setShowModalFailed(true)
    }
  }

  async function editPostInfo() {
    let midiaUrl = []
    midiaUrl.push(imagePreview)
    const response = await api.editPostInfo(post.id, text, midiaUrl);

    if (response.status === 200) {
      setShowModalSuccess(true)
      setTitle('Publicação editada com sucesso!')
      setMainText('A sua publicação irá aparecer na página inicial do site.')
      setButtonText('Publicação editada')
      setIsEdited(true)
    } else {
      setShowModalFailed(true)
    }
  }

  function exitPost() {
    localStorage.removeItem('post');
    localStorage.removeItem('editPost');
  }


  function closeModal() {
    setShowModalSuccess(false);
    setShowModalFailed(false);
    setHelpModal(false);

    if (isPublished) {
      history.push('/home')
      setIsPublished(false)
    }

    if (isEdited) {
      localStorage.clear();
      history.push('/home')
      setIsEdited(false)
    }
  }

  function handleHelp() {
    setHelpModal(!helpModal)
  }


  return (
    <>
      <Chat/>
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal}
                        showImage={false}
                        carrouselImages={[publicacao_1, publicacao_2, publicacao_3, publicacao_4, publicacao_5]}
                        htmlBody={
        <div className="andreo">
          <h1 id="ajuda-nova-publica-o">Ajuda: Nova publicação</h1>
          <p>Nesta tela é possivel criar uma nova publicação, que aparecerá no seu mural e no de seus amigos.
            Caso vocêe coloque uma ou algumas imagens, essas imagens vão aparecer também no seu Album.</p>
          <ul>
            <li><a href="#ajuda--nova-publicao">Ajuda: Nova publicação</a><ul>
              <li><a href="#o-que-preciso-em-uma-publicao">O que preciso em uma publicação?</a><ul>
                <li><a href="#criando-uma-publicao">Criando uma publicação</a></li>
                <li><a href="#como-vai-aparecer">Como vai aparecer</a></li>
              </ul>
              </li>
              <li><a href="#elementos">Elementos</a><ul>
                <li><a href="#botes">Botões</a></li>
                <li><a href="#campos">Campos</a></li>
              </ul>
              </li>
            </ul>
            </li>
          </ul>
          <h3 id="o-que-preciso-em-uma-publica-o">O que preciso em uma publicação</h3>
          <p>Na sua publicação você pode apenas colocar um texto ou apenas colocar imagens (uma ou muitas) ou colocar texto e imagens.</p>
          <h4 id="criando-uma-publica-o">Criando uma publicação</h4>
          <ol>
            <li>Caso quiser inserir imagens clique no botão Selecionar nova foto.<ol>
              <li>Para selecionar mais de uma foto, basta clicar novamente e selecionar novamente.</li>
              <li>Não existe um limite de imagens.</li>
              <li>Toda vez que se insere uma imagem, é exibido uma mensagem de confirmação.<ol>
                <li>Para fechar a mensagem, clique no X, no canto da tela.</li>
              </ol>
              </li>
            </ol>
            </li>
          </ol>
          <ol>
            <li>Caso queira inserir o texto, clique no campo, observe o cursor e digite o que desejar.<ol>
              <li>Não há limite do tamanho de texto, mas para que ele apareça bem na tela do seu amigo, não deve ser muito grande. O ideal são 300 letras, numeros, espaços e simbolos.</li>
            </ol>
            </li>
          </ol>
          <ol>
            <li>Pronto, agora se clicar em registrar sua publicação será salva e exibida no seu mural e no de seus amigos.</li>
          </ol>
          <h4 id="como-vai-aparecer">Como vai aparecer</h4>
          <p>É uma pré-visualização de como sua publicação será exibida no seu mural e no de seus amigos.</p>
          <p>Observe que se você adicionou mais de uma imagem, ao lado direito e esquerdo das imagens tem um ícone de setinha para seu respectivo lado.
            Ao clicar na setinha da direita, vai passar para a próxima imagem e da esquerda para a imagem anterior.</p>
          <h3 id="elementos">Elementos</h3>
          <p>Uma breve explicação sobre os campos e botões da tela <strong>Criar publicações</strong></p>
          <h4 id="bot-es">Botões</h4>
          <table>
            <thead>
            <tr>
              <th>Botão</th>
              <th>O que ele faz</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Selecionar uma nova foto</td>
              <td>Abre uma janela do seu computador para selecionar a sua nova imagem de perfil.</td>
            </tr>
            <tr>
              <td>Registrar</td>
              <td>Salva sua publicação e exibe para você e seus amigos no mural.</td>
            </tr>
            <tr>
              <td>Desistir da publicação</td>
              <td>Não salva a sua publicação e volta para a tela de inicio.</td>
            </tr>
            </tbody>
          </table>
          <h4 id="campos">Campos</h4>
          <p>Aqui há apenas o campo <strong>Descrição</strong> que é um campo de texto.</p>
          <div className="fim"></div>
        </div>
                        }/>
      <ModalBox
        show={showModalSuccess}
        handleClose={() => closeModal()}
        title={title}
        mainText={mainText}
        buttonText={buttonText}
        buttonClass='modal-main__button--success'
      />
      <ModalBox
        show={showModalFailed}
        handleClose={() => closeModal()}
        title='Tivemos um problema!'
        mainText='Tivemos um problema, tente novamente.'
        buttonText='Publicação não realizada!'
        buttonClass='modal-main__button--danger'
      />
      <div className='create-post-container'>
        <div className='create-post-wrapper'>
          <div className='create-post-wrapper__enter'>
            <div className='create-post-wrapper__row'>
              <div className='create-post-wrapper__layout'>
                <div className='create-post-wrapper__inputs'>
                  <button className='help-button searchFriends__help-button help-cursor' onClick={handleHelp}>Ajuda
                  </button>
                  <h1 className='create-post-title'>Nova publicação</h1>
                  <div className='profile-submit__container'>
                    <button className={selectPictureButton} disabled={editPost}>
                      Selecionar nova foto
                    </button>
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      className="create-post-submit__input"
                      onChange={addPhoto}
                      disabled={editPost}
                    />
                  </div>
                  <label className='create-post-sub-title'>Descrição</label>
                  <textarea type='text' placeholder='Escreva aqui'
                            className='create-post-wrapper__input create-post-wrapper__input--area'
                            onChange={onChangePostText} value={text}></textarea>

                </div>
              </div>
              <div className='create-post-wrapper__layout create-post-wrapper__layout--result'>
                <h1 className='create-post-title'>Como vai aparecer:</h1>
                <div className='create-post-profile'>
                  <div>
                    {user.imgUrl
                      ? <img className='create-post-profile__picture' src={user.imgUrl} alt='Foto do usuário'/>
                      : <img className='create-post-profile__picture' src={perfil} alt='Foto do usuário'/>
                    }
                  </div>
                  <div className='create-post-profile__info'>
                    <label className='create-post-profile__name'>{user.name}</label>
                    <label>{day} {nameOfMonthBR} {year}</label>
                  </div>
                </div>
                {imagePreview.length > 0
                  ?
                  <Slider {...settings}>
                    {
                      imagePreview.map((image, key) => {
                        return (
                          <div className='create-post-profile__added-photo' key={key}>
                            <img src={image} className='create-post-profile__photo' alt='foto carregada'/>
                          </div>
                        )
                      })
                    }
                  </Slider>
                  : null}
                <div className='create-post-profile__text-post'>
                  <label>{text}</label>
                </div>
              </div>
            </div>
            <div className='create-post-submit__container'>
              <Link to='/home' className='create-post-submit__button create-post-submit__button--delete link'
                    onClick={exitPost}>
                {editPost ? 'Cancelar edição' : 'Desistir da publicação'}
              </Link>
              {editPost
                ? <button className='create-post-submit__button create-post-submit__button--publish'
                          onClick={editPostInfo}>
                  Alterar publicação&nbsp;&nbsp;
                  <img src={register}/>
                </button>
                :
                <button className='create-post-submit__button create-post-submit__button--publish' onClick={createPost}>
                  Registrar&nbsp;&nbsp;
                  <img src={register}/>
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

