/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  View,
  ToastAndroid
} from "react-native";
import { SafeAreaView } from "react-navigation";

import SyncStorage from 'sync-storage';

// import components
import Avatar from "../../components/avatar/Avatar";
import Divider from "../../components/divider/Divider";
import Icon from "../../components/icon/Icon";
import {
  Heading6,
  Subtitle1,
  Subtitle2
} from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

// SettingsB Config
const IOS = Platform.OS === "ios";
const DIVIDER_MARGIN_LEFT = 60;
const arrowIcon = "ios-arrow-forward";
const addressIcon = IOS ? "ios-pin" : "md-pin";
const notificationsOffIcon = IOS
  ? "ios-notifications-off"
  : "md-notifications-off";
const notificationsIcon = IOS ? "ios-notifications" : "md-notifications";
const paymentIcon = IOS ? "ios-card" : "md-card";
const ordersIcon = IOS ? "ios-list" : "md-list";
const termsIcon = IOS ? "ios-paper" : "md-paper";
const aboutIcon = IOS
  ? "ios-information-circle-outline"
  : "md-information-circle-outline";
const logoutIcon = IOS ? "ios-log-out" : "md-log-out";

// SettingsB Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  contentContainerStyle: {
    paddingBottom: 16
  },
  titleContainer: {
    paddingHorizontal: 16
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 24,
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16
  },
  profileContainer: {
    // height: 88
    paddingVertical: 16
  },
  leftSide: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  profileInfo: {
    paddingLeft: 16
  },
  mediumText: {
    fontWeight: "500"
  },
  email: {
    paddingVertical: 2
  },
  setting: {
    height: 56
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    width: 28,
    height: 28
  },
  extraDataContainer: {
    top: -8,
    marginLeft: DIVIDER_MARGIN_LEFT,
    paddingBottom: 8
  },
  logout: { color: Colors.secondaryColor }
});

// SettingsA Props
type Props = {
  icon: string,
  title: String,
  onPress: () => {},
  extraData: React.Node
};

// SettingsB Components
const Setting = ({ icon, title, onPress, extraData }: Props) => (
  <TouchableItem onPress={onPress}>
    <View>
      <View style={[styles.row, styles.setting]}>
        <View style={styles.leftSide}>
          {icon !== undefined && (
            <View style={styles.iconContainer}>
              <Icon name={icon} size={24} color={Colors.primaryColor} />
            </View>
          )}
          <Subtitle1 style={styles.mediumText}>{title}</Subtitle1>
        </View>

        <Icon name={arrowIcon} size={16} color="rgba(0, 0, 0, 0.16)" />
      </View>

      {extraData ? (
        <View style={styles.extraDataContainer}>{extraData}</View>
      ) : (
        <View />
      )}
    </View>
  </TouchableItem>
);

// SetingsB
export default class SettingsA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsOn: true,
      firstname: "Loading...",
      lastname: "Loading...",
      email: "Loading..."
    };

    const api_url = SyncStorage.get('API_URL');
    const tokeN = SyncStorage.get('token');

    fetch(api_url + "/api/user/current", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokeN
      },
    }
    )
    .then((response) => response.json())
    .then((json) => {
      
      /*ToastAndroid.showWithGravity(
        JSON.stringify(json),
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );*/

      this.setState({
        firstname: json.first_name,
        lastname: json.last_name,
        email: json.email,
        isLoading: false
      })
      
    })
    .catch((error) => {
      console.error(error);
    }); 
  }


  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  toggleNotifications = value => {
    this.setState({
      notificationsOn: value
    });
  };

  myLogOut = () => {
    const api_url = SyncStorage.get('API_URL');
    const token = SyncStorage.get('token');
    fetch(api_url + "/api/user/logout", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }
    )
    .then((response) => response.json())
    .then((json) => {
      
      this.props.navigation.navigate('Welcome');
      
    })
    .catch((error) => {
      console.error(error);
    }); 

  };

  logout = () => {
    Alert.alert(
      "Se déconnecter",
      "Etes-vous sûr(e) de vouloir vous déconnecter ?",
      [
        { text: "Annuler", onPress: () => {}, style: "cancel" },
        { text: "Valider", onPress: () => this.myLogOut() }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { notificationsOn } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>Paramètres</Heading6>
          </View>

          <TouchableItem useForeground onPress={this.navigateTo("EditProfile")}>
            <View style={[styles.row, styles.profileContainer]}>
              <View style={styles.leftSide}>
                <Avatar
                  imageUri={require("../../assets/img/profile_1.jpeg")}
                  rounded
                  size={60}
                />
                <View style={styles.profileInfo}>
                  <Subtitle1 style={styles.mediumText}>{this.state.firstname} {this.state.lastname}</Subtitle1>
                  <Subtitle2 style={styles.email}>
                    {this.state.email}
                  </Subtitle2>
                </View>
              </View>
            </View>
          </TouchableItem>

          <Divider />

          <Setting
            //onPress={this.navigateTo("DeliveryAddress")}
            icon={addressIcon}
            title="Mon adresse"
            extraData={
              <View>
                <Subtitle2>123 rue Pasteur</Subtitle2>
                <Subtitle2>94270, le Kremlin Bicêtre</Subtitle2>
              </View>
            }
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <Setting
            onPress={this.navigateTo("PaymentMethod")}
            icon={paymentIcon}
            title="Méthode de paiement"
            extraData={
              <View>
                <Subtitle2>RIB BNP Paribas</Subtitle2>
                <Subtitle2>FR 4937 3849 XXXX XXXX XX</Subtitle2>
              </View>
            }
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <View style={[styles.row, styles.setting]}>
            <View style={styles.leftSide}>
              <View style={styles.iconContainer}>
                {notificationsOn ? (
                  <Icon
                    name={notificationsIcon}
                    size={24}
                    color={Colors.primaryColor}
                  />
                ) : (
                  <Icon
                    name={notificationsOffIcon}
                    size={24}
                    color={Colors.primaryColor}
                  />
                )}
              </View>
              <Subtitle1 style={styles.mediumText}>
                Notifications Push
              </Subtitle1>
            </View>

            <Switch
              value={notificationsOn}
              onValueChange={this.toggleNotifications}
            />
          </View>
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          

          {/* <Setting icon={termsIcon} title="Privacy Policy" />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} /> */}

          <Setting
            onPress={this.navigateTo("TermsConditions")}
            icon={termsIcon}
            title="Termes and Conditions"
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <Setting
            onPress={this.navigateTo("AboutUs")}
            icon={aboutIcon}
            title="À propos"
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <TouchableItem onPress={this.logout}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  <Icon
                    name={logoutIcon}
                    size={24}
                    color={Colors.secondaryColor}
                  />
                </View>
                <Subtitle1 style={[styles.logout, styles.mediumText]}>
                  Déconnexion
                </Subtitle1>
              </View>
            </View>
          </TouchableItem>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
