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

import { Heading6 } from "../../components/text/CustomText";

import SyncStorage from 'sync-storage';
import DatePicker from 'react-native-datepicker'

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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  titleText: {
    fontWeight: "700"
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
      date: "",
      time: "",

      dishname: "",
      dishnameFocused: false,

      dishdescripiton: "o",
      dishdescriptionFocused: false,
      
      dishprice: "",
      dishpriceFocused: false,
      
      dishquantity: "",
      dishquantityFocused: false,

      dishexpirationdate: "",
      dishexpirationdateFocused: false,

      dishpreparationtime: "",
      dishpreparationtimeFocused: false,

      secureTextEntry: true
    };
  }

  dishnameChange = text => {
    this.setState({
      dishname: text
    });
  };

  dishnameFocus = () => {
    this.setState({
      dishnameFocused: true,
      dishdescriptionFocused: false,
      dishpriceFocused: false,
      dishquantityFocused: false,
      dishexpirationdateFocused: false,
      dishpreparationtime: false
    });
  };


  dishdescriptionChange = text => {
    this.setState({
      dishdescripiton: text
    });
  };

  dishdescriptionFocus = () => {
    this.setState({
      dishnameFocused: false,
      dishdescriptionFocused: true,
      dishpriceFocused: false,
      dishquantityFocused: false,
      dishexpirationdateFocused: false,
      dishpreparationtime: false
    });
  };

  dishpriceChange = text => {
    this.setState({
      dishprice: text
    });
  };

  dishpriceFocus = () => {
    this.setState({
      dishnameFocused: false,
      dishdescriptionFocused: false,
      dishpriceFocused: true,
      dishquantityFocused: false,
      dishexpirationdateFocused: false,
      dishpreparationtime: false
    });
  };

  dishquantityChange = text => {
    this.setState({
      dishquantity: text
    });
  };

  dishquantityFocus = () => {
    this.setState({
      dishnameFocused: false,
      dishdescriptionFocused: false,
      dishpriceFocused: false,
      dishquantityFocused: true,
      dishexpirationdateFocused: false,
      dishpreparationtime: false
    });
  };

  dishexpirationdateChange = text => {
    this.setState({
      dishexpirationdate: text
    });
  };

  dishdescriptionFocus = () => {
    this.setState({
      dishnameFocused: false,
      dishdescriptionFocused: false,
      dishpriceFocused: false,
      dishquantityFocused: false,
      dishexpirationdateFocused: true,
      dishpreparationtime: false
    });
  };

  dishpreparationtimeChange = text => {
    this.setState({
      dishpreparationtime: text
    });
  };

  dishpreparationtimeFocus = () => {
    this.setState({
      dishnameFocused: false,
      dishdescriptionFocused: false,
      dishpriceFocused: false,
      dishquantityFocused: false,
      dishexpirationdateFocused: false,
      dishpreparationtime: true
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

  createDish = () => {
     const { dishname, dishdescription } = this.state;
    
  };

  myCreateDish = () => {
    const {dishname, dishdescripiton, dishprice, dishquantity, dishpreparationtime} = this.state;

    var dishexpirationdate = this.state.date + " " + this.state.time;

    /*ToastAndroid.showWithGravity(
      dishname + dishdescripiton + dishprice + dishquantity + dishexpirationdate + dishpreparationtime,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );*/

    const api_url = SyncStorage.get('API_URL');
    const tokeN = SyncStorage.get('token');
    const cookerID = SyncStorage.get('cooker_id');

    fetch(api_url + "/api/dish", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokeN
      },
      body: JSON.stringify({
        name: dishname,
        description: dishdescripiton,
        price: dishprice,
        quantity: dishquantity,
        expiration_date: dishexpirationdate,
        cooker_id: cookerID,
        dish_category_id: 3,
        preparation_time: dishpreparationtime,
      }),
    }
    )
    .then((response) => response.json())
    .then((json) => {
      
      /*ToastAndroid.showWithGravity(
        JSON.stringify(json),
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );*/

      ToastAndroid.showWithGravity(
        JSON.stringify(json),
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      
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
// CartA Styles


  render() {
    

    const {
      disnname,
      dishnameFocused,
      dishdescription,
      dishdescriptionFocused,
      dishprice,
      dishpriceFocused,
      dishquantity,
      dishquantityFocused,
      dishexpirationdate,
      dishexpirationdateFocused,
      dishpreparationtime,
      dishpreparationtimeFocused,
      secureTextEntry
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Créer un plat</Heading6>
        </View>

        <View style={styles.container}>
          <View style={styles.form}>
              <UnderlineTextInput
                onRef={r => {
                  this.dishname = r;
                }}
                onChangeText={this.dishnameChange}
                onFocus={this.dishnameFocus}
                inputFocused={dishnameFocused}
                onSubmitEditing={this.focusOn(this.dishname)}
                returnKeyType="next"
                blurOnSubmit={false}
                //keyboardType="email-address"
                placeholder="Nom du plat"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

                <UnderlineTextInput
                onRef={r => {
                  this.dishdescription = r;
                }}
                onChangeText={this.dishdescriptionChange}
                inputFocused={dishdescriptionFocused}
                onSubmitEditing={this.focusOn(this.dishdescription)}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Description"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

                <UnderlineTextInput
                onRef={r => {
                  this.dishprice = r;
                }}
                onChangeText={this.dishpriceChange}
                inputFocused={dishpriceFocused}
                onSubmitEditing={this.focusOn(this.dishprice)}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Prix"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

                <UnderlineTextInput
                onRef={r => {
                  this.dishquantity = r;
                }}
                onChangeText={this.dishquantityChange}
                inputFocused={dishquantityFocused}
                onSubmitEditing={this.focusOn(this.dishquantity)}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Quantité"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

<UnderlineTextInput
                onRef={r => {
                  this.dishpreparationtime = r;
                }}
                onChangeText={this.dishpreparationtimeChange}
                inputFocused={dishpreparationtimeFocused}
                onSubmitEditing={this.focusOn(this.dishpreparationtime)}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Temps de préparation"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

<DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="Date d'expiration"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2030-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      <DatePicker
        style={{width: 200}}
        date={this.state.time}
        mode="time"
        placeholder="Heure d'expiration"
        format="HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(time) => {this.setState({time: time})}}
      />

              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.myCreateDish()}
                  title={"Créer mon plat !".toUpperCase()}
                />
              </View>

              
            </View>
        </View>
       
      </SafeAreaView>
    );
  }
}
