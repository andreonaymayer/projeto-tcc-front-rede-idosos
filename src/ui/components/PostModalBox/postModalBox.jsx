/* eslint-disable react/prop-types */
import './postModal.scss';
import React, { useEffect, useState } from 'react';
import perfil from '../../../images/perfil1.jpeg'
import { useApi } from '../../../hooks/api';
import Slider from 'react-slick';
import seta from '../../../images/send.svg'


export function PostModalBox({ setModalPost, modalPost, post, renderPosts, setRenderPosts }) {
  const isMobile = window.innerWidth < 500;
  const [text, setText] = useState();
	const api = useApi();
  const body = document.getElementsByTagName('body')
  const root = document.getElementById('root')
  const thereIsImagesClass = post.midiaUrls.length > 0 ? 'post-modal__container-image' : 'post-modal__container-image post-modal__container-image--empty'

  if (modalPost) {
    body[0].classList.add('overflow-hidden-body')
    root.classList.add('overflow-hidden-body')
  }

  useEffect(() => {
    async function getPost() {
      if(post.id.length === '') return
      const response = await api.getPostComments(post.id);
      if (response.status === 200) {
        post.comentarios = response.data
      }
    }

    getPost();
  }, [renderPosts]);

  const settings = {
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  function handleCloseModalPost() {
    body[0].classList.remove('overflow-hidden-body')
    root.classList.add('overflow-hidden-body')
    setModalPost(false)
  }

  function handleText(event) {
    setText(event.target.value)
  }

  async function addComment() {
    if (text.length === 0) return;
    const response = await api.addComment(post.id, text);

    if(response && response.status === 200) {
      setRenderPosts(!renderPosts)
    }

  }

	return (
    <>
      <button className='close-post-modal' onClick={handleCloseModalPost}>Fechar exibição</button>
      <div className='post-modal'>
        {!isMobile
        ?
          <div className={thereIsImagesClass}>
            {post.midiaUrls.length > 0
            ?
              <Slider {...settings}>
              {
                post.midiaUrls.map((image, key) => {
                  return (
                    <div className='post-modal__added-photo' key={key}>
                      <img src={image} className='post-modal__photo' alt='foto carregada'/>
                    </div>
                  )
                })
              }
              </Slider>
            :
              null
            }
          </div>
        : null }
        <div className='post-modal__container-information'>
          <div className='post-modal__container-user'>
            <div>
              {post.autor.imgUrl
              ? <img class="post-modal__image" src={post.autor.imgUrl} alt="imagem de perfil" />
              : <img class="post-modal__image" src={perfil} alt="imagem de perfil" />
              }
            </div>
            <div className='post-modal__container-name-date'>
              <label className='post-modal__container-name'>{post.autor.name}</label>
              <label>{post.data}</label>
            </div>
          </div>
          <div className='post-modal__container-content'>
            <label className='post-modal__container-text'>{post.conteudo}</label>
          </div>
          {isMobile && post.midiaUrls.length > 0
          ?
            <div className='post-modal__container-image'>
              {post.midiaUrls.length > 0
              ?
                <Slider {...settings}>
                {
                  post.midiaUrls.map((image, key) => {
                    return (
                      <div className='post-modal__added-photo' key={key}>
                        <img src={image} className='post-modal__photo' alt='foto carregada'/>
                      </div>
                    )
                  })
                }
                </Slider>
              :
              null
              }
            </div>
          : null }
          <div className='post-modal__container-comments'>
            <div>
            {post.comentarios && post.comentarios.length > 0
            ? post.comentarios.map((comentario, key) =>
              <>
                <div className='post-modal__container-user post-modal__container-user--comment' id={key}>
                  <div className='post-modal__wrapper'>
                    <div>
                      {comentario.autor.imgUrl
                        ? <img class="post-modal__image post-modal__image--comment" src={comentario.autor.imgUrl} alt="imagem de perfil" />
                        : <img class="post-modal__image post-modal__image--comment" src={perfil} alt="imagem de perfil" />}
                    </div>
                    <div className='post-modal__container-name-date'>
                      <label className='post-modal__container-name post-modal__container-name--comment'>{comentario.autor.name}</label>
                    </div>
                  </div>
                  <div className='post-modal__container-content'>
                    <label className='post-modal__container-text post-modal__container-text--comment'>
                      {comentario.comentario.conteudo.replace('{"text":"', '').replace('"}', '')}
                    </label>
                  </div>
                </div>
              </>
            )
            : null}
            </div>
            <div className='post-modal__form'>
              <input className='post-modal__input' type="text" placeholder='Adicione um comentário' onChange={handleText} value={text}/>
              <button className='post-modal__button' onClick={addComment}>  <img src={seta} /> </button>
            </div>
          </div>
        </div>
      </div>
    </>
	);
}

