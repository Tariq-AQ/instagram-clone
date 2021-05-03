import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Login from "./Login";
import Register from "./Register";

function Landing(props) {
  return (
    <View style={styles.container}>
      <Button
        title="Register"
        onPress={() => props.navigation.navigate("Register")}
      />
      <Button
        title="Login"
        onPress={() => NavigationContainer.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default Landing;
