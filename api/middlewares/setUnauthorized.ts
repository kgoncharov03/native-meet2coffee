import { removeToken } from '../../auth/storage';
import { store } from '../../redux';
import { setLoggedIn, setToken, setUser } from '../../redux/actions';
import { ApiCallError } from '../typings';

export const setUnauthorizedMiddleware = (err: ApiCallError) => {
    if (err.code === 401) {
        store.dispatch(setLoggedIn(false));
        store.dispatch(setUser(undefined));
        store.dispatch(setToken(undefined));
        removeToken();
    }
};
