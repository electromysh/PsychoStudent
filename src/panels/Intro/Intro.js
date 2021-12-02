import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardGrid, Cell, Group, Header, Panel, PanelHeader, Spinner } from '@vkontakte/vkui';

import { userData } from '../../data/userData';
import './Intro.css';
import { APP_NAME, DEFAULT_AVATAR } from '../../constants';

const Intro = ({ id, snackbarError }) => {
	
	const [user, setUser] = useState(null);

	useEffect(() => {
		userData.getUserBaseInfo()
			.then(user => setUser(user));
	});

	

	return (
		<Panel id={id} centered={true}>
			<PanelHeader>
				<h1 className="app-name">{APP_NAME}</h1>
			</PanelHeader>
			{ user ?
				<Group header={ <Header>Привет!</Header>} >
					{/* <pre style={{ width: 500 + 'px' }}>
						{ JSON.stringify(video, null, '   ') }
					</pre> */}
					<CardGrid size="l">
						<Card mode="shadow" style={{ padding: 10 + 'px' }}>
							<Cell
								hasHover={false}
								before={ user.photo_200 ? <Avatar src={user.photo_200}/> : <Avatar src={DEFAULT_AVATAR} /> }
								description={
									<div style={{ display: 'flex', flexDirection: 'column' }}>
									    <span>{ user.city && user.city.title ? user.city.title : 'Город не указан'}</span>
									    <span>{ user.bdate ? user.bdate : 'Дата рождения не указана' }</span>
									</div>
								}
							>
								{ `${user.first_name} ${user.last_name}` }
							</Cell>
						</Card>
					</CardGrid>
				</Group>
				:
				<Spinner size="regular" />
			}

			{ snackbarError }
		</Panel>
	);
};



export default Intro;
