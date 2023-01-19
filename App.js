import React, { useEffect, useState } from 'react'
import AppNavigator from './navigation/AppNavigator'
import LoginScreen from './screens/LoginScreen';

import AuthContext from './auth/context';

import authStorage from "./auth/storage"

import apiClient from './api/client';


 function App() {


  const [user,setUser] = useState(false);

  const restoreToken = async()=>{

      const token = await authStorage.getToken();
      //console.log(token)
      if(!token) return;
    
      //console.log("RESTORED TOKEN",token)

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