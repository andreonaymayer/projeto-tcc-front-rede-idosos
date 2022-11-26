import React, { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, PostBox } from '../../components';
import './index.scss'

export function HomeScreen() {
  const [post, setPost] = useState();
	const api = useApi();

  useEffect(() => {
    async function getPost() {
      const response = await api.getPost("07dc8934-7320-48f1-a36a-22392675801d");
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
