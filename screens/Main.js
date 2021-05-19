import React, { Component } from "react";
import { Text, SafeAreaView } from "react-native";
import firebase from "firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    console.log(currentUser);
    if (currentUser == undefined) {
      return (
        <SafeAreaView>
          <Text>No users found</Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView>
        <Text>{currentUser.name} is Logged In!</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
