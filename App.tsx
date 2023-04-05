import React, { useEffect, useState } from 'react';
import { getToken } from './auth/storage';
import { AuthContextRoute } from './auth/AuthContextRoute';
import ActivityIndicatorScreen from './screens/ActivityIndicatorScreen';
import { Api } from './api';
import { Provider, useDispatch } from 'react-redux';
import { setLoggedIn, setToken } from './redux/actions';
import { store } from './redux';

export const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const restoreToken = async () => {
        setLoading(true);

        // Получение токена из SecureStore для авторизации пользователя
        const token = await getToken();
        if (!token) {
            setLoading(false);
            return;
        }
        dispatch(setToken(token));

        // Проверка, актуальный ли токен
        try {
            await Api.user();
            store.dispatch(setLoggedIn(true));
        } catch (err) {
            // TODO: retry some stasuses ??
        }

        setLoading(false);
    };

    useEffect(() => {
        restoreToken();
    }, []);

    return <>{loading ? <ActivityIndicatorScreen /> : <AuthContextRoute />}</>;
};

const AppWithStore = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default AppWithStore;
