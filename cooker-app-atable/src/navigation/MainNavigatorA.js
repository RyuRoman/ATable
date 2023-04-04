/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

// import Onboarding screen
import Onboarding from "../screens/onboarding/OnboardingA";

// import Welcome screen
import Welcome from "../screens/welcome/WelcomeA";

// import SignUp screen
import SignUp from "../screens/signup/SignUpA";

// import Verification screen
import Verification from "../screens/verification/VerificationA";

// import SignIn screen
import SignIn from "../screens/signin/SignInA";

// import ForgotPassword
// import ForgotPassword from "../screens/forgotpassword/ForgotPasswordA";

// import TermsConditions screen
import TermsConditions from "../screens/terms/TermsConditionsA";

// import HomeNavigator
import HomeNavigator from "./HomeNavigatorA";

// import Product screen
import Product from "../screens/product/ProductA";

// import Categories screen
import Category from "../screens/categories/CategoryA";
import Categories from "../screens/categories/CategoriesA";

// import Search results screen
import SearchResults from "../screens/search/SearchResultsA";

// import Checkout screen
import Checkout from "../screens/checkout/CheckoutA";

// import Payment screen
import PaymentMethod from "../screens/payment/PaymentMethodA";

// import EditProfile screen
import EditProfile from "../screens/profile/EditProfileB";

// import DeliveryAddress screen
import DeliveryAddress from "../screens/address/DeliveryAddressA";

// import AddAddress screen
import AddAddress from "../screens/address/AddAddressA";

// import EditAddress screen
import EditAddress from "../screens/address/EditAddressA";

// import Orders screen
import Orders from "../screens/orders/OrdersA";

// import AboutUs screen
import AboutUs from "../screens/about/AboutUsA";

// import colors
import Colors from "../theme/colors";

// create MainNavigator
const MainNavigatorA = createStackNavigator(
  {
    // Onboarding screen
    Onboarding: {
      screen: Onboarding,
      navigationOptions: { header: null }
    },

    // Welcome screen
    Welcome: {
      screen: Welcome,
      navigationOptions: { header: null }
    },

    // SignUp screen
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Inscription",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },

    // Verification screen
    Verification: {
      screen: Verification,
      navigationOptions: { header: null }
    },

    // SignIn screen
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: "Connexion",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },

    // ForgotPassword screen
    // ForgotPassword: {
    //   screen: ForgotPassword,
    //   navigationOptions: {
    //     title: "Forgot Password",
    //     headerStyle: {
    //       elevation: 0,
    //       shadowOpacity: 0
    //     }
    //   }
    // },

    // TermsConditions screen
    TermsConditions: {
      screen: TermsConditions,
      navigationOptions: {
        title: "Termes and Conditions",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // HomeNavigator
    HomeNavigator: {
      screen: HomeNavigator,
      navigationOptions: { header: null }
    },

    // Categories screen
    Categories: {
      screen: Categories,
      navigationOptions: {
        title: "All Categories",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },
    Category: {
      screen: Category,
      navigationOptions: {
        title: "Pizza",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // Product screen
    Product: {
      screen: Product,
      navigationOptions: { header: null }
    },

    // Search results screen
    SearchResults: {
      screen: SearchResults,
      navigationOptions: {
        title: "Search Results",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // Checkout screen
    Checkout: {
      screen: Checkout,
      navigationOptions: {
        title: "Checkout",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },

    // EditProfile screen
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: "Éditer mon profil",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // DeliveryAddress screen
    DeliveryAddress: {
      screen: DeliveryAddress,
      navigationOptions: {
        title: "Delivery Address",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // AddAddress screen
    AddAddress: {
      screen: AddAddress,
      navigationOptions: {
        title: "Add New Address",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },
    
    // EditAddress screen
    EditAddress: {
      screen: EditAddress,
      navigationOptions: {
        title: "Edit Address",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // PaymentMethod screen
    PaymentMethod: {
      screen: PaymentMethod,
      navigationOptions: {
        title: "Payment Method",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // Orders screen
    Orders: {
      screen: Orders,
      navigationOptions: {
        title: "My Orders",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // AboutUs screen
    AboutUs: {
      screen: AboutUs,
      navigationOptions: {
        title: "About Us",
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0
        }
      }
    }
  },
  {
    headerMode: "screen", // 'float' | 'none' | 'screen'
    headerLayoutPreset: "center",
    headerBackTitleVisible: "false",
    defaultNavigationOptions: {
      headerTintColor: Colors.black
    }
  }
);

export default createAppContainer(MainNavigatorA);
