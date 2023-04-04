/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import node modules and types
import React from "react";
import { StyleSheet } from "react-native";
import type { StyleType } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { LinearGradient } from "expo-linear-gradient";

// import colors
import Colors from "../../theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

type Props = {
  colors: Array,
  start: { x: number, y: number }, // number in range [0, 1]
  end: { x: number, y: number }, // number in range [0, 1]
  children: any,
  containerStyle: StyleType
};

const GradientContainer = ({
  colors,
  start,
  end,
  containerStyle,
  children
}: Props) => (
  <LinearGradient
    start={start || { x: 0, y: 0 }}
    end={end || { x: 0, y: 1 }}
    colors={
      colors || [Colors.primaryGradientColor, Colors.secondaryGradientColor]
    }
    style={[styles.container, containerStyle]}
  >
    {children}
  </LinearGradient>
);

export default GradientContainer;
