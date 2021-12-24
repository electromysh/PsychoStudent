import React, { useEffect, useState } from 'react';
import { Panel, Div, FixedLayout, Button } from '@vkontakte/vkui';
import { userData } from '../../data/userData'
import Header from '../../components/Header/Header'

import './UserData.css';
import Profile from '../../components/Profile/Profile';

const UserData = ({ id, handleAction }) => {

	const [user, setUser] = useState(null);
	const handle = handleAction || (() => {});
	
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

			<FixedLayout vertical='bottom'>
				<Div>
					<Button onClick={handle.bind(null, { action: 'edit' })} size='l' mode='secondary' stretched>Редактировать информацию</Button>
				</Div>
				<Div>
					<Button onClick={handle.bind(null, { action: 'start-test' })} size='l' stretched>Начать тест</Button>
				</Div>
			</FixedLayout>

		</Panel>
	);
};


export default UserData;
