import apiClient from './client';

const endpoint = '/LoginWithEmail/';

const login = (email, password) => {
    apiClient.setHeaders({ 'Skip-Cookie-Authorization': 'yes' });
    return apiClient.post(endpoint, { email, password });
};

export default {
    login,
};
