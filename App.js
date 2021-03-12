import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";

import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyA-qRwiVlr7gIpH-jQLfKRVM5k1Z-UBDjY",
  authDomain: "instagram-dev-4cfd0.firebaseapp.com",
  projectId: "instagram-dev-4cfd0",
  storageBucket: "instagram-dev-4cfd0.appspot.com",
  messagingSenderId: "1013660952672",
  appId: "1:1013660952672:web:469b902d0e5e46aecdbb05",
  measurementId: "G-KE4JNP3H6T",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";

const Stack = createStackNavigator();

class App extends Component {
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
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>User is logged in!!!</Text>
      </View>
    );
  }
}

export default App;
