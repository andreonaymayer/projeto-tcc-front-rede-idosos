import React, { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, ModalBox, PostBox, PostModalBox } from '../../components';
import './index.scss'

export function HomeScreen() {
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [modalPost, setModalPost] = useState();
	const [showModalSuccess, setShowModalSuccess] = useState(false);
	const [showModalFailed, setShowModalFailed] = useState(false);
	const [renderPosts, setRenderPosts] = useState(false);
	const [postContent, setPostContent] = useState([]);
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
  }, [showModalSuccess, renderPosts]);

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
      {modalPost && <PostModalBox setModalPost={setModalPost} modalPost={modalPost} post={postContent} setRenderPosts={setRenderPosts} renderPosts={renderPosts}/>}
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
      <Header />
      <div className="home-container__posts">
        <button className='home-container__button' onClick={renderNewPosts}>Procurar novas publicações</button>
        {friendsPosts && friendsPosts.length === 0 && <h3>Você não possui nenhuma publicação para ver!</h3>}
        {friendsPosts ? friendsPosts.map(post => post.active && <PostBox post={post} handleSoftDelete={handleSoftDelete} isMyPost={post.autor.nick === nick} handleCommment={handleCommment} handleReaction={handleReaction}/>) : null}
      </div>
    </div>
    </>

	);
}
