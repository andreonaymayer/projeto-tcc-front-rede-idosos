import './header.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {

	return (
		<div className='header-container'>
      <div className='header-group'>
        <div className='header-group__title'>Menu</div>
        <div className='header-group__links'>
          <Link className='link header-group__link' to='/profile'>Meu perfil</Link>
          <Link className='link header-group__link' to='/friends'>Ver amigos</Link>
          <Link className='link header-group__link' to='/pages'>Ver páginas</Link>
          <Link className='link header-group__link' to='/events'>Ver Eventos</Link>
          <Link className='link header-group__link' to='/feed'>Ver publicações</Link>
        </div>
      </div>
      <div className='header-group'>
        <div className='header-group__title'>Conversas</div>
        <div className='header-group__links'>
          <Link className='link header-group__link' to='/chat'>Meu perfil</Link>
          <Link className='link header-group__link' to='/chat'>Meu perfil</Link>
          <Link className='link header-group__link' to='/chat'>Meu perfil</Link>
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
	);
}
