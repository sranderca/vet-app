import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { globalPocketbase } from "../globals";
import { Ionicons } from "@expo/vector-icons";
import { z } from "zod";
export default function Login({navigation}: {navigation: any}) {
  const pb = useAtomValue(globalPocketbase);
  const [emailText, setEmailText] = useState("");
  const [passText, setPassText] = useState("");
  const [isHiddedPassword, setIsHiddenPassword] = useState(true);

  function onLogin() {
    if (!formValidation.safeParse({ email: emailText, password: passText })) {
      console.log("invalid form");
      return;
    }
    pb.collection("users")
      .authWithPassword(emailText, passText)
      .then((user) => {
        navigation.navigate("Home");
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={244} icon="dog" />
      </View>
      <View style={styles.loginForm}>
        <TextInput
          style={styles.textInput}
          label="Email"
          value={emailText}
          onChangeText={(textUser) => setEmailText(textUser)}
        />
        <TextInput
          style={styles.textInput}
          label="Contraseña"
          value={passText}
          secureTextEntry={isHiddedPassword}
          onChangeText={(textPass) => setPassText(textPass)}
          right={
            <TextInput.Icon
              onPress={() => setIsHiddenPassword((prev) => !prev)}
              icon={isHiddedPassword ? "eye" : "eye-off"}
            />
          }
        />
        <Button style={styles.loginButton} mode="contained" onPress={onLogin}>
          Iniciar Sesión
        </Button>
      </View>
    </View>
  );
}

const formValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginBottom: "20%",
  },
  loginButton: {
    marginTop: 5,
    borderRadius: 5,
  },
  avatarContainer: {
    marginTop: "10%",
    marginBottom: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    height: "100%",
    margin: "6%",
  },
  textInput: {
    marginVertical: 5,
  },
});
