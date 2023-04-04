/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import Color from "color";
import { SafeAreaView } from "react-navigation";
import getImgSource from "../../utils/getImgSource.js";

import { Card } from 'react-native-elements';

// import components
import ActionProductCard from "../../components/cards/ActionProductCard";
import ActionProductCardHorizontal from "../../components/cards/ActionProductCardHorizontal";
import LinkButton from "../../components/buttons/LinkButton";
import { Heading6 } from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

// HomeA Config
const imgHolder = require("../../assets/img/imgholder.png");

// HomeA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1
  },
  categoriesContainer: {
    paddingBottom: 16
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
  viewAllText: {
    color: Colors.primaryColor
  },
  categoriesList: {
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 8
  },
  cardImg: { borderRadius: 4 },
  card: {
    marginLeft: 8,
    width: 104,
    height: 72,
    resizeMode: "cover"
  },
  cardOverlay: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Color(Colors.overlayColor).alpha(0.2),
    overflow: "hidden"
  },
  cardContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cardTitle: {//
    padding: 12,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.white,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  productsList: {
    paddingBottom: 16,
    // spacing = paddingHorizontal + ActionProductCard margin = 12 + 4 = 16
    paddingHorizontal: 12
  },
  popularProductsList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12,
    paddingBottom: 16
  }
});

export default class HomeA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [
        {
          key: 1,
          imageUri: require("../../assets/img/pizza_3.jpg"),
          name: "Pizza"
        },
        {
          key: 2,
          imageUri: require("../../assets/img/meat_1.jpg"),
          name: "Grill"
        },
        {
          key: 3,
          imageUri: require("../../assets/img/spaghetti_2.jpg"),
          name: "Pasta"
        },
        {
          key: 4,
          imageUri: require("../../assets/img/soup_1.jpg"),
          name: "Soups"
        },
        {
          key: 5,
          imageUri: require("../../assets/img/salad_1.jpg"),
          name: "Salads"
        }
      ],
      products: [
        {
          imageUri: require("../../assets/img/pizza_4.png"),
          name: "Pizza Carbonara 35cm",
          price: 10.99,
          label: "new"
        },
        {
          imageUri: require("../../assets/img/sandwich_1.png"),
          name: "Breakfast toast sandwich",
          price: 4.99
        },
        {
          imageUri: require("../../assets/img/cake_3.png"),
          name: "Cake Cherries Pie",
          price: 8.49,
          discountPercentage: 10
        },
        {
          imageUri: require("../../assets/img/soup_2.png"),
          name: "Broccoli Soup",
          price: 6.49,
          discountPercentage: 10
        }
      ],
      popularProducts: [
        {
          imageUri: require("../../assets/img/sandwich_2.jpg"),
          name: "Subway sandwich",
          price: 8.49,
          quantity: 0,
          discountPercentage: 10
        },
        {
          imageUri: require("../../assets/img/pizza_1.jpg"),
          name: "Pizza Margarita 35cm",
          price: 10.99,
          quantity: 0
        },
        {
          imageUri: require("../../assets/img/cake_1.jpg"),
          name: "Chocolate cake",
          price: 4.99,
          quantity: 0
        }
      ]
    };
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  onPressRemove = item => () => {
    let { quantity } = item;
    quantity -= 1;

    const { popularProducts } = this.state;
    const index = popularProducts.indexOf(item);

    if (quantity < 0) {
      return;
    }
    popularProducts[index].quantity = quantity;

    this.setState({
      popularProducts: [...popularProducts]
    });
  };

  onPressAdd = item => () => {
    const { quantity } = item;
    const { popularProducts } = this.state;

    const index = popularProducts.indexOf(item);
    popularProducts[index].quantity = quantity + 1;

    this.setState({
      popularProducts: [...popularProducts]
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderCategoryItem = ({ item, index }) => (
    <ImageBackground
      key={index}
      defaultSource={imgHolder}
      source={getImgSource(item.imageUri)}
      imageStyle={styles.cardImg}
      style={styles.card}
    >
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={this.navigateTo("Category")}
          style={styles.cardContainer}
          // borderless
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  renderProductItem = ({ item, index }) => (
    <ActionProductCard
      onPress={this.navigateTo("Product")}
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.price}
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

  renderPopularProductItem = ({ item, index }) => (
    <ActionProductCardHorizontal
      onPress={this.navigateTo("Product")}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      swipeoutDisabled
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.price}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

  render() {
    const { categories, products, popularProducts } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Mes commandes</Heading6>
        </View>

        <View style={styles.container}>
          <ScrollView>
          <Card title={data[0].date}>
                    <View  style={styles.user}>
                    <Text style={styles.name}>ID: {data[0].id}</Text>
                    <Text style={styles.name}>Montant: {data[0].amount}</Text>
                    <Text style={styles.name}>Payement: {data[0].payment}</Text>
                    <Text style={styles.name}>Status: {data[0].status}</Text>
                    <Text style={styles.name}>Contenu: {data[0].content}</Text>
                    <Text style={styles.name}>Livreur: {data[0].livreur}</Text>
                    </View>
                </Card>
                <Card title={data[1].date}>
                    <View  style={styles.user}>
                    <Text style={styles.name}>ID: {data[1].id}</Text>
                    <Text style={styles.name}>Montant: {data[1].amount}</Text>
                    <Text style={styles.name}>Payement: {data[1].payment}</Text>
                    <Text style={styles.name}>Status: {data[1].status}</Text>
                    <Text style={styles.name}>Contenu: {data[1].content}</Text>
                    <Text style={styles.name}>Livreur: {data[1].livreur}</Text>
                    </View>
                </Card>
                <Card title={data[2].date}>
                    <View  style={styles.user}>
                    <Text style={styles.name}>ID: {data[2].id}</Text>
                    <Text style={styles.name}>Montant: {data[2].amount}</Text>
                    <Text style={styles.name}>Payement: {data[2].payment}</Text>
                    <Text style={styles.name}>Status: {data[2].status}</Text>
                    <Text style={styles.name}>Contenu: {data[2].content}</Text>
                    <Text style={styles.name}>Livreur: {data[2].livreur}</Text>
                    </View>
                </Card>
                <Card title={data[3].date}>
                    <View  style={styles.user}>
                    <Text style={styles.name}>ID: {data[3].id}</Text>
                    <Text style={styles.name}>Montant: {data[3].amount}</Text>
                    <Text style={styles.name}>Payement: {data[3].payment}</Text>
                    <Text style={styles.name}>Status: {data[3].status}</Text>
                    <Text style={styles.name}>Contenu: {data[3].content}</Text>
                    <Text style={styles.name}>Livreur: {data[3].livreur}</Text>
                    </View>
                </Card>
                <Card title={data[4].date}>
                    <View  style={styles.user}>
                    <Text style={styles.name}>ID: {data[4].id}</Text>
                    <Text style={styles.name}>Montant: {data[4].amount}</Text>
                    <Text style={styles.name}>Payement: {data[4].payment}</Text>
                    <Text style={styles.name}>Status: {data[4].status}</Text>
                    <Text style={styles.name}>Contenu: {data[4].content}</Text>
                    <Text style={styles.name}>Livreur: {data[4].livreur}</Text>
                    </View>
                </Card>

          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const data = [
  {
     date: "Le 23/09/2019 à 20h45", 
     id: "#64530293", 
     amount: '21.32€',
     payment: 'Payé',
     status: 'En cours de préparation',
     content: '2x Maxi Best Of BigMac frites coca 1x doubleCheese',
     livreur: 'Mise en relation avec un livreur en cours...'
  },
  {
      date: "Le 23/09/2019 à 20h31", 
      id: "#64530293", 
      amount: '18.67€',
      payment: 'Payé',
      status: 'En cours de préparation',
      content: 'test',
      livreur: 'Toto'
   },
   {
      date: "Le 23/09/2019 à 20h18", 
     id: "#63472934", 
     amount: '32.12€',
     payment: 'Payé',
     status: 'En cours de livraison',
     content: '3x Bucket KFC',
     livreur: 'test'
   },
   {
      date: "Le 23/09/2019 à 20h01", 
     id: "#73841263", 
     amount: '24.10€',
     payment: 'Payé',
     status: 'Livrée',
     content: 'test',
     livreur: 'test'
   },
   {
      date: "Le 23/09/2019 à 19h54", 
     id: "#63849274", 
     amount: '11.29€',
     payment: 'Payé',
     status: 'Livrée',
     content: 'test',
     livreur: 'test'
   },
 ];