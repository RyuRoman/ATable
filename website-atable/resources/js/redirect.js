$( document ).ready(function() {
  if (window.location.href.includes($webUrl + "/dodo") != true)
  {
    var token = window.localStorage.getItem("BearerToken");
    $.ajax({
      url: $apiUrl + '/user/current',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      type: 'GET',
      async: false,
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
      },
      error: function(e) {
        console.log(e);
        swal("Erreur!", "Merci de vous connecter pour accéder à A'Table !", "warning")
        .then((value) => {
          window.location = $webUrl + '/login';
        });
      }
    });
  }
});
