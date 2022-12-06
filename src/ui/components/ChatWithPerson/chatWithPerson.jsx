import './chatWithPerson.scss';
import React, {useEffect, useState} from 'react';
import {useApi} from '../../../hooks/api';
import seta from '../../../images/send.svg'

export function ChatWithPerson({closeChat, chatMessages, chatId, getChatMessages}) {
  const [messageText, setMessageText] = useState('');
  const [isMessageSended, setIsMessageSended] = useState(false);
  const api = useApi();

  function handleSendMessage(event) {
    setMessageText(event.target.value);
  }

  async function sendMessage() {
    if (messageText.length === 0) return;

    const response = await api.sendMessage(chatId, messageText);

    if (response && response.status === 200) {
      setMessageText('')
      getChatMessages(chatId)
      setIsMessageSended(!isMessageSended)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      async function checkMessages() {
        const response = await api.checkForNewMessages(chatId);
        if (response && response.status === 200) {
          if (chatMessages.length < response.data) {
            getChatMessages(chatId)
          }
        }
      }

      checkMessages();
    }, 3000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [isMessageSended, api])


  return (
    <div className='chat-with-person'>
      <div className='chat-container chat-container-closed'>
        <div className='chat-group'>
          <button className='chat-button' onClick={closeChat}>Fechar conversar</button>
        </div>
        <div className='chat-content'>
          <div className='chat-message__container'>
            {chatMessages && chatMessages.length > 0 && chatMessages.map(messages =>
              <div className={messages.myProfile ? 'chat-message__my-message chat-message' : 'chat-message'}>
                <label className='chat-message__name'>{messages.nameRemetente}</label>
                <label className={messages.myProfile ? 'chat-message__my-text' : ''}>
                  {messages.text.replace('{"mensagem":"', '').replace('"}', '')}
                </label>
              </div>
            )}
          </div>
          <div className='chat-friends__send-message'>
            <div className='chat-friends__send-message__ladoALado'>
              <input type="text" placeholder='Envie sua mensagem' onChange={handleSendMessage}
                     className="chat-friends__input" value={messageText}></input>
              <button class="chat-friends__send" onClick={sendMessage}><img src={seta}/></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
