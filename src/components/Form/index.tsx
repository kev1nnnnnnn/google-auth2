import React, {useState} from 'react';
import * as AuthSession from 'expo-auth-session';
import { User, UserProps } from '../User';
import { Button } from '../Button';

import { Container } from './styles';


export function Form() {

  const [userData, setUserData] = useState<UserProps>({} as UserProps);

  async function handleGoogleSignIn() {

    type AuthResponse = {
      params: {
        access_token: string;
      };
      type: string;
    }
    
    try {
      const CLIENT_ID = "701411180270-rf6s37ojfb5pepfqqk8vlvpn93lutmc1.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@developernbn/mobcusto";
      const SCOPE = encodeURI("profile email");
      const RESPONSE_TYPE = "token";
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const {type, params} = await AuthSession.startAsync({ authUrl }) as AuthResponse;
      console.log(type, params);

      if(type === "success") {

        const  response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const user = await response.json();
        setUserData(user);
        
      }
      

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Button
        icon="google"
        title="Entrar com Google"
        onPress={handleGoogleSignIn}
      />

      <User user={userData}/> 
    </Container>
  )
}