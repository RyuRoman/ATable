import React from "react";
import { StyleSheet, View } from "react-native";
import Color from "color";
import { FontAwesome as FAIcon } from "@expo/vector-icons";
import type { ColorProp } from "react-native/Libraries/StyleSheet/ColorPropType";

// import components
import GradientContainer from "../gradientcontainer/GradientContainer";
import { Caption, Heading6 } from "../text/CustomText";

// import colors, layout
import Colors from "../../theme/colors";

// CreditCard Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
    height: 228
  },
  creditCard: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  cardNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    maxWidth: 286
  },
  caption: {
    color: Color(Colors.white).alpha(0.8)
  },
  whiteText: {
    color: Colors.white
  }
});

// Button Props
type Props = {
  colors: [ColorProp, ColorProp],
  brand: "visa" | "mastercard" | "discover" | "amex",
  last4Digits: number,
  cardHolder: string,
  expiry: string,
  price: number
};

// Button
const CreditCard = ({
  colors,
  brand,
  last4Digits,
  cardHolder,
  expiry,
  price
}: Props) => (
  <View style={styles.container}>
    <Heading6>{price}</Heading6>
  </View>
);

export default CreditCard;
