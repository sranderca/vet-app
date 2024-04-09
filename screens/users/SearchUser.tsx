import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { FAB, TextInput, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAtomValue } from "jotai";
import { globalPocketbase } from "../../globals";
import SearchPatResult from "../../components/SearchPatResult";
import Patient from "../../types/Patient";

const UserLog = ({ navigation }: { navigation: any }) => {
  const pb = useAtomValue(globalPocketbase);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Patient[]>([]);

  function search() {
    pb.collection("patients")
      .getList<Patient>(1, 30, {
        filter: `name ~ "${searchText}"`,
      })
      .then((res) => {
        console.log(res.items);
        setResults(res.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      search();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    search();
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          mode="outlined"
          label="Buscar Paciente"
          value={searchText}
          onChangeText={setSearchText}
          right={<TextInput.Icon onPress={search} icon={"text-search"} />}
        />
      </View>
      <ScrollView style={styles.resultsContainer}>
        {results.map((pat) => (
          <SearchPatResult key={pat.id} pat={pat} navigation={navigation} />
        ))}
        {results.length === 0 && (
          <Text style={styles.notFoundText}>No hay resultados</Text>
        )}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon={({ color }) => (
          <Ionicons name="md-person-add" size={24} color={color} />
        )}
        onPress={() => navigation.navigate("Agregar Paciente")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  notFoundText: {
    textAlign: "center",
    marginTop: 10,
  },
  searchInputContainer: {
    margin: 10,
  },
  // set fab position to bottom right
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
  searchInput: {
    backgroundColor: "#FFF",
  },
  resultsContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

export default UserLog;
