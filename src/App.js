import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Snackbar, Avatar } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24Error } from '@vkontakte/icons';

import Home from './panels/Home/Home';
import Intro from './panels/Intro/Intro';
import Test from './panels/Test/Test';
import { BRIDGE, BRIDGE_EVENTS_APP } from './bridge-events';

const ROUTES = { 
    HOME: 'home',
	INTRO: 'intro',
	TEST: 'test',
};

const STORAGE_KEYS = {
	STATUS: 'status',
}

const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.TEST);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [UserHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [Snackbar, setSnackbar] = useState(false);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === BRIDGE.APP_UPDATE_CONFIG) {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send(BRIDGE.APP_GET_USER_INFO);
			const storageData = await bridge.send(BRIDGE.APP_STORAGE_GET, {
				keys: Object.values(STORAGE_KEYS)
			 });
			const data = {};
			storageData.keys.forEach( ({ key, value }) => {
				try {
					data[key] = value ? JSON.parse(value) : {};
					switch(key) {
                        case STORAGE_KEYS.STATUS:
							if (data[key].hasSeenIntro) {
								setActivePanel(ROUTES.HOME);
								setUserHasSeenIntro(true);
							}
							break;
					    default:
							break;
					}
				} catch(error){
					setSnackbar(<Snackbar
						layout='vertical'
						onClose={() => setSnackbar(null)}
						before={<Avatar size={24} style={{ backgroundColor: 'var(--dynamic-red)' }}
						><Icon24Error fill='#fff' width='14' height='14' /></Avatar>}
						duration={900}
					>
						Проблема с получением данных из Storage
					</Snackbar>)
				}
			})
			

			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const viewIntro = async function () {
		try {
            await bridge.send('VKWebAppStorageSet', {
				key: STORAGE_KEYS.STATUS,
				value: JSON.stringify({
					hasSeenIntro: true
				})
			});
		} catch (error) {
			setSnackbar(<Snackbar
				layout='vertical'
				onClose={() => setSnackbar(null)}
				before={<Avatar size={24} style={{ backgroundColor: 'var(--dynamic-red)' }}
				><Icon24Error fill='#fff' width='14' height='14' /></Avatar>}
				duration={900}
			>
				Проблема с отправкой данных в Storage
			</Snackbar>)
		}
	} 

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel}>
					<Home id={ ROUTES.HOME } fetchedUser={fetchedUser} go={go} snackbarError={Snackbar}/>
					<Intro id={ ROUTES.INTRO } go={go} snackbarError={Snackbar}/>
					<Test id={ ROUTES.TEST } go={go} snackbarError={Snackbar}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
