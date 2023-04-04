/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component, Fragment } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
  ToastAndroid,
  RefreshControl
} from "react-native";
import remove from "lodash/remove";
import { SafeAreaView } from "react-navigation";
import { Card } from 'react-native-elements';

import SyncStorage from 'sync-storage';

// import components
import ActionProductCardHorizontal from "../../components/cards/ActionProductCardHorizontal";
import EmptyState from "../../components/emptystate/EmptyState";
import { Heading6, SmallText } from "../../components/text/CustomText";

// import colors
import Colors from "../../theme/colors";

import ProductCard from "../../components/cards/ProductCard"

import Button from "../../components/buttons/Button";

// FavoritesA Config
const EMPTY_STATE_ICON = "star-outline";

// FavoritesA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  titleContainer: {
    paddingHorizontal: 16
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 24,
    fontWeight: "700"
  },
  productList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12
  },
  bottomTextInfo: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  }
});

// FavoritesA
export default class FavoritesA extends Component {
  constructor(props) {
    super(props);

    

    this.state = {
      test: true,
      refreshing: false,
      dish: []
    };

    const api_url = SyncStorage.get('API_URL');
    const tokeN = SyncStorage.get('token');
    const cookerID = SyncStorage.get('cooker_id');

    fetch(api_url + "/api/dish", {
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
      
        var my_dish = [];
        var j = 0;
        for (var i=0; i<json.length; i++) {
          if (json[i].cooker_id == cookerID) {
            //my_dish[j] = json[i];
            my_dish.push(json[i])
            j++;
          }
        }

        this.setState({dish: my_dish});

    })
    .catch((error) => {
      console.error(error);
    }); 

  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  swipeoutOnPressRemove = item => () => {
    let { products } = this.state;
    const index = products.indexOf(item);

    products = remove(products, n => products.indexOf(n) !== index);

    this.setState({
      products
    });
  };

  onPressRemove = item => () => {
    let { quantity } = item;
    quantity -= 1;

    const { products } = this.state;
    const index = products.indexOf(item);

    if (quantity < 0) {
      return;
    }
    products[index].quantity = quantity;

    this.setState({
      products: [...products]
    });
  };

  onPressAdd = item => () => {
    const { quantity } = item;
    const { products } = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.setState({
      products: [...products]
    });
  };

  keyExtractor = item => item.id.toString();

  renderProductItem = ({ item }) => (
    <ActionProductCardHorizontal
      key={item.id}
      onPress={this.navigateTo("Product")}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      imageUri={item.imageUri}
      title={item.name}
      price={item.price}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
      swipeoutDisabled={false}
      swipeoutOnPressRemove={this.swipeoutOnPressRemove(item)}
    />
  );

    myDeleteDish(id) {
     
      const api_url = SyncStorage.get('API_URL');
    const tokeN = SyncStorage.get('token');
    const cookerID = SyncStorage.get('cooker_id');

    fetch(api_url + "/api/dish/" + JSON.stringify(id), {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokeN
      },
    }
    )
    .then((response) => response.json())
    .then((json) => {
      
      ToastAndroid.showWithGravity(
        JSON.stringify(json),
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );

    })
    .catch((error) => {
      console.error(error);
    }); 

    fetch(api_url + "/api/dish", {
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
      
        var my_dish = [];
        var j = 0;
        for (var i=0; i<json.length; i++) {
          if (json[i].cooker_id == cookerID) {
            //my_dish[j] = json[i];
            my_dish.push(json[i])
            j++;
          }
        }

        this.setState({dish: my_dish});

    })
    .catch((error) => {
      console.error(error);
    });
    }

  _onRefresh() {
    this.setState({refreshing: true});
    const api_url = SyncStorage.get('API_URL');
    const tokeN = SyncStorage.get('token');
    const cookerID = SyncStorage.get('cooker_id');

    fetch(api_url + "/api/dish", {
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
      
        var my_dish = [];
        var j = 0;
        for (var i=0; i<json.length; i++) {
          if (json[i].cooker_id == cookerID) {
            //my_dish[j] = json[i];
            my_dish.push(json[i])
            j++;
          }
        }

        this.setState({dish: my_dish});

    })
    .catch((error) => {
      console.error(error);
    });
    this.setState({refreshing: false});
  }

  render() {
    const { products } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Mes plats</Heading6>
        </View>

        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >
           {/*Loop of JS which is like foreach loop*/}
          {this.state.dish.map((item, key) => (
            //key is the index of the array 
            //item is the single item of the array
            <View key = { key } >
               <Card title={item.name}>
               <View style={styles.user}>
               <Text style={styles.name}>Description: {item.description}</Text>
               <Text style={styles.name}>Prix: {item.price}</Text>
               <Text style={styles.name}>Quantité: {item.quantity}</Text>
               <Text style={styles.name}>Temps de préparation: {item.preparation_time}</Text>
               <Text style={styles.name}>Date d'expiration: {item.expiration_date}</Text>
                <Button
                 title="Supprimer"
                 activeOpacity={0.8}
                 color="red"
                 onPress={() => this.myDeleteDish(item.id)}
                />
             </View>
             </Card>
             </View>

          ))}
 
          </ScrollView>
        </View>

        
      </SafeAreaView>
    );
  }
}
