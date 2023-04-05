import React from 'react';
import { AuthNavigator } from '../navigation/AuthNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { AppNavigator } from '../navigation/AppNavigator';

export const AuthContextRoute = () => {
    const loggedIn = useSelector((state: RootState) => state.loggedIn);
    console.log(loggedIn);
    return <>{loggedIn ? <AppNavigator /> : <AuthNavigator />}</>;
};
