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
      <View style={styles.container}>
        <TextInput style={styles.email}
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput style={styles.password}
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
        />
        <Button style={styles.button}
          onPress={() => {
            this.onSignIn();
          }}
          title="Sign In"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  email:{
    borderWidth: 1,
    width: "100%",
    height: 40,
    marginVertical: 10,
    paddingLeft:10,
    borderRadius: 10,
    borderColor: 'grey',
  },
  password:{
    borderWidth: 1,
    width: "100%",
    height: 40,
    marginVertical: 10,
    paddingLeft:10,
    borderRadius: 10,
    borderColor: 'grey',
  },
  container:{
    marginVertical:200,
    width: "80%",
    justifyContent: 'center',
    alignSelf: 'center'
  },
  button:{
    borderRadius: 10,
  }
});
export default Login;
