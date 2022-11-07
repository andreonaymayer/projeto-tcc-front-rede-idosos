import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Profile } from '../../components';

export function ProfileScreen() {
	const [user, setUser] = useState();
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

	return (
    user ? <Profile user={user}/> : null
	);
}
