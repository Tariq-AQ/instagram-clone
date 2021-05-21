import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons";

function AddNewButton(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    bottom: 40,
    borderColor: "white",
    backgroundColor: "black",
    borderWidth: 10,
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AddNewButton;
