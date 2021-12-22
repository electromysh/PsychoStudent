import React, { useEffect, useState } from 'react';
import { Avatar, Button, Cell, Div, List, Panel, Spinner, Title, Radio, Group, Counter, FormItem, Spacing, IconButton, Text, View, Progress } from '@vkontakte/vkui';
import { Icon48ArrowLeftOutline, Icon48ArrowRightOutline } from '@vkontakte/icons';
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
			
			
			<Div style={{flex:1,justifyContent: "center",alignItems: "center", paddingTop: 60, paddingBottom: 60, color: 'black'}}>
     			<Text adjustsFontSizeToFit={true} 
           		numberOfLines={1} 
          		style={{textAlignVertical: "center",textAlign: "center",}}> 1/13 <br/> <br/> <br/> В городском музее изобразительных искусств будет проходить в течение трёх дней выставка редких живописных полотен *</Text>
			</Div>
			<View style={{ fontSize: 18 }}>
				<Radio weight="semibold" name="radio" value="1">Я обязательно пойду на эту выставку, ведь каждый культурный человек должен приобщаться к высокому искусству</Radio>
				<Radio weight="semibold" name="radio" value="2">Я не пойду на эту выставку, ведь это только расстроит: разве можно наслаждаться живописью, когда вокруг толпа, и сзади на тебя напирают очередные посетители</Radio>
				<Radio weight="semibold" name="radio" value="3">Я посмотрю на стоимость билетов. Сегодня многие хотят нажиться: проводят якобы культурно-просветительные мероприятия, а на самом деле просто извлекают из этого выгоду. Пусть наживаются , но только не за мой счёт</Radio>				
				<Radio weight="semibold" name="radio" value="4">Я никогда не хожу на подобные выставки. По-моему, гораздо лучше использовать это время для весёлого общения с приятелями. Я предпочту пикник, футбольный матч, посиделки в кафе и т.п. В конце концов, у кого-нибудь из нашей компании непременно будет день рождения – какая уж тут выставка!</Radio>
				<Radio weight="semibold" name="radio" value="5">Все будет зависеть от темы, выраженной на этих полотнах: меня интересует живопись, отражающая гражданскую позицию художника</Radio>
				<Radio weight="semibold" name="radio" value="6">Я, скорее всего, не пойду на эту выставку. Слишком много там будет посторонних людей. Ещё неизвестно, зачем они туда прийдут. Лучше лишний раз дома, при свете настольной лампы,полистаю альбом с репродукциями.</Radio>
				<Radio weight="semibold" name="radio" value="7">Я пойду, но не на выставку, а в зоопарк, или по магазинам, или в библиотеку. Там посмотрим. Весь город ринется в музей, и много мест освободиться. Можно будет придумать что-нибудь поинтереснее банальной выставки.</Radio>					
			</View>``
     		<Div style={{display: 'flex'}}>
       			<Button stretched before={<Icon48ArrowLeftOutline/>}></Button>
				<Button stretched mode="secondary" before={<Icon48ArrowRightOutline/>}></Button>
				
     		</Div>
			
		</Panel>
	);
};``


export default Test;
