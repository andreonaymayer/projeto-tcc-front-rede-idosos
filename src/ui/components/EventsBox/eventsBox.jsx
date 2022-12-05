/* eslint-disable react/prop-types */
import './events.scss';
import React, { useState } from 'react';
import perfil from '../../../images/perfil1.jpeg'
import { useHistory } from 'react-router-dom'
import { useApi } from '../../../hooks/api';

export function EventsBox({ event, handleSoftDelete, setHelpModal, helpModal, handleParticipate }) {
  const nick = sessionStorage.getItem('nickname');
  const contentClasses = event.imgUrl ? 'events__content' : 'events__content events__content--start'
  const [seeMore, setSeeMore] = useState();
  const history = useHistory();
	const api = useApi();

  function goToProfile() {
    const autor = {
      "nick": event.autor.nick,
      "name": event.autor.name,
      "url": event.autor.imgUrl,
      "details": event.autor.details,
      "city": event.autor.location.city.name,
      "state": event.autor.location.state.name
    }

    sessionStorage.setItem('user', JSON.stringify(autor));
    sessionStorage.setItem('isNotYourProfile', true);
    history.push('profile')
  }

  function handleHelp() {
    setHelpModal(!helpModal)
  }

  function handleSeeMore() {
    setSeeMore(true)
  }

  function goBackToAllEvents() {
    setSeeMore(false)
  }

	return (
    <>
      {!seeMore &&
         <div className='events-wrapper'>
         <div className='events-wrapper__layout'>
           <div className='events-profile'>
             <div className='events-profile__container' onClick={goToProfile}>
               <div>
                 {event.autor.imgUrl
                   ? <img className='events-profile__picture' src={event.autor.imgUrl} alt='Foto do usuário'/>
                   : <img className='events-profile__picture' src={perfil} alt='Foto do usuário'/>
                 }
               </div>
               <div className='events-profile__info'>
                 <label className='events-profile__title'>{event.titulo}</label>
                 <label className='events-profile__subtitle'>{event.dataEscrita}</label>
                 <label className='events-profile__subtitle'>Criado por: {event.autor.name}</label>
               </div>
             </div>

               <div className='events-delete-edit'>
                 <button className='help-button help-cursor' onClick={handleHelp}>Ajuda</button>
                 <label className='vermais' onClick={handleSeeMore}>Ver Mais</label>
                 {event.autor.nick === nick
                 ?
                   <>
                     <div onClick={() => handleSoftDelete(event)}>Excluir</div>
                   </>
                 :
                 null}
               </div>
           </div>
           <div className='events-information'>
             <div className='events-profile__text-events'>
               <label className='events-profile__text-size'>{event.descricao}</label>
             </div>
           </div>
         </div>
       </div>
      }
      {seeMore &&
        <div className='events'>
          <div className='events-see-more'>
            <div className='events__details'>
              <h3>Detalhes do evento: {event.titulo}</h3>
              <div className='vermais'  onClick={goBackToAllEvents}>Voltar aos eventos</div>
            </div>

            <div className='events-profile__container' onClick={goToProfile}>
              <div>
                {event.autor.imgUrl
                  ? <img className='events-profile__picture' src={event.autor.imgUrl} alt='Foto do usuário'/>
                  : <img className='events-profile__picture' src={perfil} alt='Foto do usuário'/>
                }
              </div>
              <div className='events-profile__info'>
                <label className='events-profile__title'>{event.autor.name}</label>
                <label className='events-profile__subtitle'>Data: {event.dataEscrita}</label>
                <label className='events-profile__subtitle'>Acontece em: {event.location.city.name},  {event.location.state.name}</label>
              </div>
            </div>
            <div className={contentClasses}>
              <label className='events__description'>{event.descricao}</label>
              {event.imgUrl &&
                <img src={event.imgUrl} alt="Imagem do evento"  className='events__image'/>
              }
            </div>
            <div className='events__group'>
              <div className='events__participate'>
                <label className='events-profile__title'>Participantes:</label>
                <button className='events__button-participate' onClick={() => handleParticipate(event)}>Participar</button>
              </div>
              {event.participantes.length === 0
              ? <label>O evento ainda não possui participantes.</label>
              :
                <div>
                  {event.participantes.map(participante =>
                    <img src={participante.imgUrl ? participante.imgUrl : perfil} className="events__participants" alt="foto do participante" onClick={goToProfile} />
                  )}
                </div>
              }
            </div>
          </div>
        </div>
      }
    </>
	);
}

