import { View, StyleSheet, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { globalPatientDetails, globalPocketbase } from "../../globals";
import Log from "../../types/Log";

const AddLog = () => {
  const currentPatient = useAtomValue(globalPatientDetails);
  const pb = useAtomValue(globalPocketbase);
  const [log, setLog] = useState("");
  function addLog() {
    if (!currentPatient) return;
    if (!pb.authStore.model) return;
    if (log.length === 0) return;
    console.log(pb.authStore.model.id);
    pb.collection("logs")
      .create({
        log,
        from: currentPatient.id,
        patient: currentPatient.name,
      })
      .then((logRes) => {
        console.log(logRes);
        pb.collection("patients")
          .update(currentPatient.id, {
            ...currentPatient,
            logs: [...currentPatient.logs, logRes.id],
          })
          .then(async (res) => {
            console.log(res);
            const user = await pb.collection("users").getOne(pb.authStore.model?.id || "")
            pb.collection("users").update(user.id, {
              ...user,
              logs_maded: [...user.logs_maded, logRes.id]
            }).then((res) => {
              console.log(res);
            }).catch((err) => {
              console.log(err);
            })
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  }

  return (
    <View style={styles.container}>
      <Text
        variant="displayMedium"
        style={{ alignSelf: "center", marginTop: "2%" }}
      >
        AddLog
      </Text>
      <TextInput
        multiline
        style={styles.input}
        value={log}
        onChangeText={setLog}
      />
      <Button
        mode="contained"
        style={{ marginHorizontal: "5%", marginBottom: "5%" }}
        onPress={() => {
          addLog();
          setLog("");
        }}
      >
        Agregar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alingItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  input: {
    height: "100%",
    margin: "5%",
    padding: "2%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
});

export default AddLog;
