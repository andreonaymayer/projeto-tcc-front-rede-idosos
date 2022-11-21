import { useEffect } from 'react';
import { useState } from 'react';
import { useApi } from '../../../hooks/api';
import { Header, SearchFriendBox } from '../../components';
import './index.scss'

export function SearchFriendsScreen() {
	const [searchText, setSearchText] = useState('');
	const [profiles, setProfiles] = useState('');
	const api = useApi();

  useEffect(() => {

		async function showProfiles() {
			const response = await api.showProfiles(searchText);
			if (response && response.status === 200) {
				setProfiles(response.data)
			}
		}

    showProfiles();
  },[searchText]);


	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	return (
		<div className='searchFriends'>
			<Header />
			<div className='searchFriends__container'>
				<div className='searchFriends__search'>
					<h1>Procurar pessoas</h1>
					<input type="text" placeholder='Procurar amigos' onChange={handleSearchText} className="searchFriends__input" value={searchText}></input>
				</div>
				<div className='searchFriends__results'>
					{profiles && profiles.map(profile => <SearchFriendBox profile={profile}/>)}
				</div>
			</div>
		</div>
	);
}
