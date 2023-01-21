import React, { useEffect, useState } from 'react'
import AppNavigator from './navigation/AppNavigator'
import LoginScreen from './screens/LoginScreen';

import AuthContext from './auth/context';

import authStorage from "./auth/storage"

import apiClient from './api/client';

import authApi from './api/auth';

 function App() {


  const [user,setUser] = useState(false);

  const restoreToken = async()=>{

      const token = await authStorage.getToken();
      //console.log(token)
      if(!token) return;


      const token_validity = await authApi.check_token(token);

      if(!token_validity.ok) {
        await authStorage.removeToken();
        return;
      }

      setUser(token)
      
  }
  
  useEffect(() => {
  restoreToken();
  },[])

  return (

     <AuthContext.Provider value ={{user,setUser}}> 

            {user ? <AppNavigator/> : <LoginScreen/>}

      </AuthContext.Provider>

 )
  
}

export default App;