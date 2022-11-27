import React, { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, ModalBox, PostBox } from '../../components';
import './index.scss'

export function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [friendsPosts, setFriendsPosts] = useState([]);
	const [showModalSuccess, setShowModalSuccess] = useState(false);
	const [showModalFailed, setShowModalFailed] = useState(false);
	const api = useApi();

  useEffect(() => {
    async function getFeed() {
      const response = await api.getFeed();
      if (response.status === 200) {
        setFriendsPosts(response.data)
      }
    }

    async function getMyPosts() {
      const response = await api.getMyPosts();
      if (response.status === 200) {
        setPosts(response.data)
      }
    }

    getMyPosts();
    getFeed();
  }, [showModalSuccess]);

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

	return (
    <>
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
        {posts && friendsPosts && posts.length === 0 && friendsPosts.length === 0 && <h3>Você não possui nenhuma publicação para ver!</h3>}
        {posts ? posts.map(post => post.active && <PostBox post={post} handleSoftDelete={handleSoftDelete} isMyPost={true} />) : null}
        {friendsPosts ? friendsPosts.map(post => post.active && <PostBox post={post} handleSoftDelete={handleSoftDelete} />) : null}
      </div>
    </div>
    </>

	);
}
