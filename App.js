import React, { useEffect, useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';

//import AuthContext from './auth/context';

import authStorage from './auth/storage';

import apiClient from './api/client';

import authApi from './api/auth';


import LinkedinLogin from './screens/LinkedInLogin';

import AuthContextRoute from './auth/AuthContextRoute';

import ActivityIndicatorScreen from './screens/ActivityIndicatorScreen';

function App() {


    const [user, setUser] = useState(false);
    const [loadingToken, isLoadingToken] = useState(true);


    const restoreToken = async () => {
        
        isLoadingToken(true)

        const token = await authStorage.getToken();
     
       
        if (!token) {

            isLoadingToken(false);
            
            return;

        }

        const tokenValidity = await authApi.checkToken(token);


        if (!tokenValidity.ok) {
          
            await authStorage.removeToken();
            isLoadingToken(false);
            return;
        }

        isLoadingToken(false);
        setUser(token);
       
    };

    useEffect(() => {
        restoreToken();
    }, []);

    return (

      <>

      {loadingToken ? <ActivityIndicatorScreen/> : <AuthContextRoute user={user} setUser={setUser}/> }

      </>


    );
}

export default App;
