import React from 'react';
import { Avatar, Card, Cell, Spinner } from '@vkontakte/vkui';
import { SEX_MAP_FULL, DEFAULT_AVATAR } from '../../constants';

import './Profile.css';

const Profile = ({ user }) => {
	
    const getSexString = sex => {
        return SEX_MAP_FULL[sex];
    }

    return (
        <Card mode="shadow" className="profile-card">
            {
                user ?
                <Cell
                    hasHover={false}
                    before={ user.photo_200 ? <Avatar size={100} src={user.photo_200}/> : <Avatar size={100} src={DEFAULT_AVATAR} /> }
                    description={
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>{ user.city && user.city.title ? user.city.title : 'Город не указан'}</span>
                            <span>{ user.country ? user.country.title : 'Страна не указана' }</span>
                            <span>{ user.bdate ? user.bdate + ' г.' : 'Дата рождения не указана' }</span>
                            <span>{ user != null ? getSexString(user.sex) : 'Пол не указан' }</span>
                        </div>
                    }
                >
                    { `${user.first_name} ${user.last_name}` }
                </Cell>
                :
                <Spinner size="regular" />
            }
        </Card>
	);
};


export default Profile;
