import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'https://test-api.meet2coffee.com',
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);

    return response;
};

export default apiClient;
