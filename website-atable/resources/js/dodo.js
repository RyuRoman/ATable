$( document ).ready(function() {
  const price = window.location.search.substring(1);
  paypal.Buttons({
       createOrder: function(data, actions) {
         return actions.order.create({
           purchase_units: [{
             amount: {
               value: price
             }
           }]
         });
       },
       onApprove: function(data, actions) {
         return actions.order.capture().then(function(details) {
         });
       }
     }).render('#paypal-button-container');
});
