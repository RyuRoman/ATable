import React, { Component, Fragment } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, ToastAndroid } from "react-native";
import Color from "color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
 
// import components
import Avatar from "../../components/avatar/Avatar";
import Button from "../../components/buttons/Button";
import { Subtitle2 } from "../../components/text/CustomText";
import LinkButton from "../../components/buttons/LinkButton";
import UnderlineTextInput from "../../components/textinputs/UnderlineTextInput";
 
// import colors, layout
import Colors from "../../theme/colors";
import Layout from "../../theme/layout";

import SyncStorage from 'sync-storage';

 
// EditProfileA Config
const AVATAR_SIZE = 100;
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;
 
// EditProfileA Styles
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
 
// EditProfileA
export default class EditProfileA extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      first_name: "Non renseigné",
      first_nameFocused: false,
      name: "Non renseigné",
      nameFocused: false,
      email: "Non renseigné",
      emailFocused: false,
      phone: "Non renseigné",
      phoneFocused: false,
      myid: 1
    };
    const api_url = SyncStorage.get('API_URL');
    const token = SyncStorage.get('token');

    fetch(api_url + "/api/user/current", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }
    )
    .then((response) => response.json())
    .then((json) => {
      this.setState ({
        first_name: json.first_name,
        first_nameFocused: false,
        name: json.last_name,
        nameFocused: false,
        email: json.email,
        emailFocused: false,
        phone: json.phone,
        phoneFocused: false,
        myid: json.id
      });
    })
    /*axios.get(api_url + '/user/current/' + global.userInfos["email"], {
      headers: {
        'Authorization': `Bearer ${tokeN}`
      }}).then((response) => {
        if (response.status == 200) {
          if (response.data["phone"] == null) {
            response.data["phone"] = "Non renseigné";
          }
 
          this.setState ({
            first_name: response.data["first_name"],
            first_nameFocused: false,
            name: response.data["last_name"],
            nameFocused: false,
            email: response.data["email"],
            emailFocused: false,
            phone: response.data["phone"],
            phoneFocused: false
          });
       }}).catch(function(error) {
        alert("error");
        throw error;
      });*/
  }
 
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };
 
  first_nameChange = text => {
    this.setState({
      first_name: text
    });
  };
 
  first_nameFocus = () => {
    this.setState({
      first_nameFocused: true,
      nameFocused: false,
      emailFocused: false,
      phoneFocused: false
    });
  };
 
  nameChange = text => {
    this.setState({
      name: text
    });
  };
 
  nameFocus = () => {
    this.setState({
      first_nameFocused: false,
      nameFocused: true,
      emailFocused: false,
      phoneFocused: false
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
      nameFocused: false,
      emailFocused: true,
      phoneFocused: false
    });
  };
 
  phoneChange = text => {
    this.setState({
      phone: text
    });
  };
 
  phoneFocus = () => {
    this.setState({
      first_nameFocused: false,
      nameFocused: false,
      emailFocused: false,
      phoneFocused: true
    });
  };
 
  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };
 
  saveProfile = () => {
 
      /*let id_user = this.state.myid;
      let bodyJSON = {
        first_name: this.state.first_name,
        last_name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
      };
      axios.put(global.api + '/user/' + id_user, bodyJSON, {
        headers: {
          'Authorization': `Bearer ${global.token}`
        }}).then((response) => {
          if (response.status == 200) {
            alert("Informations mises à jour");
        }}).catch(function(error) {
          alert("error");
          throw error;
        });*/
       
        const api_url = SyncStorage.get('API_URL');
    const token = SyncStorage.get('token');
        fetch(api_url + "/api/user/" + this.state.myid, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            first_name: this.state.first_name,
            last_name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
          }),
        }
        )
        .then((response) => response.json())
      .then((json) => {

        
      })
 
    this.goBack();
  };
 
  render() {
    const {
      first_name,
      first_nameFocused,
      name,
      nameFocused,
      email,
      emailFocused,
      phone,
      phoneFocused
    } = this.state;
 
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
 
              <Subtitle2 style={styles.overline}>Prénom</Subtitle2>
                <UnderlineTextInput
                  onRef={r => {
                    this.first_name = r;
                  }}
                  value={first_name}
                  onChangeText={this.first_nameChange}
                  onFocus={this.first_nameFocus}
                  inputFocused={first_nameFocused}
                  onSubmitEditing={this.focusOn(this.name)}
                  returnKeyType="next"
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />
 
                <Subtitle2 style={styles.overline}>Nom</Subtitle2>
                <UnderlineTextInput
                  onRef={r => {
                    this.name = r;
                  }}
                  value={name}
                  onChangeText={this.nameChange}
                  onFocus={this.nameFocus}
                  inputFocused={nameFocused}
                  onSubmitEditing={this.focusOn(this.email)}
                  returnKeyType="next"
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />
 
                <Subtitle2 style={styles.overline}>Adresse email</Subtitle2>
                <UnderlineTextInput
                  onRef={r => {
                    this.email = r;
                  }}
                  value={email}
                  onChangeText={this.emailChange}
                  onFocus={this.emailFocus}
                  inputFocused={emailFocused}
                  onSubmitEditing={this.focusOn(this.phone)}
                  returnKeyType="next"
                  keyboardType="email-address"
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />
 
                <Subtitle2 style={styles.overline}>Numéro de téléphone</Subtitle2>
                <UnderlineTextInput
                  onRef={r => {
                    this.phone = r;
                  }}
                  value={phone}
                  returnKeyType="done"
                  keyboardType="phone-pad"
                  onChangeText={this.phoneChange}
                  onFocus={this.phoneFocus}
                  inputFocused={phoneFocused}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View>
            </View>
 
            <View style={styles.buttonContainer}>
              <Button
              
                onPress={() => this.saveProfile()}
                title={"Sauvegarder les modifications".toUpperCase()}
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