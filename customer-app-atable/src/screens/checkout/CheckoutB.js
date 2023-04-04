import React, { Component, Fragment } from "react";

import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  WebView
} from "react-native";
import Divider from "../../components/divider/Divider";
import Color from "color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Swiper from "react-native-swiper";
import ProductCard from "../../components/cards/ProductCard";

// import components
import Button from "../../components/buttons/Button";
import InfoModal from "../../components/modals/InfoModal";
import LinkButton from "../../components/buttons/LinkButton";

import {
  Heading6,
  Caption,
  Subtitle1,
  Subtitle2
} from "../../components/text/CustomText";
import UnderlineTextInput from "../../components/textinputs/UnderlineTextInput";

// import colors, layout
import Colors from "../../theme/colors";
import Layout from "../../theme/layout";
import axios from 'axios';
import { StackRouter } from "react-navigation";

// Checkout Config
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;
const checkmarkIcon =
  Platform.OS === "ios"
    ? "ios-checkmark-circle-outline"
    : "md-checkmark-circle-outline";

// CheckoutA Styles
const styles = StyleSheet.create({
  pt16: { paddingTop: 16 },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: Colors.primaryColor,
    elevation: 1,
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#a7a7aa"
      }
    })
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48
  },
  stepContainer: {
    width: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  stepText: {
    color: Color(Colors.onPrimaryColor).alpha(0.64)
  },
  activeStepText: {
    color: Colors.onPrimaryColor
  },
  line: {
    width: 48,
    height: 1,
    backgroundColor: Color(Colors.onPrimaryColor).alpha(0.32)
  },
  activeLine: {
    backgroundColor: Colors.onPrimaryColor
  },
  swiperContainer: {
    flex: 1,
    ...Platform.select({
      android: {
        minHeight: Layout.SCREEN_HEIGHT - 3*56
      }
    })
  },
  formContainer: {
    flex: 1
  },
  form: {
    paddingVertical: 24,
    paddingHorizontal: 20
  },
  overline: {
    color: Color(Colors.secondaryText).alpha(0.6)
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 18,
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  actionButton: {
    color: Colors.accentColor,
    textAlign: "center"
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: Colors.background
  },
  linkButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16
  },
  linkButton: {
    color: Colors.black
  },
  orderInfo: {
    paddingVertical: 8
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textCenter: {
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center"
  },
  amount: {
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 24
  }
});

// CheckoutA
export default class CheckoutB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card_number: "",
      products: [],
      commands: [],
      productJSON: [],
      cardJSON: [],
      addressJSON: [],
      total: 0
    };

    this.getCurrentCommand();
    this.getCurrentAddress();
    //this.getCurrentCard();
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen, {
      total: this.state.total
    });
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  getCurrentCommand = () => {
    this.state = {
      card_number: "",
      products: [],
      commands: [],
      productJSON: [],
      cardJSON: [],
      addressJSON: [],
      dish_id: [],
      total: 0
    };
    axios.get(global.api + '/command/', {
      headers: {
        'Authorization': `Bearer ${global.token}`
      }
    }).then((response) => {
      if (response.status == 200 && response.data.length > 0) {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i]["customer_id"] == global.userInfos["customer_id"] && response.data[i]["command_status_id"] == 0) {
            break;
          }
        }
        if (i != response.data.length) {
          this.state.current_command_id = response.data[i]["id"];

          axios.get(global.api + '/command_dish', {
            headers: {
              'Authorization': `Bearer ${global.token}`
            }})
          .then((response) => {
            if (response.status == 200) {
              var k = 0;
              var productsJSON = [];
              for (var j = 0; j < response.data.length; j++) {
                if (response.data[j]["command_id"] == this.state.current_command_id) {
                  this.state.commands[k] = response.data[j]["dish_id"];
                  this.state.dish_id[k] = response.data[j]["id"];
                  k++;
                }
              }
              var my_total = 0;
              for (var l = 0; l != k; l++) {
                var nb_tour = 0;
                axios.get(global.api + '/dish/' + this.state.commands[l], {
                  headers: {
                    'Authorization': `Bearer ${global.token}`
                  }
                }).then((response) => {
                  if (response.status == 200) {
                    response.data["quantity"] = 1;
                    response.data["id_command_dish"] = this.state.dish_id[nb_tour];
                    response.data["imageUri"] = "https://www.glamourparis.com/uploads/images/thumbs/201913/f6/_foodporn___o___manger_un_bon_burger_au_poisson___6229.jpeg_north_1200x_white.jpg";
                    my_total += response.data["price"];
                    productsJSON.push(response.data);
                    this.setState({
                      products: productsJSON,
                      total: my_total,
                      refreshing: false
                    },
                      () => {
                        this.updateTotalAmount();
                      });
                      nb_tour++;
                }}).catch(function(error) {
                  alert("error");
                  throw error;
                });
              }
            }});
        }
      }
    }).catch(function(error) {
        alert("error");
        throw error;
      });
  };

  keyExtractor = item => item.name.toString();

  renderSeparator = () => <Divider />;

  renderProductItem = ({ item }) => (
    <ProductCard
      key={item.id}
      activeOpacity={0.7}
      title={item.name}
      quantity={item.quantity}
      description={item.description}
      price={item.price}
    />
  );

  updateTotalAmount = () => {
    const { products } = this.state;
    let totalPrice = 0;
    products.forEach(product => {
      let { price } = product;
      totalPrice += price;
    });

    this.setState({
      total: totalPrice
    });
  };

  getCurrentAddress = () => {
    axios.get(global.api + '/user/current/' + global.userInfos["email"], {
      headers: {
        'Authorization': `Bearer ${global.token}`
      }}).then((response) => {
        if (response.status == 200) {
          let id_user = response.data["id"];
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
                  if(response.data[a]["user_id"] == id_user && response.data[a]["is_active"] == 1) {
                    bodyJSON.push(response.data[a]);
                  }
                }
                let address = bodyJSON[0]["street_number"] + " " + bodyJSON[0]["street"] + " " + bodyJSON[0]["postal_code"] + " " + bodyJSON[0]["city"] + " " + bodyJSON[0]["country"];
                this.setState({
                  addressJSON: address
                });
            }}).catch(function(error) {
              alert("error");
              throw error;
            });
       }}).catch(function(error) {
        alert("error");
        throw error;
      });
  };

  onPaymentSuccess = (token) => {
    alert("PAYER");
  };
  
  onClose = () => {
    alert("FERMER");
  };

  render() {
    const { productJSON, addressJSON, total, products } = this.state;
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

    <Heading6 style={styles.textCenter}>{"\n"}{"\n"}Plats commandés{"\n"}</Heading6>
      <FlatList
      data={products}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderProductItem}
    />
    <Heading6 style={styles.textCenter}>Montant total</Heading6>
    <Subtitle2 style={styles.textCenter}>{total}€{"\n"}</Subtitle2>
    <Heading6 style={styles.textCenter}>Adresse de livraison</Heading6>
    <Subtitle2 style={styles.textCenter}>{addressJSON}{"\n"}</Subtitle2>
    
    <Button
      buttonStyle={styles.checkoutButton}
      onPress={this.navigateTo("Paypal")}
      title="Payer"
    />
      </SafeAreaView>
    );
  }
}