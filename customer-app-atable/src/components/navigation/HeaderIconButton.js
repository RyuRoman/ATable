import React from "react";
import { Platform, StyleSheet, View } from "react-native";

// import components
import Icon from "../icon/Icon";
import TouchableItem from "../TouchableItem";

// HeaderIconButton Styles
const styles = StyleSheet.create({
  androidButtonWrapper: {
    marginHorizontal: 13,
    backgroundColor: "transparent"
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  icon:
    Platform.OS === "ios"
      ? {
          height: 24,
          width: 24,
          marginRight: 14,
          marginVertical: 10,
          justifyContent: "center",
          alignItems: "center"
        }
      : {
          height: 24,
          width: 24,
          margin: 3,
          justifyContent: "center",
          alignItems: "center"
        }
});

const renderIcon = (name, size, color) => (
  <View style={styles.icon}>
    <Icon name={name} size={size} color={color} />
  </View>
);

// HeaderIconButton
/**
    <HeaderIconButton
      onPress={() => null}
      rippleColor="rgba(0, 0, 0, 0.32)"
      name="ios-videocam"
      size={22}
      color="#037aff"
    />
 */
const HeaderIconButton = props => {
  const {
    onPress = () => null,
    rippleColor = "rgba(0, 0, 0, 0.32)",
    name,
    size = 24,
    color = Platform.OS === "android" ? "rgba(0, 0, 0, 0.52)" : "#037aff"
  } = props;

  const button = (
    <TouchableItem
      accessibilityComponentType="button"
      accessibilityTraits="button"
      delayPressIn={0}
      onPress={onPress}
      rippleColor={rippleColor}
      style={styles.container}
      borderless
    >
      {renderIcon(name, size, color)}
    </TouchableItem>
  );

  if (Platform.OS === "android") {
    return <View style={styles.androidButtonWrapper}>{button}</View>;
  }
  return button;
};

export default HeaderIconButton;
