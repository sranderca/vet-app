import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Card, Divider, IconButton } from "react-native-paper";
import Vet from "../types/Vet";
import { useSetAtom } from "jotai";
import { globalVetDetails } from "../globals";

export default function SearchVetResult({vet, navigation}: {vet: Vet, navigation: any}) {
  const setVetDetails = useSetAtom(globalVetDetails);
  return (
    <Card style={styles.card} mode="contained" onPress={() => {setVetDetails(vet);navigation.navigate("Historias Clinicas")}}>
      <Card.Title
        title={vet.name}
        subtitle={"Historias: " + vet.logs_maded.length}
        left={(props) => <Avatar.Icon {...props} icon="account" />}
        right={(props) => (
          <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    backgroundColor: "#FFF",
  },
});
