import React, { Component } from "react";
import {
  ImageBackground,
  ScrollView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-navigation";
import getImgSource from '../../utils/getImgSource.js';

// import components
import Divider from "../../components/divider/Divider";
import LinkButton from "../../components/buttons/LinkButton";
import ProductCard from "../../components/cards/ProductCard";
import { Heading6 } from "../../components/text/CustomText";
import axios from 'axios'

// import colors
import Colors from "../../theme/colors";

// HomeB Config
const imgHolder = require("../../assets/img/imgholder.png");

// HomeB Styles
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
  categoryContainer: {
    marginLeft: 8,
    width: 112,
    height: 112
  },
  categoryThumbnail: {
    borderRadius: 8,
    width: "100%",
    height: "100%"
  },
  categoryImg: {
    borderRadius: 8
  },
  categoryName: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "rgba(128, 128, 128, 0.8)"
  },
  categoryNameText: {
    fontWeight: "700",
    color: Colors.white
  }
});

// HomeB
export default class HomeB extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    navigation.navigate(screen);
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

  keyExtractor = (item, index) => index.toString();

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
      <View style={styles.container}>

      </View>
      <View style={styles.titleContainer}>
        <Heading6 style={styles.titleText}>Liste des plats postés</Heading6>
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
