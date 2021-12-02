import React, { useEffect, useState } from 'react';
import { Avatar, Button, Cell, Div, List, Panel, Spinner, Title } from '@vkontakte/vkui';

import { userData } from '../../data/userData'
import Header from '../../components/Header/Header'
import Profile from '../../components/Profile/Profile'

import './Test.css';

const Test = ({ id }) => {

    const [user, setUser] = useState(null);
    const [music, setMusic] = useState(null);

	useEffect(async () => {
		const user = await userData.getUserBaseInfo();
		setUser(user);
		
		const music = await userData.getUserMusic();
		setMusic(music);
	});

	return (
		<Panel id={id}>
        	<Header avatar={ user ? user.photo_100 : null } />
			<Div>
				<Profile user={ user } />
			</Div>
			<Div>
				<Button stretched size="l">Редактировать информацию</Button>
			</Div>
			<Div>
				<Title level="3" weight="medium" className="music-title">Твоя музыка</Title>
				<List>
					{
						music ?
							music.map(m => (
								<Cell
									before={ <Avatar mode="image" src={ m.cover } /> }
									description={<span>{ m.author }</span>}
								>
									{ m.name }
								</Cell>
							))
						:
						<Spinner size="regular" />
					}
				</List>
			</Div>
		</Panel>
	);
};


export default Test;
