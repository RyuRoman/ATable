/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from "react";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import type { ColorProp } from "react-native/Libraries/StyleSheet/ColorPropType";

// import components
import TabBadgeIcon from "../components/navigation/TabBadgeIcon";

// import Home screen
import Home from "../screens/home/HomeA";

// import Search screen
import Search from "../screens/search/SearchA";

// import Favorites screen
import Favorites from "../screens/favorites/FavoritesA";

// import Cart screen
import Cart from "../screens/cart/CartA";

// import Settings screen
import Settings from "../screens/settings/SettingsA";

// import colors
import Colors from "../theme/colors";

// HomeNavigator Config

type Props = {
  focused: string,
  horizontal: number,
  tintColor: ColorProp
};

// HomeNavigator
const HomeNavigator = createBottomTabNavigator(
  {
    Home,
    Search,
    Cart,
    Favorites,
    Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }: Props) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "history";
        } else if (routeName === "Search") {
          iconName = "cash-usd";
        } else if (routeName === "Favorites") {
          iconName = "format-list-bulleted";
        } else if (routeName === "Cart") {
          iconName = "plus-box";
        } else if (routeName === "Settings") {
          iconName = "settings";
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Icon name={iconName} size={horizontal ? 20 : 24} color={tintColor} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.primaryColor,
      inactiveTintColor: Colors.secondaryText,
      showLabel: false, // hide labels
      style: {
        backgroundColor: Colors.surface // TabBar background
      },
      keyboardHidesTabBar: true
    }
  }
);

export default HomeNavigator;
