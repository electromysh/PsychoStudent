import React, { useEffect, useState } from 'react';
import { Div, Panel, Group, FormItem, Input, Button, Select, File, FixedLayout, DatePicker } from '@vkontakte/vkui';

import { userData } from '../../data/userData'
import Header from '../../components/Header/Header'

const Edit = ({ id, handleAction }) => {

	const [user, setUser] = useState(null);
	const [userChanges, setUserChanges] = useState({});
	const handle = handleAction || (() => {});

	const sexes = [
		{ value: '0', label: 'Мужской' },
		{ value: '1', label: 'Женский' }
	];

	const changeDate = value => {
		userChanges.bdate = new Date(value.year, value.month - 1, value.day).toLocaleDateString();
		setUserChanges(userChanges);
	}

	const changeFirstName = e => {
		userChanges.first_name = e.target.value;
		setUserChanges(userChanges);
	}

	const changeLastName = e => {
		userChanges.last_name = e.target.value;
		setUserChanges(userChanges);
	}
	
	const changeSex = e => {
		userChanges.sex = e.target.value;
		setUserChanges(userChanges);
	}

	useEffect(async () => {
		const user = await userData.getUserBaseInfo();
		setUser(user);
	});

	return (
		<Panel id={id}>
			<Header avatar={user ? user.photo_100 : null} />
			{ user ? <Div>
				<Group style={{ paddingBottom: 80 }}>
					<FormItem top="Фамилия">
						<Input type="text" onChange={changeLastName} defaultValue={user.last_name} align="center" />
					</FormItem>
					<FormItem top="Имя">
						<Input type="text" onChange={changeFirstName} defaultValue={user.first_name} align="center" />
					</FormItem>
					<FormItem top="Дата рождения">
						<DatePicker
							defaultValue={{
								day: new Date(user.bdate).getDate(),
								month: new Date(user.bdate).getMonth() + 1,
								year: new Date(user.bdate).getFullYear()
							}}
							min={{ day: 1, month: 1, year: 1901 }}
							max={{ day: 1, month: 1, year: new Date().getFullYear() }}
							onDateChange={changeDate}
							dayPlaceholder="ДД"
							monthPlaceholder="ММММ"
							yearPlaceholder="ГГГГ"
						/>
					</FormItem>
					<FormItem top="Пол">
						<Select
							onChange={changeSex}
							placeholder="Выберите пол"
							options={sexes}
						/>
					</FormItem>
					<FormItem top="Фотография" >
						<File>

						</File>
					</FormItem>

				</Group>
			</Div> : null }
			<FixedLayout vertical='bottom'>
				<Div style={{ backgroundColor: "#fff" }}>
					<Button onClick={handle.bind(null, { changes: userChanges })} stretched size="l">Сохранить</Button>
				</Div>
			</FixedLayout>
		</Panel>

	);
};

export default Edit;
