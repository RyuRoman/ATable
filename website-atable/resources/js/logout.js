function close_command()
{
  var token = window.localStorage.getItem('BearerToken');
  let body = {
    'command_status_id': 1
  };
  $.ajax({
    url: $apiUrl + '/command/' + window.localStorage.getItem('command_id'),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'PUT',
    data: body,
    async: false,
    dataType: 'json', // added data type
    success: function(res) {
      window.localStorage.removeItem('command_id');
      window.localStorage.removeItem('command_qty');
      console.log(res);
    },
    error: function(e) {
        console.log(e);
    }
  });
}

function logout()
{
  swal("Bravo!", "Vous êtes déconnecté!", "success")
  .then((value) => {
    close_command();
    window.localStorage.clear();
    window.location = $webUrl + '/login'
  });
}

$( document ).ready(function() {
});
