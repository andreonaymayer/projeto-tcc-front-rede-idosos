import './header.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {

  function openHeader(clicked = false) {
    const header = document.getElementsByClassName('header-test');
    const headerClosed = document.getElementsByClassName('header-closed');
    const headerContainer = document.getElementsByClassName('header-container');
    if (header[0] && headerClosed[0] && headerContainer[0]) {
      if (clicked) {
        headerContainer[0].classList.remove('header-container-closed')
        header[0].classList.remove('display-none')
        headerClosed[0].classList.add('display-none')
      } else {
        header[0].classList.remove('display-flex')
        headerContainer[0].classList.add('header-container-closed')
        header[0].classList.add('display-none')
        headerClosed[0].classList.remove('display-none')
      }
    }

  }

	return (
		<div className='header-container'>
      <div onClick={() => openHeader(true)} class="header-closed display-none">Menu</div>
      <div className='header-test'>
        <div className='header-group'>
          <div>
            <div className='header-group__title' onClick={() => openHeader(false)}>Menu</div>
          </div>
          <div className='header-group__links'>
            <Link className='link header-group__link' to='/profile'>Meu perfil</Link>
            <Link className='link header-group__link' to='/create-post'>Criar publicação</Link>
            <Link className='link header-group__link' to='/home'>Ver publicações</Link>
            <Link className='link header-group__link' to='/search-friend'>Procurar por amigos</Link>
            <Link className='link header-group__link' to='/friends-requests'>Solicitações de amizade</Link>
            <Link className='link header-group__link' to='/friends'>Amizades</Link>
          </div>
        </div>
        <div className='header-group'>
          <div className='header-group__title'>Conversas</div>
          <div className='header-group__links'>
            <Link className='link header-group__link' to='/chat'>--Meu perfil</Link>
            <Link className='link header-group__link' to='/chat'>--Meu perfil</Link>
            <Link className='link header-group__link' to='/chat'>--Meu perfil</Link>
          </div>
        </div>
        <div className='header-wrapper-buttons'>
          <button className='help-button header-button'>
            Ajuda
          </button>
          <button className='exit-button header-button'>
            Sair
          </button>
        </div>
      </div>
    </div>
	);
}
