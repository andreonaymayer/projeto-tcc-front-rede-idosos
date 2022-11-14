/* eslint-disable react/prop-types */
import './post.scss';
import React, { useState } from 'react';
import register from '../../../images/register.svg'
import { useApi } from '../../../hooks/api';
import perfil from '../../../images/perfil.jpeg'
import exemplo from '../../../images/imagem_exemplo_2.jpeg'

export function PostBox() {
	const [text, setText] = useState();
  const [imagePreview, setImagePreview] = useState();
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
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

	return (
		<div className='post-container'>
      <div className='post-wrapper'>
        <div className='post-wrapper__enter'>
          <div className='post-wrapper__row'>
            <div className='post-wrapper__layout'>
              <div className='post-wrapper__inputs'>
                <h1 className='post-title'>Nova publicação</h1>
                <div className='profile-submit__container'>
                  <button className='post-submit__button'>
                    Selecionar nova foto
                  </button>
                  <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      className="post-submit__input"
                      onChange={addPhoto}
                    />
                </div>
                <label className='post-sub-title'>Descrição</label>
                <textarea type='text' placeholder='Escreva aqui' className='post-wrapper__input post-wrapper__input--area' onChange={onChangePostText} value={text}></textarea>

              </div>
            </div>
            <div className='post-wrapper__layout post-wrapper__layout--result'>
              <h1 className='post-title'>Como vai aparecer:</h1>
              <div className='post-profile'>
                <div>
                  <img className='post-profile__picture' src={perfil} alt='Foto do usuário'/>
                </div>
                <div className='post-profile__info'>
                  <label className='post-profile__name'>Carlos Kasper</label>
                  <label>{day} {nameOfMonthBR} {year}</label>
                </div>
              </div>
              <div className='post-profile__added-photo'>
                <img src={exemplo} className='post-profile__photo' alt='foto carregada'/>
              </div>
              <div className='post-profile__text-post'>
                <label>Mama mama mama mama</label>
              </div>
            </div>
          </div>
          <div className='post-submit__container'>
            <button className='post-submit__button post-submit__button--delete'>
              Desistir da publicação
            </button>
            <button className='post-submit__button post-submit__button--publish'>
              Registrar&nbsp;&nbsp;
              <img src={register} />
            </button>
          </div>
        </div>
      </div>
    </div>
	);
}

