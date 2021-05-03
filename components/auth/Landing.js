import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

function Landing(props) {
  return (
    <View style={styles.container}>
      <Button
        title="Register"
        onPress={() => NavigationContainer.navigate("Register")}
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
