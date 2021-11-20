import bridge from '@vkontakte/vk-bridge';
import { BRIDGE } from '../bridge-events'
import { API_URL, API_VERSION } from '../constants';
import { authData } from './authData';

class UserData {

    getUserBaseInfo() {
        return bridge.send(BRIDGE.APP_GET_USER_INFO);
    }

    /**
     * Возвращает дополнительные данные пользователя
     * @param fields - Массив полей для получения (https://vk.com/dev/users.get)
    */
    getUserInfo(userId, token, fields) {
        const query = fields.join(',');
        return fetch(`${API_URL}/users.get?user_ids=${userId}&fields=${query}&access_token=${token}&v=${API_VERSION}`);
    }

    getUserPhotos(userId) {
        const scope = ['[photos]'];
        return authData.getAuthToken(scope)
            .then(token => {
                return this.getUserInfo(userId, token, scope);
            });
    }

    getUserVideo(userId) {
        const scope = ['video'];
        return authData.getAuthToken(scope)
            .then(token => {
                return this.getUserInfo(userId, token, scope);
            });
    }
    
}

export const userData = new UserData();
