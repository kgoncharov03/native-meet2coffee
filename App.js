import React, { useEffect, useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';

import AuthContext from './auth/context';

import authStorage from './auth/storage';

import apiClient from './api/client';

function App() {
    const [user, setUser] = useState(true);

    const restoreToken = async () => {
        const token = await authStorage.getToken();
        if (!token) return;

        const result = await apiClient.get('/User', {}, {});

        console.log(result);
        console.log('RESTORED TOKEN', token);

        if (!result.ok) return;

        setUser(token);
    };

    useEffect(() => {
        restoreToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {user ? <AppNavigator /> : <LoginScreen />}
        </AuthContext.Provider>
    );
}

export default App;
