import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Card, Divider, IconButton } from "react-native-paper";
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Patient from "../types/Patient";
import { useSetAtom } from "jotai";
import { globalPatientDetails } from "../globals";




export default function SearchPatResult({pat, navigation}: {pat: Patient, navigation: any}) {
  const setPatDetails = useSetAtom(globalPatientDetails);
  return (
    <Card style={styles.card} mode="contained" onPress={() => {setPatDetails(pat);navigation.navigate("Historias Clinicas")}}>
      <Card.Title
        title={pat.name}
        subtitle={"ID: " + pat.id}
        left={(props) => <Avatar.Icon {...props} icon="inbox" />}
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