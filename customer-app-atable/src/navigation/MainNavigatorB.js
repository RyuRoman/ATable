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
import Onboarding from "../screens/onboarding/OnboardingB";

// import Welcome screen
import Welcome from "../screens/welcome/WelcomeB";

// import SignUp screen
import SignUp from "../screens/signup/SignUpB";

// import Verification screen
import Verification from "../screens/verification/VerificationB";

// import SignIn screen
import SignIn from "../screens/signin/SignInB";

// import Paypal screen
import Paypal from "../screens/paypal/PaypalB";

// import ForgotPassword
import ForgotPassword from "../screens/forgotpassword/ForgotPasswordB";

// import TermsConditions screen
import TermsConditions from "../screens/terms/TermsConditionsB";

// import HomeNavigator
import HomeNavigator from "./HomeNavigatorB";

// import Product screen
import Product from "../screens/product/ProductB";

// import Categories screen
import Category from "../screens/categories/CategoryB";
import Categories from "../screens/categories/CategoriesB";

// import Search results screen
import SearchResults from "../screens/search/SearchResultsB";

// import Checkout screen
import Checkout from "../screens/checkout/CheckoutB";

// import Payment screen
import PaymentMethod from "../screens/payment/PaymentMethodB";

// import EditPayment screen
import EditPaymentMethod from "../screens/payment/EditPaymentMethodB";

// import EditProfile screen
import EditProfile from "../screens/profile/EditProfileB";

// import DeliveryAddress screen
import DeliveryAddress from "../screens/address/DeliveryAddressB";

// import AddAddress screen
import AddAddress from "../screens/address/AddAddressB";

// import EditAddress screen
import EditAddress from "../screens/address/EditAddressB";

// import Orders screen
import Orders from "../screens/orders/OrdersB";

// import AboutUs screen
import AboutUs from "../screens/about/AboutUsB";

// import colors
import Colors from "../theme/colors";

// create MainNavigator
const MainNavigatorB = createStackNavigator(
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
        title: "Nouveau Compte",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
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
        title: "Se connecter",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },

    // ForgotPassword screen
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        title: "Mot de passe oublié",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },

    // TermsConditions screen
    TermsConditions: {
      screen: TermsConditions,
      navigationOptions: {
        title: "Termes et Conditions",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
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
        title: "Toutes les categories",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
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
          backgroundColor: Colors.primaryColor,
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
        title: "Resultats",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // Checkout screen
    Checkout: {
      screen: Checkout,
      navigationOptions: {
        title: "Paiement",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },

    // EditProfile screen
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: "Editer le profil",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 0,
          shadowOpacity: 0
        }
      }
    },

    // DeliveryAddress screen
    DeliveryAddress: {
      screen: DeliveryAddress,
      navigationOptions: {
        title: "Adresse de livraison",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // AddAddress screen
    AddAddress: {
      screen: AddAddress,
      navigationOptions: {
        title: "Ajouter une nouvelle adresse",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // EditAddress screen
    EditAddress: {
      screen: EditAddress,
      navigationOptions: { header: null }
    },

    // EditAddress screen
    Paypal: {
      screen: Paypal,
      navigationOptions: { header: null }
    },

    // PaymentMethod screen
    PaymentMethod: {
      screen: PaymentMethod,
      navigationOptions: {
        title: "Méthode de paiement",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // EditPaymentMethod screen
    EditPaymentMethod: {
      screen: EditPaymentMethod,
      navigationOptions: {
        title: "Editer ma carte",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // Orders screen
    Orders: {
      screen: Orders,
      navigationOptions: {
        title: "Mes commandes",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 1,
          shadowOpacity: 0
        }
      }
    },

    // AboutUs screen
    AboutUs: {
      screen: AboutUs,
      navigationOptions: {
        title: "A propos",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
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
      headerTintColor: Colors.onPrimaryColor
    }
  }
);

export default createAppContainer(MainNavigatorB);
