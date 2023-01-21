import apiClient from './client';

const endpoint = '/LoginWithEmail/';

const login = (email, password) => {
    apiClient.setHeaders({ 'Skip-Cookie-Authorization': 'yes' });
    return apiClient.post(endpoint, { email, password });
};

const checkToken = (token) => {
    apiClient.setHeaders({
        'Skip-Cookie-Authorization': 'yes',
        Authorization: token,
    });
    return apiClient.post('/User/');
};

export default {
    login,
    checkToken,
};
