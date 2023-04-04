import React, { Component } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Image } from "react-native";

// import components
import Button from "../../components/buttons/Button";
import GradientContainer from "../../components/gradientcontainer/GradientContainer";
import LinkButton from "../../components/buttons/LinkButton";
import Logo from "../../components/logo/Logo";
import Atable from "../../../assets/atable.png";

// import colors
import Colors from "../../theme/colors";

// WelcomeB Config

// WelcomeB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
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
  tinyLogo: {
    width: 150,
    height: 150,
  },
  linkButtonText: {
    color: Colors.white
  }
});

// WelcomeB Screen
export default class WelcomeB extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    return (
      <GradientContainer>
        <StatusBar
          backgroundColor={Colors.atable}
          barStyle="light-content"
        />
        <SafeAreaView style={styles.screenContainer}>
          <View style={styles.logoContainer}>
            <Image source={Atable} style={styles.tinyLogo} />
          </View>

          <View style={styles.buttonsGroup}>
            <Button
              onPress={this.navigateTo("SignUp")}
              title={"je suis nouveau".toUpperCase()}
              titleColor={Colors.atable}
              color={Colors.white}
            />

            <View style={styles.vspace16} />

            <Button
              onPress={this.navigateTo("SignIn")}
              borderColor={Colors.white}
              title={"j'ai déjà un compte".toUpperCase()}
              titleColor={Colors.white}
              color={Colors.atable}
            />

          </View>
        </SafeAreaView>
      </GradientContainer>
    );
  }
}
