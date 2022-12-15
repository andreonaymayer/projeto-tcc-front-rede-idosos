/* eslint-disable react/prop-types */
import './profile.scss';
import '../../../../src/assets/help_styles.scss'
import React, {useEffect, useState} from 'react';
import back from '../../../images/back.svg'
import register from '../../../images/register.svg'
import perfil from '../../../images/perfil1.jpeg'
import {Link} from 'react-router-dom';
import {useApi} from '../../../hooks/api';
import {ModalBox, TutorialModalBox, Chat} from '../index';

import ajudaPerfil_1 from '../../../images/perfil/perfil-1.jpg'
import ajudaPerfil_2 from '../../../images/perfil/perfil-2.jpg'
import ajudaPerfil_3 from '../../../images/perfil/perfil-3.jpg'
import ajudaPerfil_4 from '../../../images/perfil/perfil-4.jpg'
import ajudaPerfil_5 from '../../../images/perfil/perfil-5.jpg'
import ajudaPerfil_6 from '../../../images/perfil/perfil-6.jpg'

export function Profile({user, birth}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [birthDate, setBirthDate] = useState(birth);
  const [details, setDetails] = useState(user.details);
  const [states, setStates] = useState();
  const [city, setCity] = useState(user.city);
  const [cities, setCities] = useState('');
  const [imagePreview, setImagePreview] = useState();
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [title, setTitle] = useState(false);
  const [mainText, setMainText] = useState(false);
  const [buttonText, setButtonText] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const isMobile = window.innerWidth < 500;
  const api = useApi();

  async function showCity(stateId, cityId) {
    const response = await api.showCities(stateId);
    if (response && response.status === 200) {
      await response.data.forEach(function (item, i) {
        if (item.id === cityId) {
          response.data.splice(i, 1);
          response.data.unshift(item);
        }
      });
      setCities(response.data)
    }
  }

  async function updateProfilePicture(imgUrl) {
    const response = await api.updatePicture(imgUrl);
    if (response && response.status === 200) {
      setShowModalSuccess(true)
    }
  }

  useEffect(() => {
    async function showState(stateId) {
      const response = await api.showStates();
      if (response && response.status === 200) {
        await response.data.forEach(function (item, i) {
          if (item.id === stateId) {
            response.data.splice(i, 1);
            response.data.unshift(item);
          }
        });
        setStates(response.data)
      }
    }

    async function showStateSelected() {
      const response = await api.showStateSelected(user.city);
      if (response && response.status === 200) {
        showState(response.data.state.id);
        showCity(response.data.state.id, response.data.city.id);
      }
    }

    showStateSelected();
  }, []);


  async function putUserInfo() {
    const response = await api.putUserInfo(email, name, birthDate, details, city);
    if (response && response.status === 200) {
      setShowModalSuccess(true)
      setTitle('Informações alteradas!')
      setMainText('As suas informações foram alteradas corretamente.')
      setButtonText('Alterações realizadas')
    } else {
      setShowModalFailed(true)
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    putUserInfo();
  }

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onChangeState(event) {
    showCity(event.target.value);
  }

  function onChangeDetails(event) {
    setDetails(event.target.value);
  }

  function onChangeCity(event) {
    setCity(event.target.value);
  }

  function onChangeBirthDate(event) {
    setBirthDate(event.target.value);
  }

  async function addPhoto(event) {
    let file = event.target.files[0];
    let image = new FormData();
    image.append('file', file);
    event.target.value = null;
    const response = await api.profileImage(image);
    setImagePreview(response.data);
    updateProfilePicture(response.data);

    if (response.status === 200) {
      setShowModalSuccess(true)
      setTitle('Imagem adicionada!')
      setMainText('A sua imagem foi alterada com sucesso')
      setButtonText('Imagem adicionada com sucesso')
    } else {
      setShowModalFailed(true)
    }
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
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal}
                        carrouselImages={[ajudaPerfil_1, ajudaPerfil_2, ajudaPerfil_3, ajudaPerfil_4, ajudaPerfil_5, ajudaPerfil_6]}
                        showImage={false} htmlBody={
        <div className="andreo">
          <h1 id="ajuda-meu-perfil">Ajuda: Meu perfil</h1>
          <p>Nesta seção, você pode observar suas informações, altera-las e colocar ou alterar sua foto do perfil.</p>
          <ul>
            <li><a href="#ajuda--meu-perfil">Ajuda: Meu perfil</a>
              <ul>
                <li><a href="#como-adicionar-ou-alterar-imagem-de-perfil">Como adicionar ou alterar imagem de perfil</a>
                </li>
                <li><a href="#elementos">Elementos</a>
                  <ul>
                    <li><a href="#botes">Botões</a></li>
                    <li><a href="#campos">Campos</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <h2 id="como-adicionar-ou-alterar-imagem-de-perfil">Como adicionar ou alterar imagem de perfil</h2>
          <p>Ao se cadastrar, seu perfil vem com a foto padrão da nossa rede.</p>
          <p>Para adicionar uma imagem, você precida saber onde ela está em seu computador
            (pasta ou diretório).</p>
          <p>Sabendo onde está a foto basta clicar no botão <strong>Selecione uma nova foto</strong>
            ao clicar, seu computador vai abrir uma janela para procurar pelo arquivo nas pastas do seu computador.</p>
          <p>Após selecionar, confirme no botão do canto.</p>
          <p><strong><em>Como será aberta a janela de localização da imagem, vai depender do seu sistema.</em></strong>
          </p>
          <h2 id="elementos">Elementos</h2>
          <p>Uma breve explicação sobre os campos e botões da tela <strong>Meu perfil</strong></p>
          <h3 id="bot-es">Botões</h3>
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
              <td>Registrar modificações</td>
              <td>Conclui a sua modificação, salva as novas informaçõe e volta para a tela inicial.</td>
            </tr>
            <tr>
              <td>Alterar senha</td>
              <td>Vai para a tela de troca de senha.</td>
            </tr>
            <tr>
              <td>Não desejo mudar nada</td>
              <td>Volta para a tela inicial sem modificar as informações do campo.</td>
            </tr>
            </tbody>
          </table>
          <h3 id="campos">Campos</h3>
          <table>
            <thead>
            <tr>
              <th>Nome do campo</th>
              <th>Para que serve</th>
              <th>Ação</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Nome</td>
              <td>Identificar você pelo nome. Pode ser apenas o primeiro e ultimo nome.</td>
              <td>Clicar e escrever</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>Vai ser a sua identidade dentro da rede social, e também servirá caso precise recuperar a senha deste
                sistema.
              </td>
              <td>Clicar e escrever</td>
            </tr>
            <tr>
              <td>Senha</td>
              <td>É a senha que será usada para identificação para quando for entrar na rede social.</td>
              <td>Clicar e escrever</td>
            </tr>
            <tr>
              <td>Data de nascimento</td>
              <td>É a sua data de nascimento, para que seus amigos saibam quando é seu aniversário</td>
              <td>Clicar e escrever ou selecionar a data clicando no ícone do calendário</td>
            </tr>
            <tr>
              <td>Estado</td>
              <td>É o estado em que está morando atualmente. Servirá para a criação de eventos no durante o uso da rede,
                se for do seu interesse criar alguma.
              </td>
              <td>Clicar e selecionar</td>
            </tr>
            <tr>
              <td>Cidade</td>
              <td>É a cidade em que está morando atualmente.</td>
              <td>Clicar e selecionar</td>
            </tr>
            <tr>
              <td>Bio</td>
              <td>Aqui você pode escrever o que quiser sobre você. Dica: escreva sobre seus passa-tempos, seus gostos
                musicais, seus animais de estimação e tudo que quiser.
              </td>
              <td>Clicar e escrever</td>
            </tr>
            </tbody>
          </table>

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
        buttonText='Cadastro não realizado!'
        buttonClass='modal-main__button--danger'
      />
      <div className='profile-container'>
        <div className='profile-wrapper'>
          <div className='profile-wrapper__enter'>
            <div className='profile-wrapper__layout'>
              <div className='profile-wrapper__inputs'>
                <h1 className='profile-title'>Minhas informações</h1>
                {isMobile ?
                  <button className='help-button profile-submit__help help-cursor'
                          onClick={handleHelp}>Ajuda</button> : null}
                {isMobile
                  ?
                  imagePreview || user.imgUrl
                    ? <img className='profile-wrapper__image' src={imagePreview ? imagePreview : user.imgUrl}
                           alt='Foto do usuário'/>
                    : <img className='profile-wrapper__image' src={perfil} alt='Foto do usuário'/>
                  : null
                }
                <label className='profile-wrapper__input-password'>Nome</label>
                <input type='text' placeholder='Digite seu nome aqui' className='profile-wrapper__input'
                       onChange={onChangeName} value={name}></input>
                <label className='profile-wrapper__input-password'>Email</label>
                <input type='email' placeholder='Digite seu e-mail aqui' className='profile-wrapper__input'
                       onChange={onChangeEmail} value={email}></input>
                <label className='profile-wrapper__input-password'>Data de nascimento</label>
                <input type='date' placeholder='Exemplo: 01/01/1962' className='profile-wrapper__input'
                       onChange={onChangeBirthDate} value={birthDate}></input>
                <label className='profile-wrapper__input-password'>Estado</label>
                <select onClick={onChangeState} className='profile-wrapper__input profile-wrapper__input--select'>
                  {states && states.map(state => <option key={state.id} value={state.id}
                                                         selected={state.id === states[0].id}>{state.name}</option>)}
                </select>
                <label className='profile-wrapper__input-password'>Cidade</label>
                <select onClick={onChangeCity} className='profile-wrapper__input profile-wrapper__input--select'
                        disabled={!cities}>{cities && cities.map(city => <option key={city.id}
                                                                                 value={city.id}>{city.name}</option>)}</select>
                <label className='profile-wrapper__input-password'>Bio</label>
                <textarea type='text' placeholder='Fale sobre você'
                          className='profile-wrapper__input profile-wrapper__input--area' onChange={onChangeDetails}
                          value={details}></textarea>
              </div>
            </div>

            <div className='profile-wrapper__layout'>
              <div className='profile-wrapper__editor'>
                {!isMobile
                  ?
                  imagePreview || user.imgUrl
                    ? <img className='profile-wrapper__image' src={imagePreview ? imagePreview : user.imgUrl}
                           alt='Foto do usuário'/>
                    : <img className='profile-wrapper__image' src={perfil} alt='Foto do usuário'/>
                  :
                  null
                }
                <div className='profile-submit__container'>
                  <button className='profile-submit__button profile-submit__button--image'>
                    Selecionar uma nova foto
                  </button>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    className="clicavel profile-submit__input"
                    onChange={addPhoto}
                  />
                </div>
              </div>

              <div className='profile-wrapper__editor'>
                <button className='profile-submit__button' onClick={handleSubmit}>
                  Registrar modificações&nbsp;&nbsp;
                  <img src={register}/>
                </button>

                <Link to="/change-password" className='profile-submit__button link'>
                  Alterar senha&nbsp;&nbsp;
                  <img src={back} className="back-image-rotate"/>
                </Link>
                <Link to='/home' className='profile-submit__button profile-submit__button--reset link'>
                  Não desejo mudar nada&nbsp;&nbsp;
                  <img src={back}/>
                </Link>
              </div>
            </div>
            {!isMobile ?
              <button className='help-button profile-submit__help help-cursor'
                      onClick={handleHelp}>Ajuda</button> : null}
          </div>
        </div>
      </div>
    </>
  );
}
