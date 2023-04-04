import React, { Component, Fragment } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { FontAwesome as FAIcon } from "@expo/vector-icons";
import Color from "color";
import axios from 'axios';

import { createStackNavigator } from 'react-navigation-stack';

// import components
import BottomSheet from "../../components/bottomsheet/BottomSheet";
import Button from "../../components/buttons/Button";
import GradientContainer from "../../components/gradientcontainer/GradientContainer";
import HeaderIconButton from "../../components/navigation/HeaderIconButton";
import Icon from "../../components/icon/Icon";
import { Caption, Heading6, Subtitle1 } from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

// PaymentMethodA Config
const IOS = Platform.OS === "ios";
const saveIcon = IOS ? "ios-checkmark" : "md-checkmark";
const visaIcon = "cc-visa";
const discoverIcon = "cc-discover";
const moreIcon = IOS ? "ios-more" : "md-more";
const editIcon = IOS ? "ios-create" : "md-create";
const savePaymentIcon = IOS ? "ios-save" : "md-save";
const removeIcon = IOS ? "ios-remove-circle" : "md-remove-circle";
const BOTTOM_SHEET_PB = IOS ? 16 : 0;

// PaymentMethodA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainerStyle: {
    paddingVertical: 8
  },
  cardContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
    height: 228
  },
  creditCard: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8
  },
  cardNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    maxWidth: 286
  },
  editButtonContainer: {
    borderRadius: 16,
    backgroundColor: Colors.white
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32
  },
  whiteText: {
    color: Colors.white
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  caption: {
    color: Color(Colors.white).alpha(0.8)
  },
  buttonContainer: {
    padding: 16
  },
  bottomSheetItem: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    height: 64
  },
  bottomSheetCaption: { paddingVertical: 2 },
  bottomSheetAction: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
    height: 56
  },
  bottomSheetIconContainer: {
    marginRight: 32,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  }
});

// PaymentMethodA
export default class PaymentMethodA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last4: "",
      f_name: "",
      l_name: "",
      expi_month: "",
      expi_year: ""
    };
    this.getCardInfos();
  }

  // react navigatin header options
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <HeaderIconButton
        onPress={() => navigation.goBack()}
        name={saveIcon}
        color={Colors.onPrimaryColor}
      />
    )
  });

  _onRefresh() {
    this.getCardInfos();
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen, {
      onGoBack: () => this._onRefresh(),
    });
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  getCardInfos = () => {
    let user_id = global.userInfos["id"];
        let first_name = global.userInfos["fname"];
        let last_name = global.userInfos["lname"];
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
            let last4 = response.data[count]["rib"].substr(12);
            let f_name = first_name;
            let l_name = last_name;
            let expi_month = response.data[count]["expiration_date"].substr(5, 2);
            let expi_year = response.data[count]["expiration_date"].substr(0, 4);
            this.setState({
              last4: last4,
              f_name: f_name,
              l_name: l_name,
              expi_month: expi_month,
              expi_year: expi_year
            });
          }).catch(function(error) {
            alert("Erreur");
            throw error;
          });

  };

  openEditShet = () => {
    this.editSheet.open();
  };

  render() {
    const { last4, f_name, l_name, expi_month, expi_year } = this.state;
    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.cardContainer}>
              <GradientContainer
                colors={["#784BA0", "#2B86C5"]}
                containerStyle={styles.creditCard}
              >
                <View style={styles.cardInfo}>
                  
                  <View style={styles.editButtonContainer}>
                  </View>
                </View>

                <View style={styles.cardNumberContainer}>
                  <Heading6 style={styles.whiteText}>XXXX</Heading6>
                  <Heading6 style={styles.whiteText}>XXXX</Heading6>
                  <Heading6 style={styles.whiteText}>XXXX</Heading6>
                  <Heading6 style={styles.whiteText}>{last4}</Heading6>
                </View>

                <View style={styles.cardInfo}>
                  <View>
                    <Caption style={styles.caption}>Nom du propriétaire</Caption>
                    <Heading6 style={styles.whiteText}>{f_name} {l_name}</Heading6>
                  </View>
                  <View>
                    <Caption style={styles.caption}>Expiration</Caption>
                    <Heading6 style={styles.whiteText}>{expi_month}/{expi_year}</Heading6>
                  </View>
                </View>
              </GradientContainer>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              title={"Modifier ma carte".toUpperCase()}
              height={48}
              rounded
              color={Colors.accentColor}
              onPress={this.navigateTo("EditPaymentMethod")}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}
