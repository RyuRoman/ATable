import React, { Component, Fragment } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl
} from "react-native";
import ActionButton from "react-native-action-button";

// import components
import Divider from "../../components/divider/Divider";
import HeaderIconButton from "../../components/navigation/HeaderIconButton";
import Icon from "../../components/icon/Icon";
import {
  Caption,
  Subtitle1,
  Subtitle2
} from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";
import axios from 'axios'
import remove from "lodash/remove";

// import colors, fonts
import Colors from "../../theme/colors";

// DeliveryAddressA Config
const IOS = Platform.OS === "ios";
const saveIcon = IOS ? "ios-checkmark" : "md-checkmark";
const radioOffIcon = IOS ? "ios-radio-button-off" : "md-radio-button-off";
const radioOnIcon = IOS ? "ios-radio-button-on" : "md-radio-button-on";
const editIcon = IOS ? "ios-create" : "md-create";
const fabIcon = IOS ? "ios-add" : "md-add";
const homeIcon = IOS ? "ios-home" : "md-home";
const locationIcon = IOS ? "ios-pin" : "md-pin";
const trash = IOS ? "ios-trash" : "md-trash";

// DeliveryAddressB Styles
const styles = StyleSheet.create({
  topArea: { flex: 0, backgroundColor: Colors.primaryColor },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1
  },
  addressList: {
    paddingVertical: 8
  },
  addressCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  active: {
    backgroundColor: "#f7f7f7"
  },
  leftAddresContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  addressInfo: { flex: 1, marginRight: 4 },
  caption: {
    paddingVertical: 2,
    color: Colors.accentColor
  },
  radioIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    width: 24,
    height: 24
  },
  addressText: { paddingVertical: 4 },
  editIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24
  }
});

// DeliveryAddressB Props
type Props = {
  onPress: () => {},
  onPressEdit: () => {},
  type: String,
  street: String,
  district: String,
  city: String,
  zip: String,
  number: String,
  active: String
};

// DeliveryAddressB Components
const Address = ({
  onPress,
  onPressEdit,
  type,
  street,
  district,
  city,
  zip,
  number,
  refreshing,
  active
}: Props) => (
  <TouchableItem onPress={onPress} useForeground>
    <View style={[styles.addressCard, active && styles.active]}>
      <View style={styles.leftAddresContainer}>
        <View style={styles.radioIconContainer}>
          {active ? (
            <Icon name={radioOnIcon} size={21} color={Colors.secondaryColor} />
          ) : (
            <Icon name={radioOffIcon} size={21} color={Colors.secondaryColor} />
          )}
        </View>

        <View style={styles.addressInfo}>
          {type !== "" && (
            <Caption style={styles.caption}>
              {`Adresse`}
            </Caption>
          )}
          <Subtitle1 style={styles.addressText}>
            {`${number} ${street}`}
          </Subtitle1>
          <Subtitle2>{`${city} ${zip}`}</Subtitle2>
        </View>
      </View>

      <View style={{ height: 50 }}>
        <TouchableItem onPress={onPressEdit} borderless>
          <View style={styles.editIconContainer}>
          <Icon name={trash} size={21} color={Colors.secondaryColor} />
          </View>
        </TouchableItem>
      </View>
    </View>
  </TouchableItem>
);

// DeliveryAddressB
export default class DeliveryAddressB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    };

    this.myRequest();

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

  myRequest() {
      let id_user = global.userInfos["id"];
          axios.get(global.api + '/address/', {
            headers: {
              'Authorization': `Bearer ${global.token}`
            }}).then((response) => {
              if (response.status == 200) {
                let bodyJSON = [];
                for (let a = 0; response.data[a]; a += 1) {
                  response.data[a]["type"] = "Home";
                  response.data[a]["street"] = response.data[a]["state"];
                  response.data[a]["zip"] = response.data[a]["postal_code"];
                  response.data[a]["number"] = response.data[a]["street_number"];
                  response.data[a]["active"] = false;
                  if(response.data[a]["user_id"] == id_user) {
                    bodyJSON.push(response.data[a]);
                  }
                }
                this.setState ({
                  addresses: bodyJSON
                });
            }}).catch(function(error) {
              alert("error");
              throw error;
            });

      this.render();
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.setState({refreshing: false});
    this.myRequest();
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen, {
      onGoBack: () => this._onRefresh(),
    });
  };

  setDeliveryAddress = item => () => {
    const { addresses } = this.state;
    const index = addresses.indexOf(item);
    const activeIndex = addresses.findIndex(e => e.active === true);

    if (activeIndex !== index) {
      if (activeIndex != -1) {
      addresses[activeIndex].active = false;
    }
      addresses[index].active = true;

      this.setState({
        addresses: [...addresses]
      });
    }
  };

  removeAddress = item => () => {
    const { addresses } = this.state;
    const index = addresses.indexOf(item);

    axios.delete(global.api + '/address/' + JSON.stringify(item["id"]), {
      headers: {
        'Authorization': `Bearer ${global.token}`
      }})
      .then((response) => {
        if (response.status == 200) {
          alert("Adresse supprimée");
          this._onRefresh();
      }
      }).catch(function(error) {
        alert("Erreur");
        throw error;
      });

  };

  keyExtractor = (item, index) => index.toString();

  renderAddressItem = ({ item }) => (
    <Address
      key={item.id}
      onPress={this.setDeliveryAddress(item)}
      onPressEdit={this.removeAddress(item)}
      type={item.type}
      building={item.building}
      street={item.street}
      district={item.district}
      city={item.city}
      zip={item.zip}
      number={item.number}
      active={item.active}
    />
  );

  renderSeparator = () => <Divider />;

  handleFabPress = () => {
    // alert('FAB Pressed');
  };

  renderFabIcon = () => (
    <Icon name={fabIcon} size={24} color={Colors.onAccentColor} />
  );

  render() {

    const { addresses } = this.state;

    return (
      
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.screenContainer}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />
          <View style={styles.container}>
          <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
            <FlatList
              data={addresses}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderAddressItem}
              ItemSeparatorComponent={this.renderSeparator}
              contentContainerStyle={styles.addressList}
            />

            </ScrollView>

            <ActionButton
              buttonColor={Colors.accentColor}
              onPress={this.handleFabPress}
              offsetX={16}
              offsetY={16}
              renderIcon={this.renderFabIcon}
              bgColor="rgba(255, 255, 255, 0.56)"
            >
              <ActionButton.Item
                buttonColor={Colors.primaryColor}
                title="Ajouter une adresse"
                onPress={this.navigateTo("AddAddress")}
              >
                <Icon name={homeIcon} size={22} color={Colors.onPrimaryColor} />
              </ActionButton.Item>
            </ActionButton>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}
