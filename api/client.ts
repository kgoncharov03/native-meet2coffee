import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'https://test-api.meet2coffee.com',
});

export { apiClient };
