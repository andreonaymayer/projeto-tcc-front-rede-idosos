import './chat.scss';
import React, {useState} from 'react';
import {TutorialModalBox} from '../TutorialModalBox/tutorialModalBox';
import principal_1 from '../../../images/principal/principal-1.jpg'
import principal_2 from '../../../images/principal/principal-2.jpg'
import principal_3 from '../../../images/principal/principal-3.jpg'

// TODO aqui é o botao
export function Chat() {
  const [helpModal, setHelpModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  function openChat(clicked = false) {
    if (clicked) {
      setIsChatOpen(true)
    } else {
      setIsChatOpen(false)
    }
  }

  function closeModal() {
    setHelpModal(false);
  }

  return (
    <>
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal} carrouselImages={[principal_1,principal_2,principal_3]}/>
      <div className='chat-container chat-container-closed'>
        <div className='chat-group'>
          {!isChatOpen && <button className='chat-button chat-button--open' onClick={() => openChat(true)}>Abrir Chat</button>}
          {isChatOpen && <button className='chat-button' onClick={() => openChat(false)}>Fechar Chat</button>}
        </div>
        {isChatOpen &&
          <div className='chat-content'>
            oi tuydo bem
          </div>
        }
      </div>
    </>
  );
}
