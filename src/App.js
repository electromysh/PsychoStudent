import React, { useState, useEffect } from 'react';
import { View, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Test from './panels/Test/Test';
import UserData from './panels/UserData/UserData';
import Edit from './panels/Edit/Edit';
import End from './panels/End/End';
import MarkupIntro from './panels/markup_intro/markup_intro';

const ROUTES = { 
	TEST: 'test',
	EDIT:'edit',
	MARKUP_INTRO: 'markup_intro',
	END: 'End',
	USERDATA: 'userData',
};

const App = () => {

	const [activePanel, setActivePanel] = useState(ROUTES.MARKUP_INTRO);
	const [answers, setAnswers] = useState([]);

	useEffect(() => {})

	const handleUserDataAction = ({ action }) => {
		if (action === 'edit') {
			setActivePanel(ROUTES.EDIT);
		}
		if (action === 'start-test') {
			setActivePanel(ROUTES.TEST);
		}
	}

	const handleIntroDataAction = () => {
		setActivePanel(ROUTES.USERDATA);
	}
	
	const handleEditAction = ({ changes }) => {
		console.log(changes);
		setActivePanel(ROUTES.USERDATA);
	}

	const handleTestAction = ({ answers }) => {
		setAnswers(answers);
		setActivePanel(ROUTES.END);
	}

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel}>
					<MarkupIntro handleAction={handleIntroDataAction} id={ ROUTES.MARKUP_INTRO }/>
					<UserData handleAction={handleUserDataAction} id={ ROUTES.USERDATA }/>
					<Edit handleAction={handleEditAction} id={ ROUTES.EDIT }/>
					<Test handleAction={handleTestAction} id={ ROUTES.TEST }/>
					<End answers={answers} id={ ROUTES.END }/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);

}

export default App;
