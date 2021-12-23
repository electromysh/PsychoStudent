import bridge from '@vkontakte/vk-bridge';
import { BRIDGE } from '../bridge-events'
import { API_URL, API_VERSION } from '../constants';
import { authData } from './authData';

import { userMock } from '../mock/user.mock'
import { musicMock } from '../mock/music.mock'

class UserData {

    getUserBaseInfo() {
        // True data
        return bridge.send(BRIDGE.APP_GET_USER_INFO);

        // Mock data
        //return Promise.resolve(userMock);
    }

    /**
     * Возвращает дополнительные данные пользователя
     * @param fields - Массив полей для получения (https://vk.com/dev/users.get)
    */
    getUserAdditionalInfo(userId, token, fields) {
        const query = fields.join(',');
        return fetch(`${API_URL}/users.get?user_ids=${userId}&fields=${query}&access_token=${token}&v=${API_VERSION}`)
            .then(response => response.json());
    }

    getUserPhotos(userId) {
        const scope = ['photos'];
        return authData.getAuthToken(scope)
            .then(token => {
                return this.getUserAdditionalInfo(userId, token, scope);
            });
    }

    getUserMusic(userId) {
        return Promise.resolve(musicMock);
    }
    
    getUserVideo(userId) {
        const scope = ['video'];
        return authData.getAuthToken(scope)
            .then(token => {
                return this.getUserAdditionalInfo(userId, token, scope);
            });
    }

}

export const userData = new UserData();
