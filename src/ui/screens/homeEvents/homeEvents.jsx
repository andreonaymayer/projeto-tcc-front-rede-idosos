import React, {useEffect, useState} from 'react';
import {useApi} from '../../../hooks/api';
import {Chat, EventsBox, Header, ModalBox} from '../../components';
import './events.scss'

export function HomeEventsScreen() {
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [renderPosts, setRenderPosts] = useState(false);
  const [events, setEvents] = useState([]);
  const [helpModal, setHelpModal] = useState(false);
  const [svgClasses, setSvgClasses] = useState('home-container__svg');
  const api = useApi();

  useEffect(() => {
    async function listEvents() {
      const response = await api.listEvents();
      if (response.status === 200) {
        setEvents(response.data)
      }
    }

    listEvents();
  }, [showModalSuccess, renderPosts]);

  async function handleSoftDelete(event) {
    const response = await api.deleteEvent(event.id);

    if (response.status === 200) {
      setShowModalSuccess(true)
    } else {
      setShowModalFailed(true);
    }
  }

  async function handleParticipate(event) {
    const response = await api.participateEvent(event.id);

    if (response.status === 200) {
      setRenderPosts(!renderPosts)
    }
  }


  function closeModal() {
    setShowModalSuccess(false);
    setShowModalFailed(false);
    setHelpModal(false);
  }

  function renderNewPosts() {
    setRenderPosts(!renderPosts)
    setSvgClasses('home-container__show-svg home-container__svg')

    setTimeout(() => {
      setSvgClasses('home-container__svg')
    }, 2000);
  }

  return (
    <>
      <Chat />
      <ModalBox
        show={showModalSuccess}
        handleClose={() => closeModal()}
        title='Publicação deletada com sucesso!'
        mainText='A sua publicação foi deletada.'
        buttonText='Publicação deletada'
        buttonClass='modal-main__button--success'
      />
      <ModalBox
        show={showModalFailed}
        handleClose={() => closeModal()}
        title='Tivemos um problema!'
        mainText='Tivemos um problema, tente novamente.'
        buttonText='Publicação não foi deletada!'
        buttonClass='modal-main__button--danger'
      />
      <div className="home-events-container">
        <Header/>
        <div className="home-events-container__posts">
          <button className='home-events-container__button' onClick={renderNewPosts}>Procurar novos eventos
          </button>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class={svgClasses} width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <circle cx="50" cy="50" fill="none" stroke="#1d0e0b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
              </circle>
            </svg>
          </div>
          {events && events.length > 0 &&
            events.map(event => <EventsBox event={event} handleSoftDelete={handleSoftDelete} setHelpModal={setHelpModal} helpModal={helpModal} handleParticipate={handleParticipate}/>)
          }
        </div>
      </div>
    </>

  );
}
