import React, { useEffect, useState } from 'react';
import { Avatar, Button, Cell, Div, List, Panel, Spinner, Title, Text } from '@vkontakte/vkui';

import { userData } from '../../data/userData'
import Header from '../../components/Header/Header'
import Profile from '../../components/Profile/Profile'

import './markup_intro.css';
import { LOGO } from '../../constants';

const MarkupIntro = ({ id }) => {
    const logo = LOGO;
	console.log(logo)
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
        	<Header /> 
			<img src={logo} />
			<Div>
				<Title level="2" weight="semibold" style={{ marginBottom: 16 }}>Привет, {user  ? user.name : null}</Title> 
				<Text weight="semibold">Это приложение Psychostudent создано для того, чтобы Вы смогли узнать о себе чуточку больше,</Text>
				<Text weight="semibold">раскрыть свой психотип и понять кто Вы есть.</Text>
				<Div>
                   		      <Div>   <Button size="l" stretched style={{ marginRight: 8 }}>Начать тест</Button> </Div> 
                </Div> 
			</Div>
			
		</Panel>
	);
};


export default MarkupIntro;