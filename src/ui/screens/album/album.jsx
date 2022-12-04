import React, {useEffect, useState} from 'react';
import {useApi} from '../../../hooks/api';
import {AlbumBox, Chat, Header, PostModalBox} from '../../components';
import './index.scss'

export function AlbumScreen() {
  const [album, setAlbum] = useState([]);
  const [modalPost, setModalPost] = useState(false);
  const [post, setPost] = useState([]);
  const api = useApi();

  useEffect(() => {
    async function getAlbum() {
      const response = await api.getAlbum();
      if (response.status === 200) {
        setAlbum(response.data)
      }
    }

    getAlbum();
  }, [api]);

  async function getPost(album) {
    const response = await api.getPost(album.publicacao);
    if (response.status === 200) {
      setPost(response.data)
      setModalPost(true)
    }
  }


  return (
    <>
      <Chat />
      {modalPost && <PostModalBox setModalPost={setModalPost} modalPost={modalPost} post={post} getPost={getPost} showInputComments={false}/>}
      <div className="album">
        <Header/>
        <div className="album__pics">
        {album && album.length > 0 && album.map(album => <AlbumBox album={album} getPost={getPost}/>)}
        </div>
      </div>
    </>

  );
}
