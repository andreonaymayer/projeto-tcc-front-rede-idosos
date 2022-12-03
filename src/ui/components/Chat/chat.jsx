import './chat.scss';
import React, {useEffect, useState} from 'react';
import {TutorialModalBox} from '../TutorialModalBox/tutorialModalBox';
import principal_1 from '../../../images/principal/principal-1.jpg'
import principal_2 from '../../../images/principal/principal-2.jpg'
import principal_3 from '../../../images/principal/principal-3.jpg'
import { useApi } from '../../../hooks/api';
import perfil from '../../../images/perfil1.jpeg'
import { ChatWithPerson } from '../ChatWithPerson/chatWithPerson';

export function Chat() {
  const [helpModal, setHelpModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
	const [friends, setFriends] = useState();
  const [searchText, setSearchText] = useState('');
  const [chatId, setChatId] = useState('');
  const [profiles, setProfiles] = useState();
  const [chatOpened, setChatOpened] = useState(false);
  const [chatMessages, setChatMessages] = useState();
	const api = useApi();


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

  useEffect(() => {
    async function showFriends() {
      const response = await api.showFriends();
      if (response && response.status === 200) {
        setFriends(response.data)
      }
    }

    async function showProfiles() {
      const response = await api.showProfiles(searchText);
      if (response && response.status === 200) {
        setProfiles(response.data)
      }
    }

    showProfiles();
    showFriends();
  }, [searchText]);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  async function newChat(nick) {
    const response = await api.startChat(nick);
    if (response && response.status === 200) {
      setChatId(response.data.id)
      setChatOpened(true)
    } else if (response.status === 400) {
      const chatIdRegex = response.data.message.substr([response.data.message.length - 6], response.data.message.length);
      setChatId(chatIdRegex.replace(/\D/g, ""))
      setChatOpened(true)
      getChatMessages(chatIdRegex.replace(/\D/g, ""))
    }
  }

  async function getChatMessages(chatId) {
    const response = await api.getChatMessages(chatId);
    if (response && response.status === 200) {
      setChatMessages(response.data)
    }
  }


  function handleStartChat(nick) {
    newChat(nick);
  }

  function closeChat() {
    setChatOpened(false)
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
            <input type="text" placeholder='Procurar amigos' onChange={handleSearchText} className="chat-friends__input" value={searchText}></input>
            <div className='chat-friends__overflow'>
              {friends && friends.length > 0 && profiles.length === 0 && (
                friends.map(friend =>
                  <div className='chat-friends chat-friends__container'>
                    <div className='chat-friends'>
                      <img className='chat-friends__image' src={friend.url ? friend.url : perfil} alt="Foto de perfil" />
                      <label className='chat-friends__name'>{friend.name}</label>
                    </div>
                    <div className='chat-friends'>
                      <button className='chat-friends__button' onClick={() => handleStartChat(friend.nick)}>Conversar</button>
                    </div>
                  </div>
                )
              )}

              {profiles && profiles.length > 0 && (
                profiles.map(friend =>
                  <div className='chat-friends chat-friends__container'>
                    <div className='chat-friends'>
                      <img className='chat-friends__image' src={friend.url ? friend.url : perfil} alt="Foto de perfil" />
                      <label className='chat-friends__name'>{friend.name}</label>
                    </div>
                    <div className='chat-friends'>
                      <button className='chat-friends__button' onClick={() => handleStartChat(friend.nick)}>Conversar</button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        }
      </div>
      {chatId && chatOpened && (
        <ChatWithPerson  closeChat={closeChat} chatMessages={chatMessages} chatId={chatId} getChatMessages={getChatMessages}/>
      )}
    </>
  );
}
