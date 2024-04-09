import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Button, FAB } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  globalLogDetails,
  globalPatientDetails,
  globalPocketbase,
} from "../../globals";
import Log from "../../types/Log";
import formatDate from "../../util/formatDate";

const UserDetails = ({ navigation }: { navigation: any }) => {
  const patDetails = useAtomValue(globalPatientDetails);
  const [logs, setLogs] = useState<any[]>([]);
  const pb = useAtomValue(globalPocketbase);
  const setCurrentLog = useSetAtom(globalLogDetails);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refresh();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    if (patDetails === undefined) {
      navigation.navigate("SearchVets");
      return;
    }
    pb.collection("patients")
      .getOne(patDetails.id, { expand: "logs" })
      .then((res) => {
        setLogs((res.expand.logs as unknown as Log[]).reverse() || []);
        console.log(res.expand);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {logs.map((log) => (
          <Button
            onPress={() => {
              setCurrentLog(log);
              navigation.navigate("Historia Clinica");
            }}
            style={styles.logButton}
            mode="contained"
            key={log.id}
          >{`Fecha: ${formatDate(log.created)}`}</Button>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon={({ color }) => (
          <MaterialCommunityIcons
            name="notebook-plus"
            size={24}
            color={color}
          />
        )}
        onPress={() => navigation.navigate("Agregar Historia")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
  logButton: {
    margin: 10,
    borderRadius: 0,
  },
  scrollContainer: {
    height: "100%",
  },
});

export default UserDetails;
