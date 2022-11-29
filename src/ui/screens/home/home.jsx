import React, {useEffect, useState} from 'react';
import {useApi} from '../../../hooks/api';
import {Header, ModalBox, PostBox, PostModalBox, TutorialModalBox} from '../../components';
import perfil from '../../../images/perfil1.jpeg'
import './index.scss'
import feed_1 from '../../../images/feed/feed-01.jpg'
import feed_2 from '../../../images/feed/feed-02.jpg'
import feed_3 from '../../../images/feed/feed-03.jpg'
import feed_4 from '../../../images/feed/feed-04.jpg'
import feed_5 from '../../../images/feed/feed-05.jpg'
import feed_6 from '../../../images/feed/feed-06.jpg'
import feed_7 from '../../../images/feed/feed-07.jpg'
import feed_8 from '../../../images/feed/feed-08.jpg'
import feed_9 from '../../../images/feed/feed-09.jpg'
import feed_10 from '../../../images/feed/feed-10.jpg'
import feed_11 from '../../../images/feed/feed-11.jpg'

export function HomeScreen() {
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [modalPost, setModalPost] = useState();
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [renderPosts, setRenderPosts] = useState(false);
  const [postContent, setPostContent] = useState([]);
  const [helpModal, setHelpModal] = useState(false);
  const nick = sessionStorage.getItem('nickname');
  const api = useApi();

  useEffect(() => {
    async function getFeed() {
      const response = await api.getFeed();
      if (response.status === 200) {
        setFriendsPosts(response.data)
      }
    }

    getFeed();
  }, [showModalSuccess, renderPosts, api]);

  async function handleSoftDelete(post) {
    const response = await api.softDeletePost(post.id);

    if (response.status === 200) {
      setShowModalSuccess(true)
    } else {
      setShowModalFailed(true);
    }
  }

  function closeModal() {
    setShowModalSuccess(false);
    setShowModalFailed(false);
    setHelpModal(false);
  }

  function renderNewPosts() {
    setRenderPosts(!renderPosts)
  }

  async function handleReaction(postId) {
    const response = await api.setReaction(postId);
    if (response.status === 200) {
      setRenderPosts(!renderPosts)
    }
  }

  function handleCommment(post) {
    setModalPost(post.id)
    setPostContent(post)
  }


  return (
    <>
      {modalPost && <PostModalBox setHelpModal={setHelpModal} helpModal={helpModal} setModalPost={setModalPost}
                                  modalPost={modalPost} post={postContent} setRenderPosts={setRenderPosts}
                                  renderPosts={renderPosts}/>}
      <TutorialModalBox handleClose={() => closeModal()} show={helpModal}
                        carrouselImages={[feed_1, feed_2, feed_3, feed_4, feed_5, feed_6, feed_7, feed_8, feed_9, feed_10, feed_11]}/>
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
      <div className="home-container">
        <Header/>
        <div className="home-container__posts">
          <button className='home-container__button' onClick={renderNewPosts}>Procurar novas publicações</button>
          {friendsPosts && friendsPosts.length === 0 && <h3>Você não possui nenhuma publicação para ver!</h3>}
          {friendsPosts ? friendsPosts.map(post => post.active &&
            <PostBox post={post} handleSoftDelete={handleSoftDelete} isMyPost={post.autor.nick === nick}
                     handleCommment={handleCommment} handleReaction={handleReaction} setHelpModal={setHelpModal}
                     helpModal={helpModal}/>) : null}
        </div>
      </div>
    </>

  );
}
