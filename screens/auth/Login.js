import React, { Component } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { firebase } from "../../firebase";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.onSignUp = this.onSignIn.bind(this);
  }
  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
        />
        <Button
          onPress={() => {
            this.onSignIn();
          }}
          title="Sign In"
        />
      </View>
    );
  }
}

export default Login;
