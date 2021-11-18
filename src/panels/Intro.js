import React from 'react';


import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import './Intro.css';

const Intro = ({ id, snackbarError }) => {
	return (
		<Panel id={id} centered={true}>
			<PanelHeader>
				Psychostudent
			</PanelHeader>
			{snackbarError}
		</Panel>
	);
};



export default Intro;
