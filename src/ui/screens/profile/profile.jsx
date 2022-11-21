import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/api';
import { PersonProfileBox, Profile } from '../../components';

export function ProfileScreen() {
	const [user, setUser] = useState();
  const person = JSON.parse(sessionStorage.getItem('user'));
  const isNotYourProfile = JSON.parse(sessionStorage.getItem('isNotYourProfile'));

	const api = useApi();

  useEffect(() => {
    async function getUserInfo() {
      const response = await api.getUserInfo();
      if (response.status === 200) {
        setUser(response.data)
      }
    }

    getUserInfo();
  }, []);

  function renderProfileLogged() {
    if (!!user && !isNotYourProfile) {
      return <Profile user={user} />
    }

    if (isNotYourProfile) {
      return <PersonProfileBox user={person} />
    }

    return ''
  }


	return (
    renderProfileLogged()
	);
}
