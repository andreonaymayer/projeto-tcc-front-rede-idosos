import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/api';
import { CreatePostBox } from '../../components';

export function CreatePostScreen() {
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
		<>
			{user ? <CreatePostBox user={user}/> : null}
		</>
	);
}
