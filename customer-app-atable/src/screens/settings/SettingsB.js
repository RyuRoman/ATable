import React, { Component } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  RefreshControl,
  View,
  DrawerLayoutAndroidComponent
} from "react-native";
import { SafeAreaView } from "react-navigation";

import axios from 'axios'

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

const notificationsIcon = "notifications";
const notificationsOffIcon = "notifications-off";

const addressIcon = IOS ? "ios-pin" : "md-pin";
const paymentIcon = IOS ? "ios-card" : "md-card";
const ordersIcon = IOS ? "ios-list" : "md-list";

const aboutIcon = IOS ? "ios-finger-print" : "md-finger-print";
const updateIcon = IOS ? "ios-cloud-download" : "md-cloud-download";
const privacyIcon = IOS
  ? "ios-information-circle-outline"
  : "md-information-circle-outline";
const termsIcon = IOS ? "ios-paper" : "md-paper";

const addIcon = IOS ? "ios-add-circle-outline" : "md-add-circle-outline";
const logoutIcon = IOS ? "ios-exit" : "md-exit";

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
    paddingBottom: 16,
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
  name: {
    fontWeight: "500"
  },
  email: {
    paddingVertical: 2
  },
  sectionHeader: {
    paddingTop: 16,
    paddingHorizontal: 16
  },
  setting: {
    height: 48
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    width: 24,
    height: 24
  }
});

// SectionHeader Props
type SectionHeadreProps = {
  title: string
};

// Setting Props
type SettingProps = {
  icon: string,
  setting: string,
  type: string,
  onPress: () => {}
};

// SettingsB Components
const SectionHeader = ({ title }: SectionHeadreProps) => (
  <View style={styles.sectionHeader}>
    <Subtitle1>{title}</Subtitle1>
  </View>
);

const Setting = ({ onPress, icon, setting, type }: SettingProps) => (
  <TouchableItem onPress={onPress}>
    <View style={[styles.row, styles.setting]}>
      <View style={styles.leftSide}>
        {icon !== undefined && (
          <View style={styles.iconContainer}>
            <Icon
              name={icon}
              size={20}
              color={
                type === "logout" ? Colors.secondaryColor : Colors.primaryColor
              }
            />
          </View>
        )}
        <Subtitle2
          style={type === "logout" && { color: Colors.secondaryColor }}
        >
          {setting}
        </Subtitle2>
      </View>

      {type !== "logout" && (
        <Icon name="ios-arrow-forward" size={16} color="rgba(0, 0, 0, 0.16)" />
      )}
    </View>
  </TouchableItem>
);

// SetingsB
export default class SettingsB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsOn: true,
      first_name: "",
      last_name: "",
      email: "",
      refreshing: false
    };
    this.myRequest();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.setState({refreshing: false});
    this.myRequest();
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
      navigation.navigate(screen);
  };

  myRequest = () => {
      this.state.first_name = global.userInfos['fname'];
      this.state.last_name = global.userInfos['lname'];
      this.state.email = global.userInfos['email'];
  };

  toggleNotifications = value => {
    this.setState({
      notificationsOn: value
    });
  };

  myLogOut = () => {
    let body = {
      bearerToken: global.token
    };
    axios.post(global.api + '/user/logout', body, {
      headers: {
        'Authorization': `Bearer ${global.token}`
      }})
    .then((response) => {
      if (response.status == 200) {
        this.props.navigation.navigate('Welcome');
      }
    }).catch(function(error) {
      alert("error");
      throw error;
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
    const { notificationsOn, first_name, last_name, email } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>Paramètres</Heading6>
          </View>

          <TouchableItem useForeground onPress={this.navigateTo("EditProfile")}>
            <View style={[styles.row, styles.profileContainer]}>
              <View style={styles.leftSide}>
                <Avatar
                  imageUri={require("../../../assets/Screenshot_2.png")}
                  size={60}
                  rounded
                />
                <View style={styles.profileInfo}>
                  <Subtitle1 style={styles.name}>{first_name} {last_name}</Subtitle1>
                  <Subtitle2 style={styles.email}>
                    {email}
                  </Subtitle2>
                </View>
              </View>
            </View>
          </TouchableItem>

          <Divider />

          <View style={[styles.row, styles.setting]}>
            <View style={styles.leftSide}>
              <View style={styles.iconContainer}>
              </View>
            </View>

          </View>

          <SectionHeader title="Adresse" />
          <Setting
            onPress={this.navigateTo("DeliveryAddress")}
            icon={addressIcon}
            setting="Modifier votre adresse"
          />

          <SectionHeader title="Mes commandes" />
          <Setting
            onPress={this.navigateTo("Orders")}
            icon={ordersIcon}
            setting="Historique"
          />

          <SectionHeader title="A propos" />
          <Setting
            onPress={this.navigateTo("AboutUs")}
            icon={aboutIcon}
            setting="Qui sommes-nous"
          />

          {/* <Setting icon={privacyIcon} setting="Privacy Policy" /> */}
          <Setting
            onPress={this.navigateTo("TermsConditions")}
            icon={termsIcon}
            setting="Termes et conditions"
          />

          <SectionHeader title="Connexion" />
          <Setting
            onPress={this.logout}
            icon={logoutIcon}
            setting="Se déconnecter"
            type="logout"
          />
        </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
