import * as SecureStore from 'expo-secure-store';
import auth from '../api/auth';

const key = 'authToken';

const storeToken = async (authToken) => {
    try {
        await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
        console.log('Error storing the auth token', error);
    }
};

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log('Error receiving the token', error);
    }
};

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('Error removing the token', error);
    }
};

export default {
    removeToken,
    getToken,
    storeToken,
};
