import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPatient from "./AddPatient";
import UserLog from "./SearchUser";
import UserDetails from "./UserDetails";
import ViewLog from "../ViewLog";
import AddLog from "./AddLog";

const Stack = createNativeStackNavigator();

const UserIndex = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="SearchVets" component={UserLog} options={{ headerShown: false }}/>
        <Stack.Screen name="Historias Clinicas" component={UserDetails} />
        <Stack.Screen name="Historia Clinica" component={ViewLog}/>
        <Stack.Screen name="Agregar Paciente" component={AddPatient} />
        <Stack.Screen name="Agregar Historia" component={AddLog} />
      </Stack.Navigator>
  )
}

export default UserIndex