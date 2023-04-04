import React, { Component } from "react";
import {
  FlatList,
  ImageBackground,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import Color from "color";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import ProductCard from "../../components/cards/ProductCard";
import Divider from "../../components/divider/Divider";
import getImgSource from "../../utils/getImgSource.js";

// import components
import TouchableItem from "../../components/TouchableItem";
import { Heading6 } from "../../components/text/CustomText";

// import colors
import Colors from "../../theme/colors";
import axios from 'axios';

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
      zip: "",
      products: []
    };

    axios.get(global.api + '/dish', {
      headers: {
        'Authorization': `Bearer ${global.token}`
      }})
    .then((response) => {
      if (response.status == 200) {
        var obj = JSON.stringify(response.data);
        var objJSON = JSON.parse(obj);
        this.setState({
          products: objJSON
        });
      }
    }).catch(function(error) {
      alert("error");
      throw error;
    });
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;

    Keyboard.dismiss();
    navigation.navigate(screen);
  };

  findbycity = () => {
    alert("Requete pour le code zip : " + this.zip);
    axios.get(global.api + '/dish', {
      headers: {
        'Authorization': `Bearer ${global.token}`
      }})
    .then((response) => {
      if (response.status == 200) {
        var obj = JSON.stringify(response.data);
        var objJSON = JSON.parse(obj);
        var tabDish = [];
        for (var a=0; objJSON[a]; a=a+1) {
          if (objJSON[a]["zip_code"] == this.zip) {
            var ok = "ok";
          }
        }
        if (!tabDish[0]) {
          tabDish = objJSON;
        }
        this.products = tabDish;
        this.render;
      }
    }).catch(function(error) {
      alert("error");
      throw error;
    });

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Rechercher</Heading6>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            onRef={r => {
              this.zip = r;
            }}
            onChangeText={this.zipChange}
            placeholder="Saisir un code zip"
            returnKeyType="search"
            maxLength={50}
            style={styles.textInput}
          />
          <View style={styles.searchButtonContainer}>
        
              <View style={styles.searchButton}>
                <Icon
                  name={SEARCH_ICON}
                  size={23}
                  color={Colors.onPrimaryColor}
                  onPress={this.findbycity}
                />
            </View>
          </View>
        </View>
        <FlatList
            data={this.products}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem}
            ItemSeparatorComponent={this.renderSeparator}
      />
      </SafeAreaView>
    );
  };

  keyExtractor = (item, index) => index.toString();

  zipChange = text => {
    this.zip = text;
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

  renderProductItem = ({ item, index }) => (
    <ProductCard
    onPress={() => {
      {this.props.navigation.navigate("Product", {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        singleProductPrice: item.price,
        quantityMax: item.quantity,
        expire: item.expiration_date.substring(0, 10),
        photo: "https://www.glamourparis.com/uploads/images/thumbs/201913/f6/_foodporn___o___manger_un_bon_burger_au_poisson___6229.jpeg_north_1200x_white.jpg",
        createdDate: item.created_at.substring(0, 10),
      })}}}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      key={index}
      activeOpacity={0.7}
      imageUri="https://www.glamourparis.com/uploads/images/thumbs/201913/f6/_foodporn___o___manger_un_bon_burger_au_poisson___6229.jpeg_north_1200x_white.jpg"
      title={item.name}
      price={item.price}
      description={item.description}
      quantity={item.quantity}
      swipeoutDisabled
    />
  );

  renderSeparator = () => <Divider />;

  render() {
    const { products } = this.state;
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Rechercher</Heading6>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            onRef={r => {
              this.zip = r;
            }}
            onChangeText={this.zipChange}
            placeholder="Saisir un code zip"
            returnKeyType="search"
            maxLength={50}
            style={styles.textInput}
          />
          <View style={styles.searchButtonContainer}>
        
              <View style={styles.searchButton}>
                <Icon
                  name={SEARCH_ICON}
                  size={23}
                  color={Colors.onPrimaryColor}
                  onPress={this.findbycity}
                />
            </View>
          </View>
        </View>
        <FlatList
            data={products}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem}
            ItemSeparatorComponent={this.renderSeparator}
      />
      </SafeAreaView>
    );
  }
}
