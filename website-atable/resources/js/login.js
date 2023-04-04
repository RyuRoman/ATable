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

function update_local_storage(data)
{
    if (data.customer_id) {
        window.localStorage.removeItem('customer_id');
        window.localStorage.setItem('customer_id', data.customer_id);
    }
    if (data.cooker_id) {
        window.localStorage.removeItem('cooker_id');
        window.localStorage.setItem('cooker_id', data.cooker_id);
    }
    if (data.id) {
        window.localStorage.removeItem('user_id');
        window.localStorage.setItem('user_id', data.id);
    }
    swal("Bravo!", "Vous êtes connecté!", "success")
    .then((value) => {
      window.location = $webUrl + '/choice';
    });
}

function get_login(data)
{
  var br = data.bearerToken;
  if (br) {
      window.localStorage.removeItem('BearerToken');
      window.localStorage.setItem('BearerToken', br);
      $.ajax({
          type: "GET",
          url: $apiUrl + '/user/current/' + $("#auth-mail").val(),
          success: function(data) {
            update_local_storage(data);
          },
          error: function(e) {
              console.log(e);
          }
      });
  }
}

function post_login()
{
  let body = {
      'email': $("#auth-mail").val(),
      'password': $("#auth-password").val()
  };
  $.ajax({
      type: "POST",
      url: $apiUrl + '/user/login',
      data: body,
      success: function(data) {
        get_login(data);
      },
      error: function(e) {
        swal("Erreur!", "Mauvais login / mot de passe", "warning")
        .then((value) => {
          window.location = $webUrl + '/login';
        });
      }
  });
}

$( document ).ready(function() {
  close_command();
    $("#login-btn").click(function() {
      post_login();
    });
    $("#recover-btn").click(function() {
        let body = {
            'email': $("#recover-email").val(),
        };
        $.ajax({
            type: "POST",
            url: $apiUrl + '/password_reset/notify',
            data: body,
            success: function(data) {
                console.log(data);
                $("#recover-btn-box").attr("hidden", "hidden");
                $("#recover-sended-txt").removeAttr("hidden");
            },
            error: function(e) {
                console.log(e);
            }
        });
    });
    $("#reset-btn").click(function() {
        let body = {
            'token': $("#reset-token").val(),
            'password': $("#reset-password").val(),
            'password_confirmation': $("#reset-password-confirmation").val()
        };
        $.ajax({
            type: "POST",
            url: $apiUrl + '/password_reset/save',
            data: body,
            success: function(data) {
                console.log(data);
                window.location = $webUrl + '/landing';
            },
            error: function(e) {
                console.log(e);
            }
        });
    });
});
