/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, ToastAndroid } from "react-native";

// import components
import Button from "../../components/buttons/Button";
import LinkButton from "../../components/buttons/LinkButton";
import Logo from "../../components/logo/Logo";

import SyncStorage from 'sync-storage';

// import colors
import Colors from "../../theme/colors";

// WelcomeA Config

// WelcomeA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  logoContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsGroup: {
    flex: 3,
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%"
  },
  vspace16: {
    height: 16
  },
  vspace32: {
    height: 32
  },
  linkButtonText: {
    color: Colors.onSurface
  }
});

// WelcomeA Screen
export default class WelcomeA extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    
    SyncStorage.set('API_URL', 'https://api.atable-lecrou.me');

  }


  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.logoContainer}>
          <Logo size={120} tintColor={Colors.primaryColor} />
        </View>

        <View style={styles.buttonsGroup}>
          <Button
            onPress={this.navigateTo("SignUp")}
            title={"Je suis nouveau".toUpperCase()}
          />

          <View style={styles.vspace16} />

          <Button
            onPress={this.navigateTo("SignIn")}
            title={"J'ai déjà un compte".toUpperCase()}
            outlined
          />

          <View style={styles.vspace32} />

        </View>
      </SafeAreaView>
    );
  }
}
