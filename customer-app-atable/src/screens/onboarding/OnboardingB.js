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
import GradientContainer from "../../components/gradientcontainer/GradientContainer";
import { Heading5, Paragraph } from "../../components/text/CustomText";
import TouchableItem from "../../components/TouchableItem";

// import colors
import Colors from "../../theme/colors";

// OnboardingB Config
const BUTTON_HEIGHT = 58; // pagination button height
const BUTTON_WIDTH = 92; // pagination button width

const slide1Img = require("../../assets/img/onboarding_1.png");
const slide2Img = require("../../assets/img/onboarding_2.png");
const slide3Img = require("../../assets/img/onboarding_3.png");
const slide4Img = require("../../assets/img/onboarding_4.png");

const slides = [
  {
    id: "slide2",
    img: slide2Img,
    title: "Choisissez votre repas",
    description: "Parcourez les différents plats disponilbles pour trouver votre bonheur !"
  },
  {
    id: "slide3",
    img: slide3Img,
    title: "Paiement facile et sécurisé",
    description: "Payer en toute sécurité avec votre carte bancaire ou Paypal !"
  },
  {
    id: "slide4",
    img: slide4Img,
    title: "Livraison à domicile",
    description: "Faites-vous livrer votre repas à votre domicile !"
  }
];

// OnboardingB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
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
  slideImgContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 224,
    height: 224,
    borderRadius: 112,
    backgroundColor: "#fff"
  },
  slideImg: {
    width: 176,
    height: 120,
    resizeMode: "cover"
  },
  title: {
    paddingTop: 24,
    color: Colors.atable,
    textAlign: "center"
  },
  descriptionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 23,
    color: Colors.black,
    textAlign: "center",
    opacity: 0.9
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255, 255, 255, 0.32)",
    height: BUTTON_HEIGHT,
    backgroundColor: Colors.secondaryGradientColor
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
    color: Colors.atable
  },
  dot: {
    margin: 4,
    width: 8,
    height: 8,
    borderRadius: 4
  },
  activeDot: {
    backgroundColor: Colors.atable
  },
  inactiveDot: {
    backgroundColor: Colors.black,
    opacity: 0.28
  }
});

// OnboardingB
export default class OnboardingB extends Component {
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
      <GradientContainer>
        <SafeAreaView style={styles.screenContainer}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
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
                  <View style={styles.slideImgContainer}>
                    <Image source={item.img} style={styles.slideImg} />
                  </View>
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
                      color={Colors.atable}
                    />
                    <Text style={styles.buttonText}>
                      {"retour".toUpperCase()}
                    </Text>
                  </View>
                </TouchableItem>
              ) : (
                <TouchableItem onPress={this.navigateTo("Welcome")}>
                  <View style={styles.actionButton}>
                    <Text style={styles.buttonText}>
                      {"passer".toUpperCase()}
                    </Text>
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
                    activeIndex === i ? styles.activeDot : styles.inactiveDot
                  ]}
                />
              ))}
            </View>

            <View style={styles.buttonContainer}>
              {activeIndex < slides.length - 1 ? (
                <TouchableItem onPress={this.nextSlide}>
                  <View style={[styles.row, styles.rightButton]}>
                    <Text style={styles.buttonText}>
                      {"suivant".toUpperCase()}
                    </Text>
                    <Icon
                      name="chevron-right"
                      size={24}
                      color={Colors.atable}
                    />
                  </View>
                </TouchableItem>
              ) : (
                <TouchableItem onPress={this.navigateTo("Welcome")}>
                  <View style={styles.actionButton}>
                    <Text style={styles.buttonText}>
                      {"ok".toUpperCase()}
                    </Text>
                  </View>
                </TouchableItem>
              )}
            </View>
          </View>
        </SafeAreaView>
      </GradientContainer>
    );
  }
}
