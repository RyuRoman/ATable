import React, { Component } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import components
import ContainedButton from "../../components/buttons/ContainedButton";
import GradientContainer from "../../components/gradientcontainer/GradientContainer";
import UnderlinePasswordInput from "../../components/textinputs/UnderlinePasswordInput";
import UnderlineTextInput from "../../components/textinputs/UnderlineTextInput";

// import colors, layout
import Colors from "../../theme/colors";
import Layout from "../../theme/layout";
import axios from 'axios'

// SignUpB Config
const PLACEHOLDER_TEXT_COLOR = "rgba(0, 0, 0, 0.4)";
const INPUT_TEXT_COLOR = "black";
const INPUT_BORDER_COLOR = "#82ae46";
const INPUT_FOCUSED_BORDER_COLOR = "#82ae46";

// SignUpB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  contentContainerStyle: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "space-between"
  },
  form: {
    paddingHorizontal: Layout.SMALL_PADDING
  },
  inputContainer: { marginBottom: 7 },
  vSpacer: {
    height: 15
  },
  buttonContainer: {
    paddingVertical: 23
  },
  buttonsGroup: {
    paddingTop: 23
  },
  separator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR
  },
  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%"
  },
  termsContainer: {
    flexDirection: "row"
  },
  footerText: {
    fontWeight: "300",
    fontSize: 13,
    color: Colors.black
  },
  footerLink: {
    fontWeight: "400",
    textDecorationLine: "underline"
  }
});

// SignUpB
export default class SignUpB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailFocused: false,
      password: "",
      passwordFocused: false,
      secureTextEntry: true,
      password_confirmation: "",
      password_confirmationFocused: false,
      secureTextEntry: true,
      first_name: "",
      first_nameFocused: false,
      last_name: "",
      last_nameFocused: false,
      gender: "",
      genderFocused: false
    };
  }

  first_nameChange = text => {
    this.setState({
      first_name: text
    });
  }

  first_nameFocus = () => {
    this.setState({
      first_nameFocused: true,
      last_nameFocused: false,
      emailFocused: false,
      passwordFocused: false,
      password_confirmationFocused: false,
      genderFocused: false
    });
  };

  last_nameChange = text => {
    this.setState({
      last_name: text
    });
  };

  last_nameFocus = () => {
    this.setState({
      first_nameFocused: false,
      last_nameFocused: true,
      emailFocused: false,
      passwordFocused: false,
      password_confirmationFocused: false,
      genderFocused: false
    });
  };

  emailChange = text => {
    this.setState({
      email: text
    });
  };

  emailFocus = () => {
    this.setState({
      first_nameFocused: false,
      last_nameFocused: false,
      emailFocused: true,
      passwordFocused: false,
      password_confirmationFocused: false,
      genderFocused: false
    });
  };

  passwordChange = text => {
    this.setState({
      password: text
    });
  };

  passwordFocus = () => {
    this.setState({
      first_nameFocused: false,
      last_nameFocused: false,
      emailFocused: false,
      passwordFocused: true,
      password_confirmationFocused: false,
      genderFocused: false
    });
  };

  password_confirmationChange = text => {
    this.setState({
      password_confirmation: text
    });
  };

  password_confirmationFocus = () => {
    this.setState({
      first_nameFocused: false,
      last_nameFocused: false,
      emailFocused: false,
      passwordFocused: false,
      password_confirmationFocused: true,
      genderFocused: false
    });
  };

  genderChange = text => {
    this.setState({
      gender: text
    });
  };

  genderFocus = () => {
    this.setState({
      first_nameFocused: false,
      last_nameFocused: false,
      emailFocused: false,
      passwordFocused: false,
      password_confirmationFocused: false,
      genderFocused: true
    });
  };

  onTogglePress = () => {
    const { secureTextEntry } = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry
    });
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  createAccount = () => {
    //const { email, phone, password, first_name } = this.state;
    this.setState(
      {
        first_nameFocused: false,
        last_nameFocused: false,
        emailFocused: false,
        passwordFocused: false,
        password_confirmationFocused: false,
        genderFocused: false
      }
    );

    let body = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };

    if (this.state.first_name != "" && this.state.last_name != "" && this.state.email != "" && this.state.password != "" && this.state.password_confirmation != "") {
      if (this.state.password_confirmation == this.state.password) {
    axios.post(global.api + '/user/register', body)
    .then((response) => {
      alert(response.status);
    }).catch(function(error) {
      alert("Email déjà utilisé");
      throw error;
    });
  } else {
      alert("Les mots de passe ne sont pas identiques");
    }
    } else {
      alert("Veuillez remplir tous les champs");
    }

  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  render() {
    const {
      first_nameFocused,
      last_nameFocused,
      emailFocused,
      password_confirmationFocused,
      genderFocused,
      password,
      passwordFocused,
      secureTextEntry,
      address,
      birthday,
      city,
      post_code,
      phone,
    } = this.state;

    return (
      <GradientContainer>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <SafeAreaView style={styles.screenContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainerStyle}
          >
            <View style={styles.content}>
              <View />

              <View style={styles.form}>

              <UnderlineTextInput
                  onRef={r => {
                    this.first_name = r;
                  }}
                  onChangeText={this.first_nameChange}
                  onFocus={this.first_nameFocus}
                  inputFocused={first_nameFocused}
                  onSubmitEditing={this.focusOn(this.last_name)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="default"
                  placeholder="Prénom"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />

                <UnderlineTextInput
                  onRef={r => {
                    this.last_name = r;
                  }}
                  onChangeText={this.last_nameChange}
                  onFocus={this.last_nameFocus}
                  inputFocused={last_nameFocused}
                  onSubmitEditing={this.focusOn(this.email)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="default"
                  placeholder="Nom"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />

                <UnderlineTextInput
                  onRef={r => {
                    this.email = r;
                  }}
                  onChangeText={this.emailChange}
                  onFocus={this.emailFocus}
                  inputFocused={emailFocused}
                  onSubmitEditing={this.focusOn(this.password)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="email-address"
                  placeholder="E-mail"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />

                <UnderlinePasswordInput
                  onRef={r => {
                    this.password = r;
                  }}
                  onChangeText={this.passwordChange}
                  onFocus={this.passwordFocus}
                  inputFocused={passwordFocused}
                  onSubmitEditing={this.focusOn(this.password_confirmation)}
                  returnKeyType="next"
                  placeholder="Mot de passe"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  secureTextEntry={secureTextEntry}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  toggleVisible={password.length > 0}
                  toggleText={secureTextEntry ? "Show" : "Hide"}
                  onTogglePress={this.onTogglePress}
                  inputContainerStyle={styles.inputContainer}
                />

                <UnderlinePasswordInput
                  onRef={r => {
                    this.password_confirmation = r;
                  }}
                  onChangeText={this.password_confirmationChange}
                  onFocus={this.password_confirmationFocus}
                  inputFocused={password_confirmationFocused}
                  onSubmitEditing={this.focusOn(this.address)}
                  returnKeyType="next"
                  placeholder="Confirmer mot de passe"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  secureTextEntry={secureTextEntry}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  toggleVisible={password.length > 0}
                  toggleText={secureTextEntry ? "Show" : "Hide"}
                  onTogglePress={this.onTogglePress}
                  inputContainerStyle={styles.inputContainer}
                />

                <UnderlineTextInput
                  onRef={r => {
                    this.gender = r;
                  }}
                  onChangeText={this.genderChange}
                  onFocus={this.genderFocus}
                  inputFocused={genderFocused}
                  onSubmitEditing={this.createAccount}
                  returnKeyType="done"
                  blurOnSubmit={false}
                  keyboardType="default"
                  placeholder="Genre"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />

                <View style={styles.buttonContainer}>
                  <ContainedButton
                    onPress={this.createAccount}
                    color={Colors.atable}
                    title={"Nouveau compte".toUpperCase()}
                  />
                </View>
              </View>

              <TouchableWithoutFeedback onPress={this.navigateTo("TermsConditions")}>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    En vous enregistrant, vous acceptez les
                  </Text>
                  <View style={styles.termsContainer}>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Termes & Conditions
                    </Text>
                    <Text style={styles.footerText}> et </Text>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Politique de confidentialité
                    </Text>
                    <Text style={styles.footerText}>.</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </GradientContainer>
    );
  }
}
