import React, { Component } from "react";
import MainNavigator from "./navigation/MainNavigator";
import { View, Text } from "react-native";
import { firebase } from "./firebase";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducers from "./redux/reducers";
import thunk from "redux-thunk";
import Main from "./screens/Main";

const store = createStore(rootReducers, applyMiddleware(thunk));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View>
          <Text>Loading..</Text>
        </View>
      );
    } else if (!loggedIn) {
      return <MainNavigator />;
    }
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
