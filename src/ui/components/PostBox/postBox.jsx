/* eslint-disable react/prop-types */
import './post.scss';
import React from 'react';
import { useApi } from '../../../hooks/api';
import perfil from '../../../images/perfil.jpeg'
import { useHistory } from 'react-router-dom';

export function PostBox({ post }) {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const history = useHistory();
  const nameOfMonthBR = date.toLocaleString('pt-BR', {
    month: 'long',
  });
	const api = useApi();

  async function handleSoftDelete() {
    const response = await api.softDeletePost(post.id);

    if (response.status === 200) {
      alert('detelado mermao')
    } else {
      alert('nao deletado')
    }
	}

  async function handleEditPost() {
    localStorage.setItem('post', JSON.stringify(post));
    localStorage.setItem('editPost', true);
    history.push('create-post')
	}

	return (
    <div className='post-wrapper'>
      <div className='post-wrapper__layout'>
        <div className='post-profile'>
          <div className='post-profile__container'>
            <div>
              {post.autor.img
                ? <img className='post-profile__picture' src={post.autor.img} alt='Foto do usuário'/>
                : <img className='post-profile__picture' src={perfil} alt='Foto do usuário'/>
              }
            </div>
            <div className='post-profile__info'>
              <label className='post-profile__name'>{post.autor.name}</label>
              <label>{day} {nameOfMonthBR} {year}</label>
            </div>
          </div>
          <div onClick={handleSoftDelete}>X</div>
          <div onClick={handleEditPost}>vamo editar bebe</div>
        </div>
        <div className='post-information'>
          {post.midiaUrls.length > 0
            ? <div className='post-profile__added-photo'>
                <img src={post.midiaUrls[0]} className='post-profile__photo' alt='foto carregada'/>
              </div>
            : null
          }
          <div className='post-profile__text-post'>
            <label>{post.conteudo}</label>
          </div>
        </div>
        <div className='post-buttons'>
          <button className='post-button'>Interessante</button>
          <button className='post-button'>Comentar</button>
          <button className='post-button'>Compartilhar</button>
        </div>
      </div>
    </div>
	);
}

