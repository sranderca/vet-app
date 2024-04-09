import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  PaperProvider,
  DefaultTheme,
  MD3Theme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import eventsource from "react-native-sse";
import Login from "./screens/Login";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import SearchVet from "./screens/vets/SearchVet";
import VetsIndex from "./screens/vets/VetsIndex";
import UserIndex from "./screens/users/UserIndex";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logout from "./screens/Logout";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { globalInitialNavigation } from "./globals";
global.EventSource = eventsource as any;

const Tabs = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
const theme: MD3Theme = {
  ...DefaultTheme,
  dark: true,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
         <StatusBar style="auto" />
        </NavigationContainer>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function HomeScreen({navigation}: {navigation: any}) {
  const setInitialNavigation = useSetAtom(globalInitialNavigation);
  useEffect(() => {
    setInitialNavigation(navigation);
  }, [navigation])
  return (
          <Tabs.Navigator>
          <Tabs.Screen
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome5
                name="user-md"
                size={24}
                color="black" />
              ),
            }}
            name="Veterinarios"
            component={VetsIndex}
          />

          <Tabs.Screen 
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                 name="notebook"
                  size={24}
                 color="black"
                 />
              )
            }}
            name="Pacientes" component={UserIndex} />

           <Tabs.Screen
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="login" color={color} size={24} />
                ),
              }}
              name="Cerrar Sesión"
              component={Logout}
            />
          </Tabs.Navigator>
    );
}