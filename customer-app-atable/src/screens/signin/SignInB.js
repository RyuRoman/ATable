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

// SignInB Config
const PLACEHOLDER_TEXT_COLOR = "rgba(0, 0, 0, 0.4)";
const INPUT_TEXT_COLOR = "black";
const INPUT_BORDER_COLOR = "#82ae46";
const INPUT_FOCUSED_BORDER_COLOR = "#82ae46";

// SignInB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  contentContainerStyle: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "space-between"
  },
  form: {
    paddingHorizontal: Layout.SMALL_PADDING
  },
  inputContainer: { marginBottom: 7 },
  buttonContainer: {
    paddingTop: 23
  },
  forgotPassword: {
    paddingVertical: 23
  },
  forgotPasswordText: {
    fontWeight: "300",
    fontSize: 13,
    color: Colors.black,
    textAlign: "center"
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
  buttonsGroup: {
    paddingTop: 23
  },
  vSpacer: {
    height: 15
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

// SignInB
export default class SignInB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailFocused: false,
      password: "",
      passwordFocused: false
    };
  }

  signInFunction = () => {
    global.api = "https://api.atable-lecrou.me/api";
    this.setState(
      {
        emailFocused: false,
        passwordFocused: false
      }
    );
      let body = {
        email: this.state.email,
        password: this.state.password
      };
    axios.post(global.api + '/user/login', body)
  .then((response) => {
    if (response.status == 200) {
      global.token = response.data["bearerToken"];
      axios.get(global.api + '/user/current/' + this.state.email, {
        headers: {
          'Authorization': 'Bearer ' + global.token
        }}).then((response) => {
          if (response.status == 200) {
            if (response.data["phone"] == null) {
              response.data["phone"] = "Non renseigné";
            }

            global.userInfos = {
              email: response.data['email'],
              id: response.data['id'],
              fname: response.data["first_name"],
              lname: response.data["last_name"],
              customer_id: -1
            };

            if (response.data["customer_id"] != null) {
              global.userInfos["customer_id"] = response.data["customer_id"];
            }

            if (response.data["customer_id"] == null) {
              let body = {
                user_id: response.data["id"]
              };
              axios.post(global.api + '/customer', body, {
                headers: {
                  'Authorization': `Bearer ${global.token}`
                }
              })
              .then((response) => {
                if (response.status == 200) {
                  let body = {
                    customer_id: response.data["id"]
                  };
                  global.userInfos["customer_id"] = response.data["id"];
                  axios.put(global.api + '/user/' + global.userInfos["id"], body, {
                    headers: {
                      'Authorization': `Bearer ${global.token}`
                    }}).then((response) => {
                        console.log(global.userInfos["customer_id"]);
                    }).catch(function(error) {
                        alert("Erreur");
                        throw error;
                    });
                }
              }).catch(function(error) {
                alert("error");
                throw error;
              });
            }
            this.props.navigation.navigate("Home");

         }}).catch(function(error) {
          throw error;
        });
    }
  }).catch(function(error) {
    alert('Identifiant ou mot de passe incorrect');
      throw error;
    });

  };

  emailChange = text => {
    this.setState({
      email: text
    });
  };

  emailFocus = () => {
    this.setState({
      passwordFocused: false
    });
  };

  passwordChange = text => {
    this.setState({
      password: text
    });
  };

  passwordFocus = () => {
    this.setState({
      emailFocused: false
    });
  };

  onTogglePress = () => {
    const { secureTextEntry } = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry
    });
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    const {
      email,
      emailFocused,
      password,
      passwordFocused,
      secureTextEntry
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
                    this.email = r;
                  }}
                  onChangeText={this.emailChange}
                  onFocus={this.emailFocus}
                  inputFocused={emailFocused}
                  onSubmitEditing={this.focusOn(this.password)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="email-address"
                  placeholder="Adresse email"
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
                  onSubmitEditing={this.signInFunction}
                  returnKeyType="go"
                  placeholder="Mot de passe"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  secureTextEntry={secureTextEntry}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  toggleVisible={password.length > 0}
                  onTogglePress={this.onTogglePress}
                  inputContainerStyle={styles.inputContainer}
                />

                <View style={styles.buttonContainer}>
                  <ContainedButton
                    onPress={this.signInFunction}
                    color={Colors.atable}
                    title={"connexion".toUpperCase()}
                  />
                </View>

                
              </View>

              <TouchableWithoutFeedback onPress={this.navigateTo("TermsConditions")}>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    En vous connectant, vous acceptez nos
                  </Text>
                  <View style={styles.termsContainer}>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Termes et Conditions
                    </Text>
                    <Text style={styles.footerText}> et notre </Text>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Police de confidentialité
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
