import React, { Component, Fragment } from "react";
import { Platform, Keyboard, StatusBar, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Color from "color";
import { SafeAreaView } from "react-navigation";

// import components
import ActivityIndicatorModal from "../../components/modals/ActivityIndicatorModal";
import Button from "../../components/buttons/Button";
import { Caption, Paragraph } from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";
import UnderlineTextInput from "../../components/textinputs/UnderlineTextInput";
import { Subtitle2 } from "../../components/text/CustomText";

// import colors
import Colors from "../../theme/colors";
import Layout from "../../theme/layout";
import axios from 'axios';

// EditPaymentMethod Config
const PLACEHOLDER_TEXT_COLOR = "rgba(0, 0, 0, 0.4)";
const INPUT_TEXT_COLOR = "rgba(0, 0, 0, 0.87)";
const INPUT_BORDER_COLOR = "rgba(0, 0, 0, 0.2)";
const AVATAR_SIZE = 100;
const INPUT_FOCUSED_BORDER_COLOR = "#000";
const BUTTON_BORDER_RADIUS = 4;

// EditPaymentMethod Styles
const styles = StyleSheet.create({
    topArea: { flex: 0, backgroundColor: Colors.primaryColor },
    container: {
      flex: 1,
      backgroundColor: Colors.background
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'space-between',
      ...Platform.select({
        android: {
          minHeight: Layout.SCREEN_HEIGHT - 80 // 80 = Button.height 48 + padding 2*16
        }
      })
    },
    avatarSection: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20
    },
    avatarBg: {
      position: "absolute",
      top: 0,
      width: "100%",
      height: AVATAR_SIZE / 2 + 32,
      backgroundColor: Colors.primaryColor
    },
    whiteCircle: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
      width: AVATAR_SIZE + 6,
      height: AVATAR_SIZE + 6,
      borderRadius: (AVATAR_SIZE + 6) / 2,
      backgroundColor: Colors.white
    },
    linkButton: {
      padding: 2,
      color: Colors.accentColor
    },
    editForm: {
      paddingHorizontal: 20
    },
    overline: {
      color: Color(Colors.secondaryText).alpha(0.6)
    },
    inputContainerStyle: {
      marginTop: 0,
      marginBottom: 17,
      paddingVertical: 0,
      paddingHorizontal: 0
    },
    buttonContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16
    }
});

// EditPaymentMethod
export default class EditPaymentMethodB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: "",
      numberFocused: false,
      iban: "",
      ibanFocused: false,
      bic: "",
      bicFocused: false,
      expiration: "",
      expirationFocused: false,
      crypto: "",
      cryptoFocused: false
    };

    this.getCard();
  }

  numberChange = text => {
    this.setState({
      number: text
    });
  };

  ibanChange = text => {
    this.setState({
      iban: text
    });
  };

  bicChange = text => {
    this.setState({
      bic: text
    });
  };

  cryptoChange = text => {
    this.setState({
      crypto: text
    });
  };

  expirationChange = text => {
    this.setState({
      expiration: text
    });
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.state.params.onGoBack();
    navigation.goBack();
  };

  onChangeText = key => (text) => {
    this.setState({
      [key]: text
    });
  };

  onFocus = key => () => {
    let focusedInputs = {
      numberFocused: false,
      ibanFocused: false,
      bicFocused: false,
      expirationFocused: false,
      cryptoFocused: false
    };
    focusedInputs[key] = true;

    this.setState({
      ...focusedInputs
    });
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  getCard = () => {
    axios.get(global.api + '/user/current/' + global.userInfos["email"], {
        headers: {
          'Authorization': `Bearer ${global.token}`
        }}).then((response) => {
          let user_id = response.data["id"];
          axios.get(global.api + '/user_bank_details', {
            headers: {
              'Authorization': `Bearer ${global.token}`
            }}).then((response) => {
              let count = -1;
              for (var a = 0; response.data[a]; a++) {
                if (response.data[a]["user_id"] == user_id) {
                  count = a;
                }
              }
              let card = response.data[count]["rib"];
              let expi_month = response.data[count]["expiration_date"].substr(5, 2);
              let expi_year = response.data[count]["expiration_date"].substr(0, 4);
              let cryptogram = response.data[count]["cryptogram"];
              let iban = response.data[count]["iban"];
              let bic = response.data[count]["bic"];
              this.setState({
                number: card,
                iban: iban,
                bic: bic,
                expiration: expi_month + "/" + expi_year,
                crypto: cryptogram
              });
            }).catch(function(error) {
              alert("Erreur");
              throw error;
            });
        }).catch(function(error) {
          alert("Erreur");
          throw error;
      });
  };

  saveCard = () => {

    /*axios.get(global.api + '/user/current/' + global.userInfos["email"], {
        headers: {
          'Authorization': `Bearer ${global.token}`
        }}).then((response) => {
          let user_id = response.data["id"];
          axios.get(global.api + '/user_bank_details', {
            headers: {
              'Authorization': `Bearer ${global.token}`
            }}).then((response) => {
              let count = -1;
              for (var a = 0; response.data[a]; a++) {
                if (response.data[a]["user_id"] == user_id) {
                  count = a;
                }
              }
              let id_bank = response.data[count]["id"];

              let card = this.state.number;
              let expi_month = this.state.expiration.substr(0, 2);
              let expi_year = this.state.expiration.substr(3);
              let cryptogram = this.state.crypto;
              let iban = this.state.iban;
              let bic = this.state.bic;

              let body = {
                  rib: card,
                  iban: iban,
                  bic: bic,
                  expiration_date: expi_year + "-" + expi_month + "-01",
                  cryptogram: cryptogram
              };

              axios.put(global.api + '/user_bank_details/' + id_bank, body, {
                headers: {
                  'Authorization': `Bearer ${global.token}`
                }}).then((response) => {
                    alert("Modifications sauvegardées");
                    this.goBack();
                }).catch(function(error) {
                    alert("Erreur");
                    throw error;
                });
            }).catch(function(error) {
              alert("Erreur");
              throw error;
            });
        }).catch(function(error) {
          alert("Erreur");
          throw error;
      });*/

      let user_id = global.userInfos["id"];
          axios.get(global.api + '/user_bank_details', {
            headers: {
              'Authorization': `Bearer ${global.token}`
            }}).then((response) => {
              let count = -1;
              for (var a = 0; response.data[a]; a++) {
                if (response.data[a]["user_id"] == user_id) {
                  count = a;
                }
              }
              let id_bank = response.data[count]["id"];

              let card = this.state.number;
              let expi_month = this.state.expiration.substr(0, 2);
              let expi_year = this.state.expiration.substr(3);
              let cryptogram = this.state.crypto;
              let iban = this.state.iban;
              let bic = this.state.bic;

              let body = {
                  rib: card,
                  iban: iban,
                  bic: bic,
                  expiration_date: expi_year + "-" + expi_month + "-01",
                  cryptogram: cryptogram
              };

              axios.put(global.api + '/user_bank_details/' + id_bank, body, {
                headers: {
                  'Authorization': `Bearer ${global.token}`
                }}).then((response) => {
                    alert("Modifications sauvegardées");
                    this.goBack();
                }).catch(function(error) {
                    alert("Erreur");
                    throw error;
                });
            }).catch(function(error) {
              alert("Erreur");
              throw error;
            });

  };

  render() {
    const { number, numberFocused, iban, ibanFocused, bic, bicFocused, expiration, expirationFocused, crypto, cryptoFocused } = this.state;

    return (
        <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <KeyboardAwareScrollView alwaysBounceVertical={false} contentContainerStyle={styles.infoContainer}>
            <View>
              <View style={styles.avatarSection}>
                <View style={styles.whiteCircle}>
                </View>

              </View>

              <View style={styles.editForm}>

              <Subtitle2 style={styles.overline}>Numéro de carte</Subtitle2>
                <UnderlineTextInput
                  onRef={r => {
                    this.number = r;
                  }}
                  onChangeText={this.numberChange}
                  value={number}
                  onFocus={this.numberFocus}
                  inputFocused={numberFocused}
                  onSubmitEditing={this.focusOn(this.expiration)}
                  returnKeyType="next"
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />

                <Subtitle2 style={styles.overline}>Expiration</Subtitle2>
                <UnderlineTextInput
                  onRef={r => {
                    this.expiration = r;
                  }}
                  onChangeText={this.expirationChange}
                  value={expiration}
                  onFocus={this.expirationFocus}
                  inputFocused={expirationFocused}
                  returnKeyType="next"
                  onSubmitEditing={this.focusOn(this.crypto)}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />

                <Subtitle2 style={styles.overline}>Cryptogramme</Subtitle2>
                <UnderlineTextInput
                  onRef={r => {
                    this.crypto = r;
                  }}
                  onChangeText={this.cryptoChange}
                  value={crypto}
                  onChangeText={this.cryptoChange}
                  onFocus={this.cryptoFocus}
                  inputFocused={cryptoFocused}
                  returnKeyType="next"
                  onSubmitEditing={this.focusOn(this.iban)}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />

                <Subtitle2 style={styles.overline}>Iban</Subtitle2>
                <UnderlineTextInput
                  onRef={r => {
                    this.iban = r;
                  }}
                  value={iban}
                  onChangeText={this.ibanChange}
                  onFocus={this.ibanFocus}
                  inputFocused={ibanFocused}
                  onSubmitEditing={this.focusOn(this.bic)}
                  returnKeyType="next"
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />

                <Subtitle2 style={styles.overline}>Bic</Subtitle2>
                <UnderlineTextInput
                  onRef={r => {
                    this.iban = r;
                  }}
                  value={bic}
                  onChangeText={this.bicChange}
                  onFocus={this.bicFocus}
                  inputFocused={bicFocused}
                  onSubmitEditing={this.focusOn(this.expiration)}
                  returnKeyType="next"
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />

            </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                onPress={this.saveCard}
                title={"Sauvegarder".toUpperCase()}
                height={48}
                rounded
              />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}
