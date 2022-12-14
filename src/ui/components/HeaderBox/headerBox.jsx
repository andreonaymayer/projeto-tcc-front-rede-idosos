import './header.scss';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {TutorialModalBox} from '../TutorialModalBox/tutorialModalBox';
import hamburger from '../../../images/hamburger.png'
import logo from '../../../images/logoredeidosos.png'
import principal_1 from '../../../images/principal/principal-1.jpg'
import principal_2 from '../../../images/principal/principal-2.jpg'
import principal_3 from '../../../images/principal/principal-3.jpg'

// TODO aqui é o botao
export function Header() {
  const isOnPage = 'header-group__link--selected link header-group__link'
  const isNotOnPage = 'link header-group__link'
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

  function pageFinder(pathname) {
    if (window.location.pathname === pathname) {
      return isOnPage;
    } else {
      return isNotOnPage
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
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal} carrouselImages={[principal_1,principal_2,principal_3]}/>
      <div className='header-container header-container-closed'>
        {isMobile ? <div onClick={() => openHeader(true)} class="header-closed"><div>Menu</div><img className="header-container__hamburger" src={hamburger} alt='hamburguer'/></div> : null}
        <div className={showHeader}>
          <div className='header-group'>
            <div>
              {!isMobile
              ?
                <Link className='logo-link' to='/home'>
                  <img src={logo} className='header-group__logo'/>
                  <span className='logo-link__span'>Clique aqui para voltar.</span>
                </Link>
              : null}

              {isMobile
              ?
                <Link to='/home' onClick={() => openHeader(false)}>
                  <img src={logo} className='header-group__logo'/>
                  <span className='logo-link__span logo-link__span--mobile'>Clique aqui para voltar.</span>
                </Link>
              : null}
            </div>
            <div className='header-group__links'>
              <Link className={pageFinder('/profile')} to='/profile'>Meu perfil</Link>
              <Link className={pageFinder('/create-post')} to='/create-post'>Criar publicação</Link>
              <Link className={pageFinder('/home')} to='/home'>Ver publicações</Link>
              <Link className={pageFinder('/search-friend')} to='/search-friend'>Procurar por amigos</Link>
              <Link className={pageFinder('/friends-requests')} to='/friends-requests'>Solicitações de amizade</Link>
              <Link className={pageFinder('/friends')} to='/friends'>Amizades</Link>
              <Link className={pageFinder('/create-event')} to='/create-event'>Criar evento</Link>
              <Link className={pageFinder('/home-events')} to='/home-events'>Ver eventos</Link>
              <Link className={pageFinder('/album')} to='/album'>Meu álbum</Link>
            </div>
          </div>
          <div className='header-wrapper-buttons'>
            <button className='help-button-header header-button help-cursor' onClick={handleHelp}>
              Ajuda
            </button>

            <Link className='link exit-button header-button' to='/'>Sair</Link>
          </div>
        </div>
      </div>
    </>
  );
}
