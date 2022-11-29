import { useAxios } from './use-axios.hook';
import { useCallback } from 'react';
import { useGlobalUser } from '../../context/index';

export function useApi() {
	const [setUser] = useGlobalUser();
	// const apiUrl = 'http://localhost:8080';
	const apiUrl = 'http://ec2-54-86-1-208.compute-1.amazonaws.com:8080';
	const axios = useAxios(apiUrl, {
		Authorization: 'Bearer ' + sessionStorage.getItem('token'),
	});


	const cadastroUsuario = useAxios(apiUrl);

	async function createToken(email, password) {
    try {
      const response = await cadastroUsuario.post('/v1/login', {email, password})
      setUser(response.data)
      sessionStorage.setItem('token', response.data.jwt);
      sessionStorage.setItem('nickname', response.data.user.nick);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function newUserRegister(
    birthDate,
    city,
    details,
    email,
    name,
    password
	) {
		try {
			const response = await cadastroUsuario.post('/v1/register', {
        birthDate,
        city,
        details,
        email,
        name,
        password
			});
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function showStates() {
		try {
			const response = await cadastroUsuario.get('/v1/location/state');
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function showCities(stateId) {
		try {
			const response = await cadastroUsuario.get(`/v1/location/cities/${stateId}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function showStateSelected(cityId) {
		try {
			const response = await cadastroUsuario.get(`/v1/location/state-of/${cityId}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function resetPassword(email) {
		try {
			const response = await cadastroUsuario.post('/v1/password-recovery/request', {email});
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function getUserInfo() {
		try {
			const response = await axios.get('/v1/user');
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function putUserInfo(
    email,
    name,
    birthDate,
    imgUrl,
    details,
    city
  ) {
		try {
			const response = await axios.put('/v1/user', {
        email,
        name,
        birthDate,
        details,
        city
      });
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function profileImage(image) {
		try {
			const response = await axios.post('/v1/user/img', image);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function postImage(image) {
		try {
			const response = await axios.post('/v1/posts/img', image);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function changePassword(newPassword, oldPassword) {
		try {
			const response = await axios.put('/v1/user/password', {newPassword, oldPassword});
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function createPost(conteudo, midiaUrl) {
		try {
      const form = new FormData();
      form.append('conteudo', conteudo);
      form.append('midiaUrl', midiaUrl);
			const response = await axios.post('/v1/posts', form);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function getPost(postId) {
		try {
			const response = await axios.get(`/v1/posts/${postId}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function softDeletePost(postId) {
		try {
			const response = await axios.delete(`/v1/posts/delete/${postId}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function editPostInfo(postId, text, midiaUrl) {
		try {
      const form = new FormData();
      form.append('conteudo', text);
      form.append('midiaUrl', midiaUrl);
			const response = await axios.put(`/v1/posts/edit/${postId}`, form);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function showProfiles(name) {
		try {
			const response = await axios.get(`/v1/friends/buscar?name=${name}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function addAsFriend(nick) {
		try {
			const response = await axios.post(`/v1/friends/solicita/${nick}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function showSolicitations() {
		try {
			const response = await axios.get(`/v1/friends/pedidos`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function acceptAsFriend(nick) {
		try {
			const response = await axios.post(`/v1/friends/aceitar/${nick}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function denyAsFriend(nick) {
		try {
			const response = await axios.post(`/v1/friends/recusar/${nick}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function showFriends() {
		try {
			const response = await axios.get(`/v1/friends`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function getFeed() {
		try {
			const response = await axios.get(`/v1/feed`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function getMyPosts() {
		try {
			const response = await axios.get(`/v1/posts`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function removeFriendship(nick) {
		try {
			const response = await axios.post(`/v1/friends/desfazer/${nick}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function setReaction(postId) {
		try {
			const response = await axios.post(`/v1/reaction/${postId}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function getReactions(postId) {
		try {
			const response = await axios.get(`/v1/reaction/list/${postId}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function updatePicture(imgUrl) {
		try {
			const response = await axios.patch(`/v1/user?imgUrl=${imgUrl}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function addComment(postId, text) {
		try {
			const response = await axios.post(`/v1/comment/${postId}`, {text});
			return response;
		} catch (error) {
			return error.response;
		}
	}

  async function getPostComments(postId) {
		try {
			const response = await axios.get(`/v1/comment/list/${postId}`);
			return response;
		} catch (error) {
			return error.response;
		}
	}


	return useCallback(
		{
			createToken,
			newUserRegister,
      showStates,
      showCities,
      resetPassword,
      getUserInfo,
      putUserInfo,
      profileImage,
      changePassword,
      showStateSelected,
      postImage,
      createPost,
      getPost,
      softDeletePost,
      editPostInfo,
			showProfiles,
			addAsFriend,
			showSolicitations,
			acceptAsFriend,
			denyAsFriend,
			showFriends,
      getFeed,
      getMyPosts,
      removeFriendship,
      getReactions,
      setReaction,
      updatePicture,
      addComment,
      getPostComments
		},
		[]
	);
}
