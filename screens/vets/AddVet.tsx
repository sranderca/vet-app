import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import { z } from "zod";
import { useAtomValue } from "jotai";
import { globalPocketbase } from "../../globals";

const AddVet = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isHiddedPassword, setIsHiddenPassword] = useState(true);
  const [isHiddedConfirmPassword, setIsHiddenConfirmPassword] = useState(true);
  const pb = useAtomValue(globalPocketbase);

  function addVeterinarian() {
    if (!vetValidation.safeParse({ name, email, password }).success && password === passwordConfirm) {
      console.log("invalid form");
      return;
    }
    pb.collection("users")
      .create({
        username: name,
        name,
        email,
        password,
        passwordConfirm
      })
      .then((res) => {
        console.log(res);
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
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
          label={"Email"}
          mode="outlined"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.textInput}
          label={"Contraseña"}
          mode="outlined"
          secureTextEntry={isHiddedPassword}
          right={
            <TextInput.Icon
              onPress={() => setIsHiddenPassword((prev) => !prev)}
              icon={isHiddedPassword ? "eye" : "eye-off"}
            />
          }
          value={password}
          onChangeText={setPassword}
        />
                <TextInput
          style={styles.textInput}
          label={"Confirmar Contraseña"}
          mode="outlined"
          secureTextEntry={isHiddedConfirmPassword}
          right={
            <TextInput.Icon
              onPress={() => setIsHiddenConfirmPassword((prev) => !prev)}
              icon={isHiddedConfirmPassword ? "eye" : "eye-off"}
            />
          }
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />
        <Button mode="contained" style={styles.sendButton} onPress={addVeterinarian}>
          Agregar Veterinario
        </Button>
      </View>
    </ScrollView>
  );
};

const vetValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
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
