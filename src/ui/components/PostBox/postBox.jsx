/* eslint-disable react/prop-types */
import './post.scss';
import React, { useState } from 'react';
import register from '../../../images/register.svg'
import { Link } from 'react-router-dom';
import { useApi } from '../../../hooks/api';

export function PostBox() {
	const [text, setText] = useState();
  const [imagePreview, setImagePreview] = useState();
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
          <div>
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
            <div className='post-wrapper__layout'>
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

