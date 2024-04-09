import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { globalInitialNavigation, globalPocketbase } from '../globals';
import { useAtomValue } from 'jotai';

const Logout = () => {
  const pb = useAtomValue(globalPocketbase);
  const initialNavigation = useAtomValue(globalInitialNavigation);
  useEffect(() => {
    if (!initialNavigation) return;
    pb.authStore.clear();
    initialNavigation.navigate("Login");
  }, [])

  return (
    <View style={{ height: "100%", flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Cerrando Sesion...</Text>
    </View>
  )
}

export default Logout