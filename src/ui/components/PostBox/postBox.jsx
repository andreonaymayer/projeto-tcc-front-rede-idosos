/* eslint-disable react/prop-types */
import './post.scss';
import React, { useState } from 'react';
import perfil from '../../../images/perfil.jpeg'
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import { useApi } from '../../../hooks/api';

export function PostBox({ post, handleSoftDelete, isMyPost, handleReaction, handleCommment, setHelpModal, helpModal }) {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const history = useHistory();
	const api = useApi();
  const nameOfMonthBR = date.toLocaleString('pt-BR', {
    month: 'long',
  });
  const postInformation = post.midiaUrls.length == 0 ? 'post-information justifyStart' : 'post-information'

  const settings = {
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  async function handleEditPost() {
    localStorage.setItem('post', JSON.stringify(post));
    localStorage.setItem('editPost', true);
    history.push('create-post')
	}

  function goToProfile() {
    const autor = {
      "nick": post.autor.nick,
      "name": post.autor.name,
      "url": post.autor.imgUrl,
      "details": post.autor.descricao,
      "city": post.autor.cidade,
      "state": post.autor.estado
    }

    sessionStorage.setItem('user', JSON.stringify(autor));
    sessionStorage.setItem('isNotYourProfile', true);
    history.push('profile')
  }

  function handleHelp() {
    setHelpModal(!helpModal)
  }

	return (
    <div className='post-wrapper'>
      <div className='post-wrapper__layout'>
        <div className='post-profile'>
          <div className='post-profile__container' onClick={goToProfile}>
            <div>
              {post.autor.imgUrl
                ? <img className='post-profile__picture' src={post.autor.imgUrl} alt='Foto do usuário'/>
                : <img className='post-profile__picture' src={perfil} alt='Foto do usuário'/>
              }
            </div>
            <div className='post-profile__info'>
              <label className='post-profile__name'>{post.autor.name}</label>
              <label>{day} {nameOfMonthBR} {year}</label>
            </div>
          </div>

            <div className='post-delete-edit'>
              <button className='help-button' onClick={handleHelp}>Ajuda</button>
              {isMyPost
              ?
                <>
                  <div onClick={() => handleSoftDelete(post)}>Excluir</div>
                  <div onClick={handleEditPost}>Editar</div>
                </>
              :
              null}
            </div>
        </div>
        <div className={postInformation}>
          {post.midiaUrls.length > 0
          ?
            <Slider {...settings}>
            {
              post.midiaUrls.map((image, key) => {
                return (
                  <div className='post-profile__added-photo' key={key}>
                    <img src={image} className='post-profile__photo' alt='foto carregada'/>
                  </div>
                )
              })
            }
            </Slider>
          : null
          }
          <div className='post-profile__text-post'>
            <label>{post.conteudo}</label>
          </div>
        </div>
        <div className='post-buttons'>
          <button className='post-button' onClick={() => handleReaction(post.id)}>Interessante ({post.reaccoes.length})</button>
          <button className='post-button' onClick={() => handleCommment(post)}>Comentar</button>
          <button className='post-button'>Compartilhar</button>
        </div>
      </div>
    </div>
	);
}

