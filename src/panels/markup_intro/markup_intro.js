import React, { useEffect, useState } from 'react';
import { Button, Div, Panel, Title, Text, FixedLayout } from '@vkontakte/vkui';

import { userData } from '../../data/userData'
import Header from '../../components/Header/Header'

import './markup_intro.css';
import { LOGO } from '../../constants';

const MarkupIntro = ({ id }) => {
    const logo = LOGO;
    const [user, setUser] = useState(null);

	useEffect(async () => {
		const user = await userData.getUserBaseInfo();
		console.log(user);
		setUser(user);
	});

	return (
		<Panel id={id}>
        	<Header avatar={user ? user.photo_100 : null } /> 
			<img style={{ maxWidth: 250, width: '90%', margin: '40px auto' }} src={logo} />
			<Div>
				<div style={{ paddingBottom: 80 }}>
					<Title level="2" weight="semibold" style={{ marginBottom: 16 }}>Привет, { user ? user.first_name : null }!</Title> 
					<Text weight="semibold">Это приложение создано для того, чтобы Вы смогли узнать о себе чуточку больше, раскрыть свой психотип и понять, кто Вы есть.</Text>
				</div>
			</Div>
			<FixedLayout vertical="bottom">
				<Div style={{ display: 'flex', backgroundColor: "#fff" }}>  
					<Button size="l" stretched>Начать тест</Button>
				</Div> 
			</FixedLayout>
			
		</Panel>
	);
};


export default MarkupIntro;