import React, { Component } from "react";
import { Keyboard, StatusBar, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from "react-navigation";

// import components
import ActivityIndicatorModal from "../../components/modals/ActivityIndicatorModal";
import Button from "../../components/buttons/Button";
import { Caption, Paragraph } from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";
import UnderlineTextInput from "../../components/textinputs/UnderlineTextInput";

// import colors
import Colors from "../../theme/colors";
import axios from 'axios';

// AddAddressB Config
const HOME_ICON = "home-variant-outline";
const OFFICE_ICON = "briefcase-outline";
const APARTMAN_ICON = "office-building";
const ICON_COLOR = "rgb(35, 47, 52)";
const PLACEHOLDER_TEXT_COLOR = "rgba(0, 0, 0, 0.4)";
const INPUT_TEXT_COLOR = "rgba(0, 0, 0, 0.87)";
const INPUT_BORDER_COLOR = "rgba(0, 0, 0, 0.2)";
const INPUT_FOCUSED_BORDER_COLOR = "#000";
const BUTTON_BORDER_RADIUS = 4;

// AddAddressB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24
  },
  instructionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    justifyContent: "center",
    alignItems: "center",
    width: 104
  },
  touchArea: {
    marginHorizontal: 16,
    marginBottom: 6,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(35, 47, 52, 0.12)",
    overflow: "hidden"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
    borderRadius: 22
  },
  instruction: {
    marginTop: 32,
    paddingHorizontal: 40,
    fontSize: 14,
    textAlign: "center"
  },
  form: {
    padding: 16
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  inputContainer: {
    margin: 8
  },
  small: {
    flex: 2
  },
  large: {
    flex: 5
  },
  inputStyle: {
    textAlign: "left"
  },
  buttonContainer: {
    marginTop: 20
  }
});

// AddAddressB
export default class AddAddressB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressType: "home",
      number: "",
      numberFocused: false,
      street: "",
      streetFocused: false,
      zip: "",
      zipFocused: false,
      city: "",
      cityFocused: false,
      modalVisible: false
    };
  }

  componentDidMount = () => {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }

  // avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
    this.keyboardDidHideListener.remove();
  };

  keyboardDidHide = () => {
    this.setState({
      numberFocused: false,
      streetFocused: false,
      zipFocused: false,
      cityFocused: false
    });
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.state.params.onGoBack();
    navigation.goBack();
  };

  setAddressType = type => () => {
    this.setState({
      addressType: type
    });
  }

  onChangeText = key => (text) => {
    this.setState({
      [key]: text
    });
  };

  onFocus = key => () => {
    let focusedInputs = {
      numberFocused: false,
      streetFocused: false,
      zipFocused: false,
      cityFocused: false
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

  saveAddress = () => {
    Keyboard.dismiss();

        if (this.state.number != "" && this.state.street != "" && this.state.zip != "" && this.state.city != "") {

          /*axios.get(global.api + '/user/current/' + global.userInfos["email"], {
            headers: {
              'Authorization': `Bearer ${global.token}`
            }}).then((response) => {
              if (response.status == 200) {
                let body = {
                  street_number: this.state.number,
                  postal_code: this.state.zip,
                  city: this.state.city,
                  street: this.state.street,
                  state: this.state.street,
                  country: "France",
                  user_id: response.data["id"],
                  lat: 0,
                  lng: 0
                };
                axios.post(global.api + '/address', body, {
                  headers: {
                    'Authorization': `Bearer ${global.token}`
                }}).then((response) => {
                  alert("Adresse ajoutée");
                  this.goBack();
                }).catch(function(error) {
                  alert("Erreur");
                  throw error;
                });
            }}).catch(function(error) {
              alert("Erreur");
              throw error;
            });*/

            let body = {
              street_number: this.state.number,
              postal_code: this.state.zip,
              city: this.state.city,
              street: this.state.street,
              state: this.state.street,
              country: "France",
              user_id: global.userInfos["id"],
              lat: 0,
              lng: 0
            };
            axios.post(global.api + '/address', body, {
              headers: {
                'Authorization': `Bearer ${global.token}`
            }}).then((response) => {
              alert("Adresse ajoutée");
              this.goBack();
            }).catch(function(error) {
              alert("Erreur");
              throw error;
            });

        } else {
          alert("Veuillez remplir tous les champs");
        }
  };

  closeModal = () => {
    // for demo purpose clear timeout if user request close modal before 3s timeout
    clearTimeout(this.timeout);
    this.setState({
      modalVisible: false
    }, () => {
      this.goBack();
    });
  };

  render() {
    const { addressType, numberFocused, streetFocused, zipFocused, cityFocused, modalVisible } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.row}>
            

            <View style={styles.picker}>
              <View style={[styles.touchArea, addressType == "home" && { backgroundColor: Colors.primaryColor }]}>
                <TouchableItem onPress={this.setAddressType("home")}>
                  <View style={styles.iconContainer}>
                    <Icon name={HOME_ICON} size={19} color={addressType == "home" ? Colors.onPrimaryColor : ICON_COLOR} />
                  </View>
                </TouchableItem>
              </View>
              <Caption>Maison</Caption>
            </View>

            
          </View>

          <View style={styles.instructionContainer}>
            <Paragraph style={styles.instruction}>
              Entrer les détails suivants
            </Paragraph>
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.small]}>
                <UnderlineTextInput
                  onChangeText={this.onChangeText("number")}
                  onFocus={this.onFocus("numberFocused")}
                  inputFocused={numberFocused}
                  onSubmitEditing={this.focusOn(this.street)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  placeholder="Numéro"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputStyle={styles.inputStyle}
                />
              </View>

              <View style={[styles.inputContainer, styles.large]}>
                <UnderlineTextInput
                  onRef={r => {
                    this.street = r;
                  }}
                  onChangeText={this.onChangeText("street")}
                  onFocus={this.onFocus("streetFocused")}
                  inputFocused={streetFocused}
                  onSubmitEditing={this.focusOn(this.district)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  placeholder="Nom de rue"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputStyle={styles.inputStyle}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.small]}>
                <UnderlineTextInput
                  onRef={r => {
                    this.zip = r;
                  }}
                  onChangeText={this.onChangeText("zip")}
                  onFocus={this.onFocus("zipFocused")}
                  inputFocused={zipFocused}
                  onSubmitEditing={this.focusOn(this.city)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  placeholder="Code ZIP"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputStyle={styles.inputStyle}
                />
              </View>

              <View style={[styles.inputContainer, styles.large]}>
                <UnderlineTextInput
                  onRef={r => {
                    this.city = r;
                  }}
                  onChangeText={this.onChangeText("city")}
                  onFocus={this.onFocus("cityFocused")}
                  inputFocused={cityFocused}
                  onSubmitEditing={this.saveAddress}
                  returnKeyType="done"
                  blurOnSubmit={false}
                  placeholder="Ville"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputStyle={styles.inputStyle}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={this.saveAddress}
              disabled={false}
              borderRadius={BUTTON_BORDER_RADIUS}
              small
              title={"Ajouter".toUpperCase()}
            />
          </View>

          <ActivityIndicatorModal
            statusBarColor={Colors.primaryColorDark}
            message="Veuillez patienter . . ."
            onRequestClose={this.closeModal}
            title="!ajout d'adresse"
            visible={modalVisible}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
