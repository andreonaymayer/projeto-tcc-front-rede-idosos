import React, { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, PostBox } from '../../components';
import './index.scss'

export function HomeScreen() {
  const [post, setPost] = useState();
	const api = useApi();

  useEffect(() => {
    async function getPost() {
      const response = await api.getPost('ab65d164-4c89-4368-af44-53dc09148660');
      if (response.status === 200) {
        setPost(response.data)
      }
    }

    getPost();
  }, []);


	return (
    <div className="home-container">
      <Header />
      <div className="home-container__posts">
        {post && post.active ? <PostBox post={post} /> : null}
      </div>
    </div>
	);
}
