import { useAxios } from './use-axios.hook';
import { useCallback } from 'react';
import { useGlobalUser } from '../../context/index';

export function useApi() {
	const [user, setUser] = useGlobalUser();
	const apiUrl = 'http://localhost:8080';
	// const axios = useAxios(apiUrl, {
	// 	Authorization: 'Bearer ' + token,
	// });
  console.log(user)

	const cadastroUsuario = useAxios(apiUrl);

	async function createToken(email, password) {
    const response = await cadastroUsuario.post('/v1/login', {email, password})

    if (response && response.status === 200) {
      setUser(response.data.jwt)
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

	return useCallback(
		{
			createToken,
			newUserRegister
		},
		[]
	);
}
