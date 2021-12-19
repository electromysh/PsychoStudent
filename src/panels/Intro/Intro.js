import React, { useEffect, useState } from 'react';
import { Avatar, Button, Cell, Div, List, Panel, Spinner, Title } from '@vkontakte/vkui';

import { userData } from '../../data/userData'
import Header from '../../components/Header/Header'
import Intro from '../../Intro/markup_intron'
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
        	<Header photo={ user ? user.photo_100 : null } />
            <Title level="2" weight="semibold" style={{ marginBottom: 16 }}>Привет, {user.name}</Title> 
            <Text weight="semibold">Это приложение Psychostudent создано для того, </Text>
            <Text weight="semibold">чтобы Вы смогли узнать о себе чуточку больше, </Text>
            <Text weight="semibold">расскрыть свой психотип и понять кто Вы есть.</Text>
			
		</Panel>
	);
};


export default Intro;