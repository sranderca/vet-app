import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import { z } from "zod";
import { useAtomValue } from "jotai";
import { globalPocketbase } from "../../globals";

const AddVet = () => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [dir, setDir] = useState("");
  const pb = useAtomValue(globalPocketbase);

  function addVeterinarian() {
    if (!vetValidation.safeParse({ name, tel, dir }).success) {
      console.log("invalid form");
      return;
    }
    pb.collection("patients")
      .create({
        name,
        telephone: tel,
        address: dir
      })
      .then((res) => {
        console.log(res);
        setName("");
        setTel("");
        setDir("");
        
      });
  }

  return (
    <ScrollView>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={244} icon="account-plus" />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label={"Nombre"}
          mode="outlined"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.textInput}
          label={"Teléfono"}
          mode="outlined"
          value={tel}
          onChangeText={setTel}
        />
        <TextInput
          style={styles.textInput}
          label={"Dirección"}
          mode="outlined"
          value={dir}
          onChangeText={setDir}
        />
        <Button mode="contained" style={styles.sendButton} onPress={addVeterinarian}>
          Agregar Paciente
        </Button>
      </View>
    </ScrollView>
  );
};

const vetValidation = z.object({
  name: z.string().min(1),
  tel: z.string().min(3),
  dir: z.string().min(3)
});

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  textInput: {
    marginTop: "1%",
  },
  avatarContainer: {
    marginTop: "10%",
    marginBottom: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    margin: 10,
  },
  sendButton: {
    marginTop: "5%",
    borderRadius: 5,
  },
  textStyle: {},
});
export default AddVet;