import { useAxios } from './use-axios.hook';
import { useCallback } from 'react';
import { useGlobalUser } from '../../context/index';

export function useApi() {
	const [user, setUser] = useGlobalUser();
	// const apiUrl = 'http://localhost:8080';
	const apiUrl = 'http://ec2-54-86-1-208.compute-1.amazonaws.com:8080';
	const axios = useAxios(apiUrl, {
		Authorization: 'Bearer ' + sessionStorage.getItem('token'),
	});


	const cadastroUsuario = useAxios(apiUrl);

	async function createToken(email, password) {
    const response = await cadastroUsuario.post('/v1/login', {email, password})

    if (response && response.status === 200) {
      setUser(response.data)
      sessionStorage.setItem('token', user.jwt);
    }
    return response
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
      editPostInfo
		},
		[]
	);
}
