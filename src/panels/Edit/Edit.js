import React, { useEffect, useState } from 'react';
import { Div, Panel, Group, FormItem, Input,Button,IconButton,Select,File} from '@vkontakte/vkui';


import { userData } from '../../data/userData'
import Header from '../../components/Header/Header'
import { userMock } from '../../mock/user.mock';

const textInput = React.createRef();
const clear = () => textInput.current.value = '';

const Edit = ({ id }) => {

    const [user, setUser] = useState(null);
	const [first_name, setfirst_name] = useState('');
	const [last_name, setlast_name] = useState('');
	const [btd, setbtd] = useState('');
    

	useEffect(async () => {
		const user = await userData.getUserBaseInfo();
		setUser(user);
		
	});

	return (
		<Panel id={id}>
        	<Header avatar={ user ? user.photo_100 : null } />
			<Div>
			<Group> 
      <FormItem top="Фамилия">
        <Input type="text" placeholder={userMock.last_name} align="center"  />
      </FormItem>
	  <FormItem top="Имя">
        <Input type="text" placeholder={userMock.first_name} align="center" />
      </FormItem>
	  <FormItem top="Дата рождения">
        <Input type="text" placeholder={userMock.bdate} align="center" />
      </FormItem>
	  <FormItem top="Пол">
              <Select 
                placeholder="Выберите пол"
                options={[{
                  value: '0', label: 'Мужской' }, { 
                  value: '1', label: 'Женский' }
                ]}
              />
            </FormItem>
	  <FormItem top="Фотография" >
	  	<File >
		
		</File>
      </FormItem>
	  
    </Group>
	<Button stretched size="l">Сохранить</Button>
			</Div>
		</Panel>
		
	);
};



export default Edit;