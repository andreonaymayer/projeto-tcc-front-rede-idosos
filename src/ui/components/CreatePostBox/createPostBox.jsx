/* eslint-disable react/prop-types */
import './post.scss';
import React, { useState } from 'react';
import register from '../../../images/register.svg'
import { useApi } from '../../../hooks/api';
import perfil from '../../../images/perfil.jpeg'
import { Link, useHistory } from 'react-router-dom';

export function CreatePostBox({ user }) {
  const post = JSON.parse(localStorage.getItem('post'))
  const editPost = localStorage.getItem('editPost');
	const [text, setText] = useState(post.conteudo ? post.conteudo : '');
  const [imagePreview, setImagePreview] = useState(post.midiaUrls[0] ? post.midiaUrls[0] : null);
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const history = useHistory();
  const nameOfMonthBR = date.toLocaleString('pt-BR', {
    month: 'long',
  });
	const api = useApi();

	function onChangePostText(event) {
		setText(event.target.value);
	}

  async function addPhoto(event) {
		event.preventDefault();
    let file = event.target.files[0];
    let image = new FormData();
    image.append('file', file);
    event.target.value = null;
    const response = await api.postImage(image);
    setImagePreview(response.data);

    if (response.status === 200) {
      alert('imagem carregada com sucesso')
    } else {
      alert('imagem com erro')
    }
	}

  async function createPost() {
    let midiaUrl = []
    midiaUrl.push(imagePreview)
    const response = await api.createPost(text, midiaUrl);

    if (response.status === 200) {
      alert('imagem carregada com sucesso')
      history.push('/home')
    } else {
      alert('imagem com erro')
    }
	}

  async function editPostInfo() {
    let midiaUrl = []
    midiaUrl.push(imagePreview)
    console.log(imagePreview)
    const response = await api.editPostInfo(post.id, text, midiaUrl);

    if (response.status === 200) {
      alert('imagem carregada com sucesso')
      localStorage.clear();
      history.push('/home')
    } else {
      alert('imagem com erro')
    }
	}



	return (
		<div className='create-post-container'>
      <div className='create-post-wrapper'>
        <div className='create-post-wrapper__enter'>
          <div className='create-post-wrapper__row'>
            <div className='create-post-wrapper__layout'>
              <div className='create-post-wrapper__inputs'>
                <h1 className='create-post-title'>Nova publicação</h1>
                <div className='profile-submit__container'>
                  <button className='create-post-submit__button'>
                    Selecionar nova foto
                  </button>
                  <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      className="create-post-submit__input"
                      onChange={addPhoto}
                    />
                </div>
                <label className='create-post-sub-title'>Descrição</label>
                <textarea type='text' placeholder='Escreva aqui' className='create-post-wrapper__input create-post-wrapper__input--area' onChange={onChangePostText} value={text}></textarea>

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
              {imagePreview
              ? <div className='create-post-profile__added-photo'>
                  <img src={imagePreview} className='create-post-profile__photo' alt='foto carregada'/>
                </div>
              : null}
              <div className='create-post-profile__text-post'>
                <label>{text}</label>
              </div>
            </div>
          </div>
          <div className='create-post-submit__container'>
            <Link to='/home' className='create-post-submit__button create-post-submit__button--delete link'>
              Desistir da publicação
            </Link>
            {editPost
              ? <button className='create-post-submit__button create-post-submit__button--publish' onClick={editPostInfo}>
                  Alterar publicação&nbsp;&nbsp;
                  <img src={register} />
                </button>
              : <button className='create-post-submit__button create-post-submit__button--publish' onClick={createPost}>
                  Registrar&nbsp;&nbsp;
                  <img src={register} />
                </button>
            }
          </div>
        </div>
      </div>
    </div>
	);
}

