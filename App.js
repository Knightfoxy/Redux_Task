import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Listing from './Screens/ListingScreen';
import FormScreen from './Screens/FormScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Listing"
          component={Listing}
          options={({navigation}) => ({
            title: 'User List',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#7F00FF',
            },
            headerRight: () => (
              <Button
                onPress={() =>
                  navigation.navigate('FormScreen', {
                    data: {},
                    editMode: false,
                  })
                }
                title="Add +"
                color="white"
              />
            ),
          })}
        />
        <Stack.Screen
          name="FormScreen"
          component={FormScreen}
          options={({navigation}) => ({
            title: 'Enter Details',
            headerTintColor: 'black',
            headerStyle: {
              backgroundColor: 'white',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
