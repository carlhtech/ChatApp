import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { withAuthenticator } from "aws-amplify-react-native";
import { getUser } from './src/graphql/queries';

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config)


function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // run only when first mounted
  useEffect(() => {
    const fetchUser = async () => {
      // get autheticated user from auth
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });

      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(
            getUser, { id: userInfo.attributes.sub }
          )
        )

        if (userData.data.getUser) {
          console.log("User is already registered in database")
        }
      }
    }
    fetchUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
