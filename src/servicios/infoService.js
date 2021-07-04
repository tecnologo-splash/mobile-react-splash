import settings from '../config/settings';


export const getCurrentInfo = async () => {
    return await settings.get('/users/info');
}