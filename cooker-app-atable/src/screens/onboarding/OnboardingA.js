/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import Swiper from "react-native-swiper";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

// import components
import { Heading5, Paragraph } from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

// OnboardingA Config
const BUTTON_HEIGHT = 58; // pagination button height
const BUTTON_WIDTH = 92; // pagination button width

const slide1Img = require("../../assets/img/2021_logo_atable.png");
const slide2Img = require("../../assets/img/sablier.png");
const slide3Img = require("../../assets/img/cuisto.png");
const slide4Img = require("../../assets/img/clock.png");

const slides = [
  {
    id: "slide1",
    img: slide1Img,
    title: "Envie de cuisiner ?",
    description:
      "Grace à A'Table préparez des plats pour vos voisins."
  },
  {
    id: "slide2",
    img: slide2Img,
    title: "Envie d'arrondir vos fins de mois ?",
    description: "Définissez vous-même vos tarifs et vos horaires de travail."
  },
  {
    id: "slide3",
    img: slide3Img,
    title: "Vous avez une ame de cuisinier ?",
    description: "Cette application est faite pour vous."
  },
  {
    id: "slide4",
    img: slide4Img,
    title: "Inscrivez-vous maintenant !",
    description: "Commencez à préparer vos plats dès aujourd'hui."
  }
];

// OnboardingA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  swiperContainer: {
    flex: 1
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24
  },
  slideImg: {
    borderRadius: 8,
    width: 232,
    height: 232,
    resizeMode: "cover"
  },
  title: {
    paddingTop: 24,
    color: Colors.primaryText,
    textAlign: "center"
  },
  descriptionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 23,
    color: Colors.secondaryText,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: BUTTON_HEIGHT,
    backgroundColor: Colors.background,
    elevation: 2
  },
  buttonContainer: {
    width: BUTTON_WIDTH
  },
  leftButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    paddingLeft: 10,
    paddingRight: 12
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    paddingLeft: 12,
    paddingRight: 10
  },
  actionButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 14,
    color: Colors.primaryColor
  },
  dot: {
    margin: 4,
    width: 8,
    height: 8,
    borderRadius: 4
  },
  bgDark: {
    backgroundColor: Colors.primaryColorDark
  },
  bgLight: {
    backgroundColor: Colors.primaryColorDark,
    opacity: 0.3
  }
});

export default class OnboardingA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  onIndexChanged = index => {
    this.setState({
      activeIndex: index
    });
  };

  previousSlide = () => {
    this.swiper.scrollBy(-1, true);
  };

  nextSlide = () => {
    this.swiper.scrollBy(1, true);
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            onIndexChanged={this.onIndexChanged}
            loop={false}
            showsPagination={false}
          >
            {slides.map(item => (
              <View key={item.id} style={styles.slide}>
                <Image source={item.img} style={styles.slideImg} />
                <Heading5 style={styles.title}>{item.title}</Heading5>
                <View style={styles.descriptionContainer}>
                  <Paragraph style={styles.descriptionText}>
                    {item.description}
                  </Paragraph>
                </View>
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.paginationContainer}>
          <View style={styles.buttonContainer}>
            {activeIndex > 0 ? (
              <TouchableItem onPress={this.previousSlide}>
                <View style={[styles.row, styles.leftButton]}>
                  <Icon
                    name="chevron-left"
                    size={24}
                    color={Colors.primaryColor}
                  />
                  <Text style={styles.buttonText}>{"Précédent".toUpperCase()}</Text>
                </View>
              </TouchableItem>
            ) : (
              <TouchableItem onPress={this.navigateTo("Welcome")}>
                <View style={styles.actionButton}>
                  <Text style={styles.buttonText}>{"Passer".toUpperCase()}</Text>
                </View>
              </TouchableItem>
            )}
          </View>

          <View style={styles.row}>
            {slides.map((item, i) => (
              <View
                key={`dot_${item.id}`}
                style={[
                  styles.dot,
                  activeIndex === i ? styles.bgDark : styles.bgLight
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            {activeIndex < slides.length - 1 ? (
              <TouchableItem onPress={this.nextSlide}>
                <View style={[styles.row, styles.rightButton]}>
                  <Text style={styles.buttonText}>{"Suivant".toUpperCase()}</Text>
                  <Icon
                    name="chevron-right"
                    size={24}
                    color={Colors.primaryColor}
                  />
                </View>
              </TouchableItem>
            ) : (
              <TouchableItem onPress={this.navigateTo("Welcome")}>
                <View style={styles.actionButton}>
                  <Text style={styles.buttonText}>{"Fait".toUpperCase()}</Text>
                </View>
              </TouchableItem>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
