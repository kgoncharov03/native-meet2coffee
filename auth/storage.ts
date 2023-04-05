import * as SecureStore from 'expo-secure-store';

export const authTokenKey = 'authToken';

const storeToken = async (authToken: string) => {
    try {
        await SecureStore.setItemAsync(authTokenKey, authToken);
    } catch (error) {
        console.log('Error storing the auth token', error);
    }
};

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(authTokenKey);
    } catch (error) {
        console.log('Error receiving the token', error);
    }
};

const removeToken = async () => {
    try {
        return await SecureStore.deleteItemAsync(authTokenKey);
    } catch (error) {
        console.log('Error removing the token', error);
    }
};

export { removeToken, getToken, storeToken };
