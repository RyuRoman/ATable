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
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View
} from "react-native";
import Color from "color";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import getImgSource from "../../utils/getImgSource.js";

import { Card } from 'react-native-elements';

// import components
import TouchableItem from "../../components/TouchableItem";
import { Heading6 } from "../../components/text/CustomText";
import Button from "../../components/buttons/Button";

// import colors
import Colors from "../../theme/colors";

// SearchA Config
const SEARCH_ICON = "magnify";
const imgHolder = require("../../assets/img/imgholder.png");

// SearchA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1
  },
  titleContainer: {
    paddingHorizontal: 16
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 8,
    fontWeight: "700"
  },
  inputContainer: {
    marginHorizontal: 16,
    paddingBottom: 10
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#efefef",
    paddingLeft: 8,
    paddingRight: 51,
    height: 46,
    fontSize: 16,
    textAlignVertical: "center"
  },
  searchButtonContainer: {
    position: "absolute",
    top: 4,
    right: 4,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    overflow: "hidden"
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 38,
    height: 38
  },
  categoriesList: {
    paddingBottom: 10
  },
  cardImg: { borderRadius: 4 },
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
    height: 100,
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
  cardTitle: {
    padding: 16,
    fontWeight: "500",
    fontSize: 18,
    color: Colors.white,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

// SearchA
export default class SearchA extends Component {
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
        },
        {
          key: 6,
          imageUri: require("../../assets/img/cake_2.jpg"),
          name: "Dessert"
        }
      ]
    };
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;

    Keyboard.dismiss();

    navigation.navigate(screen);
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

  render() {
    const { categories } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Mes paiements</Heading6>
        </View>

        <View style={styles.container}>
          <ScrollView>
          
          <Card title={data[2].date}>
                            <View  style={styles.user}>
                            <Text style={styles.name}>{data[0].id}</Text>
                            <Text style={styles.name}>{data[0].amount}</Text>
                            <Text style={styles.name}>{data[0].rib}</Text>
                            <Text style={styles.name}>{data[0].status}</Text>
                            </View>
                    </Card>
                    <Card title={data[1].date}>
                            <View style={styles.user}>
                            <Text style={styles.name}>{data[1].id}</Text>
                            <Text style={styles.name}>{data[1].amount}</Text>
                            <Text style={styles.name}>{data[1].rib}</Text>
                            <Text style={styles.name}>{data[1].status}</Text>
                            </View>
                    </Card>
                    <Card title={data[0].date}>
                            <View style={styles.user}>
                            <Text style={styles.name}>{data[2].id}</Text>
                            <Text style={styles.name}>{data[2].amount}</Text>
                            <Text style={styles.name}>{data[2].rib}</Text>
                            <Text style={styles.name}>{data[2].status}</Text>
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
     date: "Virement du 01/10/2019", 
     id: "#83743847", 
     amount: '342.17€',
     rib: 'FR11 3234 2322 3232 21',
     status: 'En cours'
  },
  {
      date: "Virement du 01/09/2019",
      id: "#64839204", 
      amount: '321.87€',
      rib: 'FR11 3234 2322 3232 21',
      status: 'Complete'
   },
   {
      date: "Virement du 01/08/2019",
      id: "#48362547", 
      amount: '342.17€',
      rib: 'FR11 3234 2322 3232 21',
      status: 'Processing'
   },
 ];