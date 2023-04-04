/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View, ToastAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import components
import Button from "../../components/buttons/Button";
import UnderlinePasswordInput from "../../components/textinputs/UnderlinePasswordInput";
import UnderlineTextInput from "../../components/textinputs/UnderlineTextInput";

// import colors, layout
import Colors from "../../theme/colors";
import Layout from "../../theme/layout";

import SyncStorage from 'sync-storage';

// SignUpA Config
const PLACEHOLDER_TEXT_COLOR = "rgba(0, 0, 0, 0.4)";
const INPUT_TEXT_COLOR = "rgba(0, 0, 0, 0.87)";
const INPUT_BORDER_COLOR = "rgba(0, 0, 0, 0.2)";
const INPUT_FOCUSED_BORDER_COLOR = "#000";

// SignUpA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
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
    color: Colors.primaryText
  },
  footerLink: {
    fontWeight: "400",
    textDecorationLine: "underline"
  }
});

// SignUpA
export default class SignUpA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      firstnameFocused: false,
      lastname: "",
      lastnameFocused: false,
      email: "",
      emailFocused: false,
      phone: "",
      phoneFocused: false,
      password: "",
      passwordFocused: false,
      secureTextEntry: true
    };
  }

  firstnameChange = text => {
    this.setState({
      firstname: text
    });
  };

  firstnameFocus = () => {
    this.setState({
      firstnameFocused: true,
      lastnameFocused: false,
      emailFocused: false,
      phoneFocused: false,
      passwordFocused: false
    });
  };

  lastnameChange = text => {
    this.setState({
      lastname: text
    });
  };

  lastnameFocus = () => {
    this.setState({
      firstnameFocused: false,
      lastnameFocused: true,
      emailFocused: false,
      phoneFocused: false,
      passwordFocused: false
    });
  };

  emailChange = text => {
    this.setState({
      email: text
    });
  };

  emailFocus = () => {
    this.setState({
      firstnameFocused: false,
      lastnameFocused: false,
      emailFocused: true,
      phoneFocused: false,
      passwordFocused: false
    });
  };

  phoneChange = text => {
    this.setState({
      phone: text
    });
  };

  phoneFocus = () => {
    this.setState({
      firstnameFocused: false,
      lastnameFocused: false,
      phoneFocused: true,
      emailFocused: false,
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
      firstnameFocused: false,
      lastnameFocused: false,
      passwordFocused: true,
      emailFocused: false,
      phoneFocused: false
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
    const { email, phone, password } = this.state;
    this.setState(
      {
        firstnameFocused: false,
        lastnameFocused: false,
        emailFocused: false,
        phoneFocused: false,
        passwordFocused: false
      }
    );

  };

  myRegister = () => {
    //const {firstname, lastname, email, phone, password} = this.state;

    const api_url = SyncStorage.get('API_URL');

    fetch(api_url + "/api/user/register", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password
      }),
    }
    )
    .then((response) => response.json())
    .then((json) => {
      var tokenN = json.bearerToken;

      fetch(api_url + "/api/user/current", {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenN
        },
      }
      )
      .then((response) => response.json())
      .then((json) => {
        
        var user_idl = json.id;
        fetch(api_url + "/api/cooker", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenN
          },
          body: JSON.stringify({
            user_id: user_idl
          }),
        }
        )
        .then((response) => response.json())
        .then((json) => {
          var c_id = json.id;
          
          /*fetch(api_url + "/api/user/" + json.user_id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + tokenN
            },
            body: JSON.stringify({
              cooker_id: json.id
            }),
          }
          )*/
          fetch(api_url + "/api/user/" + json.user_id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + tokenN
            },
            body: JSON.stringify({
              cooker_id: json.id
            }),
          }
          )
          .then((response) => response.json())
        .then((json) => {
          
          
        })

        })
      })
      if (json.hasOwnProperty("bearerToken")) {
        ToastAndroid.showWithGravity(
          "Inscription réussite, veuillez vous connectez",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        this.props.navigation.goBack(null);
      }
      else {
      ToastAndroid.showWithGravity(
        JSON.stringify(json),
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      }
    })
    .catch((error) => {
      console.error(error);
    });    

  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  render() {
    const {
      firstnameFocused,
      lastnameFocused,
      emailFocused,
      phoneFocused,
      password,
      passwordFocused,
      secureTextEntry
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View style={styles.content}>
            <View />

            <View style={styles.form}>
            <UnderlineTextInput
                onRef={r => {
                  this.firstname = r;
                }}
                onChangeText={this.firstnameChange}
                onFocus={this.firstnameFocus}
                inputFocused={firstnameFocused}
                onSubmitEditing={this.focusOn(this.firstname)}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Prénom"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

              <UnderlineTextInput
                onRef={r => {
                  this.lastname = r;
                }}
                onChangeText={this.lastnameChange}
                onFocus={this.lastnameFocus}
                inputFocused={lastnameFocused}
                onSubmitEditing={this.focusOn(this.lastname)}
                returnKeyType="next"
                blurOnSubmit={false}
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
                onSubmitEditing={this.focusOn(this.phone)}
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

              <UnderlineTextInput
                onRef={r => {
                  this.phone = r;
                }}
                onChangeText={this.phoneChange}
                onFocus={this.phoneFocus}
                inputFocused={phoneFocused}
                onSubmitEditing={this.focusOn(this.password)}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="phone-pad"
                placeholder="Numéro de téléphone"
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
                onSubmitEditing={this.createAccount}
                returnKeyType="done"
                placeholder="Mot de passe"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                secureTextEntry={secureTextEntry}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                toggleVisible={password.length > 0}
                toggleText={secureTextEntry ? "Show" : "Hide"}
                onTogglePress={this.onTogglePress}
              />

              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.myRegister()}
                  title={"Créer mon compte".toUpperCase()}
                />
              </View>

              
            </View>

            <TouchableWithoutFeedback onPress={this.navigateTo("TermsConditions")}>
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                 En vous inscrivant, vous acceptez nos
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
    );
  }
}
