import React from 'react';

import AppNavigator from '../navigation/AppNavigator';
import AuthContext from './context';

import AuthNavigator from '../navigation/AuthNavigator';

export default function AuthContextRoute({ user, setUser }) {
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </AuthContext.Provider>
    );
}
