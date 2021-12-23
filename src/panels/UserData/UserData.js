import React, { useEffect, useState } from 'react';
import { Panel, Div } from '@vkontakte/vkui';
import { userData } from '../../data/userData'
import Header from '../../components/Header/Header'

import './UserData.css';
import Profile from '../../components/Profile/Profile';

const UserData = ({ id }) => {

	const [user, setUser] = useState(null);

	useEffect(async () => {
		const user = await userData.getUserBaseInfo();
		setUser(user);
	});

	return (
		<Panel id={id}>
			<Header avatar={user ? user.photo_100 : null} />
            <Div>
				<Profile user={user ? user : null } />
			</Div>

		</Panel>
	);
};


export default UserData;
