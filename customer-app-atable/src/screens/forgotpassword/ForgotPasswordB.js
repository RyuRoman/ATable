import React, { Component } from "react";
import { Keyboard, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import Color from "color";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";

// import components
import ActivityIndicatorModal from "../../components/modals/ActivityIndicatorModal";
import Button from "../../components/buttons/Button";
import GradientContainer from "../../components/gradientcontainer/GradientContainer";
import { Paragraph } from "../../components/text/CustomText";
import UnderlineTextInput from "../../components/textinputs/UnderlineTextInput";

// import colors, layout
import Colors from "../../theme/colors";

// ForgotPasswordB Config
const PLACEHOLDER_TEXT_COLOR = "rgba(255, 255, 255, 0.7)";
const INPUT_TEXT_COLOR = "#fff";
const INPUT_BORDER_COLOR = "rgba(255, 255, 255, 0.4)";
const INPUT_FOCUSED_BORDER_COLOR = "#fff";
const BUTTON_BORDER_RADIUS = 4;

// ForgotPasswordB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  instructionContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Color(Colors.surface).alpha(0.96)
  },
  instruction: {
    marginTop: 32,
    paddingHorizontal: 40,
    fontSize: 14,
    color: Colors.onPrimaryColor,
    textAlign: "center"
  },
  inputContainer: {
    margin: 20
  },
  inputStyle: {
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 20
  }
});

// ForgotPasswordB
export default class ForgotPasswordB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailFocused: false,
      modalVisible: false
    };
  }

  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }

  // avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  keyboardDidShow = () => {
    this.setState({
      emailFocused: true
    });
  }

  keyboardDidHide = () => {
    this.setState({
      emailFocused: false
    });
  }

  emailChange = text => {
    this.setState({
      email: text
    });
  };

  navigateTo = screen => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  resetPassword = () => {
    Keyboard.dismiss();
    this.setState(
      {
        modalVisible: true,
        emailFocused: false
      },
      () => {
        // for demo purpose after 3s close modal
        this.timeout = setTimeout(() => {
          this.closeModal();
        }, 3000);
      }
    );
  };

  closeModal = () => {
    // for demo purpose clear timeout if user request close modal before 3s timeout
    clearTimeout(this.timeout);
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const { emailFocused, modalVisible } = this.state;

    return (
      <GradientContainer>
        <SafeAreaView
          forceInset={{ top: "never" }}
          style={styles.screenContainer}
        >
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.instructionContainer}>
              <View style={styles.iconContainer}>
                <Icon name="lock-outline" size={36} color={Colors.primaryColor} />
              </View>
              <Paragraph style={styles.instruction}>
                Enter your e-mail address below to receive your password reset instruction
              </Paragraph>
            </View>

            <View style={styles.inputContainer}>
              <UnderlineTextInput
                onChangeText={this.emailChange}
                inputFocused={emailFocused}
                onSubmitEditing={this.resetPassword}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="E-mail address"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputStyle={styles.inputStyle}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                onPress={this.resetPassword}
                disabled={false}
                borderRadius={BUTTON_BORDER_RADIUS}
                color={Colors.surface}
                small
                title={"Reset password".toUpperCase()}
                titleColor={Colors.primaryColor}
              />
            </View>

            <ActivityIndicatorModal
              statusBarColor={Colors.primaryColorDark}
              message="Please wait . . ."
              onRequestClose={this.closeModal}
              title="Sending instructions"
              visible={modalVisible}
            />
          </ScrollView>
        </SafeAreaView>
      </GradientContainer>
    );
  }
}
