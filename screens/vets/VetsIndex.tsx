import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchVet from './SearchVet';
import AddVet from './AddVet';
import VetDetails from './VetDetails';
import ViewLog from '../ViewLog';

const Stack = createNativeStackNavigator();

const VetsIndex = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="SearchVets" component={SearchVet} options={{ headerShown: false }}/>
        <Stack.Screen name="Historias Clinicas" component={VetDetails}/>
        <Stack.Screen name="Historia Clinica" component={ViewLog}/>
        <Stack.Screen name="Agregar Veterinario" component={AddVet} />
      </Stack.Navigator>
  )
}

export default VetsIndex