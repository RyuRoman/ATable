import React, { Component, Fragment } from "react";
import { StatusBar, StyleSheet, View, FlatList, RefreshControl, ScrollView, DrawerLayoutAndroidComponent, ActivityIndicator } from "react-native";
import remove from "lodash/remove";
import { SafeAreaView } from "react-navigation";
import { AsyncStorage } from 'react-native';
import SyncStorage from 'sync-storage';
import email from 'react-native-email';

// import components
import Button from "../../components/buttons/Button";
import Divider from "../../components/divider/Divider";
import EmptyState from "../../components/emptystate/EmptyState";
import ProductCard from "../../components/cards/ProductCard";
import { Heading6, Subtitle1 } from "../../components/text/CustomText";

// import colors
import Colors from "../../theme/colors";
import axios from 'axios'
import syncStorage from "sync-storage";

// CartB Config
const EMPTY_STATE_ICON = "cart-remove";

// CartB Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  titleText: {
    fontWeight: "700"
  },
  inline: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  subTotalText: {
    top: -2,
    fontWeight: "500",
    color: Colors.onSurface
  },
  subTotalPriceText: {
    fontWeight: "700",
    color: Colors.primaryColor
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 16
  },
  addMoreButton: {
    width: "50%",
    marginRight: 16,
    backgroundColor: Colors.tertiaryColor
  },
  checkoutButton: {
    width: "50%",
    backgroundColor: Colors.primaryColor
  },
  emptyCartInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16
  }
});

// CartB
export default class CartB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0.0,
      products: [],
      refreshing: false,
      current_command_id: -1,
      dish_id: [],
      commands: [],
      cookers: [],
      cooker_email: [],
      isLoading: true
    };

    this.getCart();
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.setState({refreshing: false});
    this.getCart();
  }

  getCart = async () => {

    try{

    this.state = {
      total: 0.0,
      products: [],
      refreshing: false,
      current_command_id: -1,
      dish_id: [],
      commands: [],
      cookers: [],
      cooker_email: [],
      quantity: [],
      isLoading: true
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
          let myval = '' + this.state.current_command_id;

          this.saveData("current_command", myval);

          let array_cookers = [];

          await axios.get(global.api + '/command_dish', {
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
                  this.state.quantity[k] = response.data[j]["quantity"];
                  k++;
                }
              }
              for (var l = 0; l != k; l = l + 1) {
                var nb_tour = 0;
                axios.get(global.api + '/dish/' + this.state.commands[l], {
                  headers: {
                    'Authorization': `Bearer ${global.token}`
                  }
                }).then((response) => {
                  if (response.status == 200) {
                    let tmp = {
                      cooker_id: response.data["cooker_id"],
                      price: response.data["price"],
                      email: ""
                    };
                    array_cookers.push(tmp);
                    response.data["quantity"] = this.state.quantity[nb_tour];
                    response.data["id_command_dish"] = this.state.dish_id[nb_tour];
                    response.data["imageUri"] = "https://www.glamourparis.com/uploads/images/thumbs/201913/f6/_foodporn___o___manger_un_bon_burger_au_poisson___6229.jpeg_north_1200x_white.jpg";
                    productsJSON.push(response.data);
                    this.state.products = productsJSON;
                    this.state.cookers = array_cookers;
                    this.setState(this.state.cookers);
                    this.saveData("cookers", JSON.stringify(this.state.cookers));
                    this.state.refreshing = false;
                    this.updateTotalAmount();
                    nb_tour++;
                }}).catch(function(error) {
                  throw error;
                });
              }
            }});
        }
      }
    }).catch(function(error) {
        throw error;
    });
    this.sendMail();
  } catch(error) {
    console.log(error);
    throw error;
  }
  };

  sendMail = () => {

    this.getCookers();

  };

  getCookers = async() => {
    try {
      let value = await AsyncStorage.getItem('cookers');
      value = JSON.parse(value);

      let array_cooker_email = [];

       await axios.get(global.api + '/user', {
        headers: {
          'Authorization': `Bearer ${global.token}`
        }})
      .then((response) => {
        for (var counter = 0; response.data[counter]; counter = counter + 1) {
          let obj = {
            id: response.data[counter]["cooker_id"],
            email: response.data[counter]["email"]
          };
          array_cooker_email.push(obj);
        }
        this.state.cooker_email = array_cooker_email;
        this.setState(this.state.cooker_email);
        syncStorage.set("cooker_email", JSON.stringify(this.state.cooker_email));
        this.setState({
          isLoading: false
        });
      }).catch(function(error) {
        alert("error");
        throw error;
      });

      let val = JSON.parse(syncStorage.get("cooker_email"));

      for (var count = 0; value[count]; count = count + 1) {
        for (var count2 = 0; val[count2]; count2 = count2 + 1) {
          if (value[count]["cooker_id"] == val[count2]["id"]) {
            value[count]["email"] = val[count2]["email"];
          }
          break;
        }
      }
      syncStorage.set("cookers", JSON.stringify(value));
    } catch (error) {
      console.log("Error");
    }
  };

  getData = async () => {

    try{
      let value = await AsyncStorage.getItem('current_command');
      let obj = {
        command_status_id: 1
      };

      axios.put(global.api + "/command/" + value, obj, {
        headers: {
          'Authorization': `Bearer ${global.token}`
        }
      })
      .then((resp) => {
        if (resp.status == 200) {
          console.log("changed");
        }
      }).catch(function(error) {
        console.log("error get command");
        throw error;
      });

    } catch(error){
      console.log(error);
    }

    /*let val = syncStorage.get("cookers");

    const to = ["doriand91240@gmail.com"];
    email(to, {
      cc: [],
      bcc: '',
      subject: 'New command',
      body: val
    }).catch(console.error)*/

  }

  goCheckout = () => {

    this.getData();

    const { navigation } = this.props;
    navigation.navigate("Checkout");
  };

  saveData = async (val1, val2)=>{
    try{
      let res = await AsyncStorage.setItem(val1, val2);
    }
    catch(error){
      console.log(error);
    }
  }

  componentWillMount = () => {
    this.updateTotalAmount();
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  swipeoutOnPressRemove = item => () => {
    let { products } = this.state;
    const index = products.indexOf(item);
    axios.delete(global.api + '/command_dish/' + JSON.stringify(products[index]["id_command_dish"]), {
      headers: {
        'Authorization': `Bearer ${global.token}`
      }})
      .then((response) => {
        if (response.status == 200) {
          alert("Produit supprimé: " + JSON.stringify(products[index]["name"]));
          products = remove(products, n => products.indexOf(n) !== index);
          this.setState(
            {
              products
            },
            () => {
              this.updateTotalAmount();
            }
          );
      }
      }).catch(function(error) {
        throw error;
      });
  };

  onPressRemove = item => () => {
    let { quantity } = item;
    quantity -= 1;

    let { products } = this.state;
    const index = products.indexOf(item);

    if (quantity === 0) {
      products = remove(products, n => products.indexOf(n) !== index);
    } else {
      products[index].quantity = quantity;
    }

    this.setState(
      {
        products: [...products]
      },
      () => {
        this.updateTotalAmount();
      }
    );
  };

  onPressAdd = item => () => {
    const { quantity } = item;
    const { products } = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.setState(
      {
        products: [...products]
      },
      () => {
        this.updateTotalAmount();
      }
    );
  };

  updateTotalAmount = () => {
    const { products } = this.state;

    let totalPrice = 0.0;

    products.forEach(product => {
      let { price } = product;
      const { discountPercentage, quantity } = product;

      if (typeof discountPercentage !== "undefined") {
        price -= price * discountPercentage * 0.01;
      }
      totalPrice += price * quantity;
    });

    this.setState({
      total: totalPrice
    });
  };

  keyExtractor = item => item.id.toString();

  renderProductItem = ({ item }) => (
    <ProductCard
      key={item.id}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      activeOpacity={0.7}
      imageUri={item.imageUri}
      title={item.name}
      price={item.price}
      quantity={item.quantity}
      swipeoutOnPressRemove={this.swipeoutOnPressRemove(item)}
    />
  );

  renderSeparator = () => <Divider />;

  render() {
    const { isLoading } = this.state;

    if (!isLoading) {

      const { total, products } = this.state;

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

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Panier</Heading6>

          {
            products.length > 0 &&
              <View style={styles.inline}>
                <Subtitle1 style={styles.subTotalText}>Total: </Subtitle1>
                <Heading6 style={styles.subTotalPriceText}>
                  {`${parseFloat(Math.round(total * 100) / 100).toFixed(2)} €`}
                </Heading6>
              </View>
          }
        </View>
        {
          products.length === 0 ? (
            <EmptyState
              showIcon
              iconName={EMPTY_STATE_ICON}
              title="Votre panier est vide"
              message="Vous n'avez ajouté aucun article à votre panier"
            />
          ) : (
            <Fragment>
              <FlatList
                data={products}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderProductItem}
                ItemSeparatorComponent={this.renderSeparator}
              />

              <View style={styles.bottomButtonsContainer}>
                <Button
                  onPress={this.navigateTo("Home")}
                  buttonStyle={styles.addMoreButton}
                  title="Ajouter des produits"
                />
                <Button
                  onPress={() => this.goCheckout()}
                  buttonStyle={styles.checkoutButton}
                  title="Commander"
                />
              </View>
            </Fragment>
          )
        }
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    const { total, products } = this.state;
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <ActivityIndicator size="large"/>
      </View>
    ); 
  }
}
}
