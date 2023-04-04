import React from "react";
/*import { StyleSheet, View } from "react-native";
import Color from "color";
import { PayPalButton } from "react-paypal-button-v2";

// import components
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
  caption: {
    color: Color(Colors.white).alpha(0.8)
  },
  whiteText: {
    color: Colors.white
  }
});

// Button Props
type Props = {
  price: string
};

// Button
const PaypalMethod = ({
  price
}: Props) => (
  <View style={styles.container}>
    <Heading6>{price}</Heading6>
  </View>
);*/

/*import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_Ue2ATuQJBBcLHXlNmDyxIdvz00Vzhs1GcY');

const PaypalMethod = () => {
  return (
    <Elements stripe={stripePromise}>
    </Elements>
  );
};

export default PaypalMethod;*/