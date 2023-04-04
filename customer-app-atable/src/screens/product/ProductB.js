import React, { Component, Fragment } from "react";
import {
  Platform,
  StatusBar,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Color from "color";
import { SafeAreaView } from "react-navigation";

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import Button from "../../components/buttons/Button";
import { Caption, Heading5, SmallText } from "../../components/text/CustomText";
import GradientContainer from "../../components/gradientcontainer/GradientContainer";
import Icon from "../../components/icon/Icon";
import TouchableItem from "../../components/TouchableItem";
import axios from 'axios'

// import colors
import Colors from "../../theme/colors";

// ProductB Config
const IOS = Platform.OS === "ios";
const MINUS_ICON = IOS ? "ios-remove" : "md-remove";
const PLUS_ICON = IOS ? "ios-add" : "md-add";
const FAVORITE_ICON = IOS ? "ios-heart" : "md-heart";
const CLOSE_ICON = IOS ? "ios-close" : "md-close";
const imgHolder = require("../../assets/img/imgholder.png");

// ProductB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  header: {
    width: "100%",
    height: 236
  },
  productImg: {
    width: "100%",
    height: 236,
    resizeMode: "cover"
  },
  bottomOverlay: { flex: 1 },
  topButton: {
    position: "absolute",
    top: 16,
    borderRadius: 18,
    backgroundColor: Colors.background
  },
  left: { left: 16 },
  right: { right: 16 },
  buttonIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36
  },
  favorite: {
    backgroundColor: Colors.secondaryColor
  },
  productDescription: {
    marginTop: -22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    backgroundColor: Colors.surface
  },
  productTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 10
  },
  productTitle: {
    fontWeight: "700"
  },
  priceText: {
    fontWeight: "700",
    fontSize: 18,
    color: Colors.black
  },
  shortDescription: {
    paddingVertical: 8
  },
  caption: {
    padding: 16,
    fontWeight: "700"
  },
  dishContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    height: 56
  },
  indicator: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  emptyIndicator: {
    marginRight: 24,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color(Colors.black).alpha(0.4),
    backgroundColor: Colors.background
  },
  filledIndicator: {
    marginRight: 24,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Color(Colors.black).alpha(0.4)
  },
  dishName: {
    top: -1,
    lineHeight: 22
  },
  dishPrice: {
    color: Colors.secondaryText
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  amountButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  quantity: {
    top: -1,
    paddingHorizontal: 18,
    fontSize: 18,
    color: Colors.black,
    textAlign: "center"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Color(Colors.primaryColor).alpha(0.88)
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: "100%",
    padding: 16,
    backgroundColor: "#efefef"
  },
  bottomArea: { flex: 0, backgroundColor: "#efefef" }
});

// ProductB
export default class ProductB extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      product: {
        imageUri: params.photo,
        id: params.id,
        name: params.name,
        description: params.description,
        price: params.price,
        singleProductPrice: params.singleProductPrice,
        quantity: 1,
        sideDish: 20,
        total: params.price,
        quantityMax: params.quantityMax,
        expire: params.expire,
        createdDate: params.createdDate,
        memberDate: params.memberDate,
        my_id: 0
      },
      favorite: false,
      my_id: 0
    };
  }

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  checkCommandExist = (arrayCommand) => {
    if (arrayCommand.length == 0) {
      return -1;
    }

    var i = 0;
    for (i; i < arrayCommand.length; i++) {
      if (arrayCommand[i]["customer_id"] == global.userInfos["customer_id"] && arrayCommand[i]["command_status_id"] == 0) {
        break;
      }
    }

    if (i == arrayCommand.length) {
      return -1;
    }

    return i;
  };

  addCart = () => {
      let command_id = -1;
      axios.get(global.api + '/command/', {
        headers: {
          'Authorization': `Bearer ${global.token}`
        }
      }).then((response) => {
        if (response.status == 200) {

          /* SI J'AI PAS DE COMMANDE*/
          let res = this.checkCommandExist(response.data);
          if (res == -1) {
            let body = {
              customer_id: global.userInfos["customer_id"],
              price: 0,
              command_status_id: 0
            };
            axios.post(global.api + '/command', body, {
              headers: {
                'Authorization': `Bearer ${global.token}`
              }
            })
            .then((resp) => {
              if (resp.status == 200) {
                console.log(resp.data["id"]);
                command_id = resp.data["id"];
              }
            }).catch(function(error) {
              alert("error");
              throw error;
            });
          } else {
            command_id = res;
          }

          const { product, my_id } = this.state;
          var counter = 0;
          let body = {
            price: product.total,
            command_id: response.data[command_id]["id"],
            dish_id: product.id,
            quantity: product.quantity
          };

            axios.post(global.api + '/command_dish/', body, {
              headers: {
                'Authorization': `Bearer ${global.token}`
              }
            }).then((response) => {
              if (response.status == 200) {
                counter += 1;
              }
            }).catch(function(error) {
              throw error;
            });
            
            alert("Produit ajouté");
            this.goBack();
        }
      }).catch(function(error) {
        alert("error");
        throw error;
      });

    };

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onPressAddToFavorites = () => {
    const { favorite } = this.state;

    this.setState({
      favorite: !favorite
    });
  };

  setExtraDish = item => () => {
    const { product, extras } = this.state;
    const index = extras.indexOf(item);
    const picked = extras[index].picked;

    if (picked) {
      product.singleProductPrice -= item.price;
      product.total -= product.quantity * item.price;
    } else {
      product.singleProductPrice += item.price;
      product.total += product.quantity * item.price;
    }

    extras[index].picked = !picked;

    this.setState({
      product
    });
  };

  onPressIncreaseAmount = () => {
    const { product, favorite } = this.state;

    if (product.quantity + 1 <= product.quantityMax) {

    product.quantity += 1;
    product.total = product.price * product.quantity;

    this.setState({
      product,
      favorite
    });}
    else {
      alert("nombre de part(s) maximum atteint");
    }
  };

  onPressDecreaseAmount = () => {
    const { product } = this.state;
    let { quantity } = product;

    if (quantity - 1 > 0) {

    quantity -= 1;
    product.quantity = quantity;

    const total = quantity * product.singleProductPrice;
    product.total = total;

    this.setState({
      product
    });}
    else {
      alert("Le nombre de part minimum est 1");
    }
  };

  render() {

    const { product, favorite } = this.state;
    const {
      price,
      description,
      quantity,
      total
    } = product;

    return (
      <Fragment>
        <SafeAreaView style={styles.screenContainer}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <ScrollView>
            <View style={styles.header}>
              <ImageBackground
                defaultSource={imgHolder}
                source={getImgSource(product.imageUri)}
                style={styles.productImg}
              >
                <GradientContainer
                  colors={[Colors.black, "transparent"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0.6 }}
                  containerStyle={styles.bottomOverlay}
                />
              </ImageBackground>

              <View style={[styles.topButton, styles.left]}>
                <TouchableItem onPress={this.goBack} borderless>
                  <View style={styles.buttonIconContainer}>
                    <Icon
                      name={CLOSE_ICON}
                      size={22}
                      color={Colors.secondaryText}
                    />
                  </View>
                </TouchableItem>
              </View>

              <View
                style={[
                  styles.topButton,
                  styles.right,
                  favorite && styles.favorite
                ]}
              >
                <TouchableItem onPress={this.onPressAddToFavorites} borderless>
                  <View style={styles.buttonIconContainer}>
                    <Icon
                      name={FAVORITE_ICON}
                      size={19}
                      color={favorite ? Colors.onSecondaryColor : Colors.secondaryText}
                    />
                  </View>
                </TouchableItem>
              </View>
            </View>

            <View style={styles.productDescription}>
              <View style={styles.productTitleContainer}>
                <Heading5 style={styles.productTitle}>{product.name}</Heading5>
                <Text style={styles.priceText}>
                  {`${(product.price).toFixed(2)} €`}
                </Text>
              </View>

              <SmallText style={styles.shortDescription}>
                {description}
              </SmallText>

              <Text>{"\n"}</Text>
              <Heading5 style={styles.productTitle}>Informations</Heading5>
              <Text>{"\n"}</Text>

              <Text>Nombre de parts disponibles: {product.quantityMax}</Text>
              <Text>Date d'expiration de commande: {product.expire.substring(8, 10)}/{product.expire.substring(5, 7)}/{product.expire.substring(0, 4)}</Text>
              <Text>Créé le: {product.createdDate.substring(8, 10)}/{product.createdDate.substring(5, 7)}/{product.createdDate.substring(0, 4)}</Text>

            </View>

          </ScrollView>

          <View style={styles.bottomButtonsContainer}>
            <View style={styles.amountContainer}>
              <View style={styles.amountButtonsContainer}>
                <TouchableItem onPress={this.onPressDecreaseAmount} borderless>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={MINUS_ICON}
                      size={20}
                      color={Colors.onPrimaryColor}
                    />
                  </View>
                </TouchableItem>

              <Text style={styles.quantity}>{this.state.product.quantity}</Text>

                <TouchableItem onPress={this.onPressIncreaseAmount} borderless>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={PLUS_ICON}
                      size={20}
                      color={Colors.onPrimaryColor}
                    />
                  </View>
                </TouchableItem>
              </View>
            </View>

            <Button
              onPress={this.addCart}
              title={`Ajouter au panier`}
              titleColor={Colors.onPrimaryColor}
              height={44}
              color={Colors.primaryColor}
              small
              rounded
            />
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.bottomArea} />
      </Fragment>
    );
  }
}
