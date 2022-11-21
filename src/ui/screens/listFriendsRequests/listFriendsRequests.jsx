import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, ListFriendRequestBox } from '../../components';
import './index.scss'

export function ListFriendsRequestsScreen() {
	const [requests, setRequests] = useState();
	const api = useApi();

  useEffect(() => {

		async function showSolicitations() {
			const response = await api.showSolicitations();
			if (response && response.status === 200) {
				setRequests(response.data)
			}
		}

    showSolicitations();
  },[]);

	return (
		<div className='listFriendsRequests'>
			<Header />
			<div className='listFriendsRequests__container'>
				<div className='listFriendsRequests__search'>
					<h1>Pedidos de amizade</h1>
				</div>
				<div className='listFriendsRequests__results'>
					{requests && requests.map(request => <ListFriendRequestBox request={request}/>)}
				</div>
			</div>
		</div>
	);
}
