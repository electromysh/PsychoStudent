import bridge from '@vkontakte/vk-bridge';
import { BRIDGE } from '../bridge-events'

class UserData {
    
    getUserInfo() {
        return bridge.send(BRIDGE.APP_GET_USER_INFO);
    }

}

export const userData = new UserData();
