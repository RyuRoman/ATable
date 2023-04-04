import React, { Component, Fragment } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";

import { AsyncStorage } from 'react-native';

// import components
import OrderItem from "../../components/cards/OrderItemB";

// import colors
import Colors from "../../theme/colors";
import axios from 'axios';

var tab_id_commands = [];
var tab_id_dish = [];
global.order_tmp = [];
global.myorder = [];

// OrdersB Styles
const styles = StyleSheet.create({
  topArea: { flex: 0, backgroundColor: Colors.primaryColor },
  container: {
    flex: 1,
    backgroundColor: "#efefef"
  },
  productsContainer: {
    paddingVertical: 8
  }
});

// OrdersB
export default class OrdersB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      commands: [],
      myItems: [],
      myOrder: [],
      products: [],
      isLoading: true
    };

    AsyncStorage.clear();
    this.getOrders();
  }

  getOrders = () => {

    tab_id_commands = [];
    tab_id_dish = [];

    /* GET TOUT LES ID DE MES COMMANDES + STATUS */
    axios.get(global.api + '/command/', {
      headers: {
        'Authorization': `Bearer ${global.token}`
      }
    }).then((response) => {
      if (response.status == 200) {

        var counter_command = 0;
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i]["customer_id"] == global.userInfos["customer_id"] && response.data[i]["command_status_id"] == 1) {
            counter_command += 1;
            tab_id_commands.push({
              id: response.data[i]["id"],
              status: 1
            });
          } else if (response.data[i]["customer_id"] == global.userInfos["customer_id"] && response.data[i]["command_status_id"] == 0) {
            counter_command += 1;
            tab_id_commands.push({
              id: response.data[i]["id"],
              status: 0
            });
          }
        }
        this.saveData("commands", JSON.stringify(tab_id_commands));
      }
    }).catch((error) => {
      console.log(error);
    });
    this.getCommandDish();
  };

  getCommandDish = async () => {
    try {

      let value = await AsyncStorage.getItem("commands");
      var value_json = JSON.parse(value);

      /* GET LES DISH ID + PRIX DE COMMANDE */
      axios.get(global.api + '/command_dish', {
        headers: {
          'Authorization': `Bearer ${global.token}`
        }})
      .then((response) => {
        if (response.status == 200) {
          for (var j = 0; j < value_json.length; j += 1) {
            var price = 0;
            var id_dishes = [];
            for (var k = 0; k < response.data.length; k += 1) {
              if (response.data[k]["command_id"] == value_json[j]["id"]) {
                id_dishes.push(response.data[k]["dish_id"]);
              }
            }
            var obj2 = {
              id: value_json[j]["id"],
              id_dishes: id_dishes,
              status: value_json[j]["status"]
            };
            tab_id_dish.push(obj2);
          }
          this.saveData("command_dish", JSON.stringify(tab_id_dish));
          this.getDishes();
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    catch(error){
      console.log(error);
    }
  };

  getDishes = async () => {

    try {
      let value = await AsyncStorage.getItem("command_dish");
      var value_json = JSON.parse(value);

    /* GET LES NOMS DISH + PRICE */
    for (var m = 0; m < value_json.length; m += 1) {
      for (var n = 0; n < value_json[m]["id_dishes"].length; n += 1) {
        await this.getMyOrder(global.api + '/dish/' + value_json[m]["id_dishes"][n], value_json[m]["status"]);
      }
      this.state.orders.push(global.myorder);
    }
    this.setState(this.state.orders);
    this.setState({
      isLoading: false
    });
  } catch(error){
    console.log(error);
    this.setState({
      isLoading: false
    });
  }
  };

  getMyOrder = async (myrequest, status) => {

    try {
    await axios.get(myrequest, {
      headers: {
        'Authorization': `Bearer ${global.token}`
      }}).then((response) => {
        if (response.status == 200) {
          let myItem = {
            name: response.data["name"],
            price: response.data["price"]
          };
          this.state.myItems.push(myItem);
          var status_id = "en-cours";
          if (status == 1) {
            status_id = "payee";
          }
          global.myorder = {
            orderNumber: 1,
            orderDate: " ",
            orderStatus: status_id,
            orderItems: this.state.myItems
          };
        }
      }).catch((error) => {
        console.log(error);
      });
      return (global.myorder);
    } catch(error){
      console.log(error);
    }

  }

  getData = async (research) => {

    try {
      let value = await AsyncStorage.getItem(research);
      console.log(JSON.stringify(value));

    } catch(error){
      console.log(error);
    }

  }

  saveData = async (val1, val2)=>{
    try{
      let res = await AsyncStorage.setItem(val1, val2);
    }
    catch(error){
      console.log(error);
    }
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  keyExtractor = item => item.orderNumber.toString();

  renderItem = ({ item, index }) => (
    <OrderItem
      key={index}
      activeOpacity={0.8}
      orderNumber={item.orderNumber}
      orderDate={item.orderDate}
      orderItems={item.orderItems}
      orderStatus={item.orderStatus}
    />
  );

  render() {

    const { orders, isLoading } = this.state;

    if (!isLoading) {

    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <View style={styles.container}>
            <FlatList
              data={orders}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              contentContainerStyle={styles.productsContainer}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
}
}
