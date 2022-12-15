import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/api';
import { PersonProfileBox, Profile } from '../../components';

export function ProfileScreen() {
	const [user, setUser] = useState();
	const [birthDate, setBirthDate] = useState();
  const person = JSON.parse(sessionStorage.getItem('user'));
  const isNotYourProfile = JSON.parse(sessionStorage.getItem('isNotYourProfile'));

	const api = useApi();

  function getLocalMonthNames(monthName) {
    var months = {
      '1': 'Janeiro',
      '2': 'Fevereiro',
      '3': 'Março',
      '4': 'Abril',
      '5': 'Maio',
      '6': 'Junho',
      '7': 'Julho',
      '8': 'Agosto',
      '9': 'Setembro',
      '10': 'Outubro',
      '11': 'Novembro',
      '12': 'Dezembro',
    };
    for (let i=0; i<12; i++) {
      if (months[i] === monthName) return i > 9 ? i : `0${i}`
    }
  }


  useEffect(() => {
    async function getUserInfo() {
      const response = await api.getUserInfo();
      if (response.status === 200) {
        const date = await getDate(response.data.birthDate)
        let month = date.replace(/[^a-zA-Z]+/g, '')
        month = getLocalMonthNames(month)
        let fullDate = date.slice(-4) + '-' + month + '-' + date[0] + date[1]
        setBirthDate(fullDate)
        setUser(response.data)
      }
    }

    async function getDate(date) {
      const response = await api.getDate(date);
      if (response && response.status === 200) {
        return response.data
      }
    }

    getUserInfo();
  }, []);

  function renderProfileLogged() {
    if (!!user && !isNotYourProfile) {
      return <Profile user={user} birth={birthDate}/>
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
