import { store } from '../../redux';
import { setUser } from '../../redux/actions';
import { User } from '../typings';

export const setUserMiddleware = (data: { user: User }) => {
    const { user } = data;
    if (!user) {
        return;
    }
    store.dispatch(setUser(user));
};
