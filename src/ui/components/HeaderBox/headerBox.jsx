import './header.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TutorialModalBox } from '../TutorialModalBox/tutorialModalBox';
import perfil from '../../../images/perfil.jpeg'

export function Header() {
	const [helpModal, setHelpModal] = useState(false);
  const isMobile = window.innerWidth < 500;
  const showHeader = !isMobile ? 'header-test' : 'header-test display-none';

  function openHeader(clicked = false) {
    if (!isMobile) return;

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


  function closeModal() {
    setHelpModal(false);
	}

  function handleHelp() {
    setHelpModal(!helpModal)
  }

	return (
		<>
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal} carrouselImages={[perfil, perfil, perfil]}/>
      <div className='header-container header-container-closed'>
        {isMobile ? <div onClick={() => openHeader(true)} class="header-closed">Menu</div> : null}
        <div className={showHeader}>
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
          </div>
          <div className='header-wrapper-buttons'>
            <button className='help-button-header header-button' onClick={handleHelp}>
              Ajuda
            </button>

            <Link className='link exit-button header-button' to='/'>Sair</Link>
          </div>
        </div>
      </div>
    </>
	);
}
