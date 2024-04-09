import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useAtomValue } from "jotai";
import { globalLogDetails } from "../globals";
import { Text } from "react-native-paper";
export default function ViewLog() {
  const log = useAtomValue(globalLogDetails);
  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        {log?.patient}
      </Text>
      <ScrollView style={styles.bodyContainer}>
        <Text style={styles.body} variant="bodyLarge">
          {log?.log}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    flexShrink: 1,
  },
  title: {
    marginTop: 20,
  },
  bodyContainer: {
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    marginTop: "5%",
    width: "90%",
    flexGrow: 1,
    flex: 1,
  },
  body: {
    flexShrink: 1,
  },
});
