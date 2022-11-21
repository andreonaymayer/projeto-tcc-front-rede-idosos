import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, ListFriendsBox } from '../../components';
import './index.scss'

export function ListFriendsScreen() {
	const [friends, setFriends] = useState();
	const api = useApi();

  useEffect(() => {

		async function showFriends() {
			const response = await api.showFriends();
			if (response && response.status === 200) {
				setFriends(response.data)
			}
		}

    showFriends();
  },[]);

	return (
		<div className='listFriends'>
			<Header />
			<div className='listFriends__container'>
				<div className='listFriends__search'>
					<h1>Amizades</h1>
				</div>
				<div className='listFriends__results'>
					{friends && friends.map(friend => <ListFriendsBox friend={friend}/>)}
				</div>
			</div>
		</div>
	);
}
