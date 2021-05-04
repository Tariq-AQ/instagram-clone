import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./Login";
import Register from "./Register";

function Landing(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Register"
        onPress={() => props.navigation.navigate("Register")}
      />
      <Button
        title="Login"
        onPress={() => props.navigation.navigate("Login")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default Landing;
