import { removeToken } from '../../auth/storage';
import { store } from '../../redux';
import { setLoggedIn, setToken, setUser } from '../../redux/actions';
import { ApiCallError } from '../typings';

const logoutUser = () => {
    store.dispatch(setLoggedIn(false));
    store.dispatch(setUser(undefined));
    store.dispatch(setToken(undefined));
    removeToken();
};

export const setUnauthorizedMiddleware = (err: ApiCallError) => {
    if (err.code === 401) {
        logoutUser();
    }
};

export const setLoggedOutMiddleware = () => {
    logoutUser();
};
