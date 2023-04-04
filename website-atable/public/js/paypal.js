function open_paypal(res) {
  paypal.Buttons({
       createOrder: function(data, actions) {
         return actions.order.create({
           purchase_units: [{
             amount: {
               value: res.price
             }
           }]
         });
       },
       onApprove: function(data, actions) {
         swal("Bravo!", ", Paiement effectué !", "success")
             .then((value) => {
               window.location = $webUrl + '/profil';
             });
         return actions.order.capture().then(function(details) {
         });
       }
     }).render('#paypal-button-container');
}

function checkout(res) {
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/command/' + window.localStorage.getItem('command_id'),
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      open_paypal(res);
      console.log(res);
    }
  });
}

$( document ).ready(function() {
  checkout();
});
