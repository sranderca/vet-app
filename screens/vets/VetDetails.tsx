import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  globalLogDetails,
  globalPocketbase,
  globalVetDetails,
} from "../../globals";
import Vet from "../../types/Vet";
import Log from "../../types/Log";
import { Button } from "react-native-paper";
import formatDate from "../../util/formatDate";

const VetDetails = ({ navigation }: { navigation: any }) => {
  const vetDetails = useAtomValue(globalVetDetails);
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
    if (vetDetails === undefined) {
      navigation.navigate("SearchVets");
      return;
    }
    pb.collection("users")
      .getOne(vetDetails.id, { expand: "logs_maded" })
      .then((res) => {
        setLogs((res.expand.logs_maded as unknown as Log[]).reverse() || []);
        console.log(res.expand);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
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
        >
          {`Paciente: ${log.patient}`} <br />{" "}
          {`Fecha: ${formatDate(log.created)}`}
        </Button>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logButton: {
    margin: 10,
    borderRadius: 0,
  },
  scrollContainer: {
    height: "100%",
  },
});

export default VetDetails;
