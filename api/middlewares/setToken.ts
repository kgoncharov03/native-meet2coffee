import { store } from '../../redux';
import { setToken } from '../../redux/actions';
import { storeToken } from '../../auth/storage';

export const setTokenMiddlware = (data: any) => {
    const { token } = data;
    if (!token) {
        return;
    }
    store.dispatch(setToken(token));
    storeToken(token);
};
