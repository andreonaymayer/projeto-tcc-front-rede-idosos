/* eslint-disable react/prop-types */
import './post.scss';
import React from 'react';
import { useApi } from '../../../hooks/api';
import perfil from '../../../images/perfil.jpeg'
import exemplo from '../../../images/imagem_exemplo_2.jpeg'

export function PostBox({ postInfo }) {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const nameOfMonthBR = date.toLocaleString('pt-BR', {
    month: 'long',
  });
	const api = useApi();

	return (
    <div className='post-wrapper'>
      <div className='post-wrapper__layout'>
        <div className='post-profile'>
          <div>
            <img className='post-profile__picture' src={perfil} alt='Foto do usuário'/>
          </div>
          <div className='post-profile__info'>
            <label className='post-profile__name'>Carlos Kasper</label>
            <label>{day} {nameOfMonthBR} {year}</label>
          </div>
        </div>
        <div className='post-information'>
          <div className='post-profile__added-photo'>
            <img src={exemplo} className='post-profile__photo' alt='foto carregada'/>
          </div>
          <div className='post-profile__text-post'>
            <label>Mama mama mama mama</label>
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

