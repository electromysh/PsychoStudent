import React from 'react';
import { Avatar, PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';

import { APP_NAME, DEFAULT_AVATAR } from '../../constants';

const Header = ({ avatar }) => {
	return (
        <PanelHeader left={ avatar ? <Avatar size={36} src={avatar}/> : <Avatar size={36} src={ DEFAULT_AVATAR } /> }>
            <PanelHeaderContent>
                { APP_NAME }
            </PanelHeaderContent>
        </PanelHeader>
	);
};


export default Header;
