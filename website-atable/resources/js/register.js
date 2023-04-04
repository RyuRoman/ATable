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

function put_customer() {
  var token = window.localStorage.getItem('BearerToken');
  let body = {
    'customer_id': window.localStorage.getItem('customer_id')
  };
  $.ajax({
    url: $apiUrl + '/user/' + window.localStorage.getItem('user_id'),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'PUT',
    data: body,
    dataType: 'json',
    success: function(res) {
      console.log(res);
      window.localStorage.removeItem('command_id');
      window.localStorage.removeItem('command_qty');
      swal("Bravo!", "Vous êtes inscrit!", "success")
      .then((value) => {
        window.location = $webUrl + '/choice';
      });
    }
  });
}

function post_customer()
{
  var token = window.localStorage.getItem('BearerToken');
  let body = {
    'user_id': window.localStorage.getItem('user_id')
  };
  $.ajax({
    url: $apiUrl + '/customer',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'POST',
    data: body,
    dataType: 'json',
    success: function(res) {
      window.localStorage.removeItem('customer_id');
      window.localStorage.setItem('customer_id', res.id);
      put_customer();
      console.log(res);
    }
  });
}

function put_cooker() {
  var token = window.localStorage.getItem('BearerToken');
  let body = {
    'cooker_id': window.localStorage.getItem('cooker_id')
  };
  $.ajax({
    url: $apiUrl + '/user/' + window.localStorage.getItem('user_id'),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'PUT',
    data: body,
    dataType: 'json',
    success: function(res) {
      console.log(res);
      post_customer();
    }
  });
}

function post_cooker() {
  var token = window.localStorage.getItem('BearerToken');
  let body = {
    'user_id': window.localStorage.getItem('user_id')
  };
  $.ajax({
    url: $apiUrl + '/cooker',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'POST',
    data: body,
    dataType: 'json',
    success: function(res) {
      window.localStorage.removeItem('cooker_id');
      window.localStorage.setItem('cooker_id', res.id);
      put_cooker()
    },
    error: function(e) {
        console.log(e);
    }
  });
}

function get_register(data)
{
  var br = data.bearerToken;
  console.log(br);
  if (br) {
    window.localStorage.removeItem('BearerToken');
    window.localStorage.setItem('BearerToken', br);
    var token = window.localStorage.getItem('BearerToken');
    $.ajax({
      url: $apiUrl + '/user/current/' + $("#auth-mail").val(),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        window.localStorage.removeItem('user_id');
        window.localStorage.setItem('user_id', res.id);
        post_cooker();
      }
    });
  }
}

function post_register() {
  let body = {
    'email': $("#auth-mail").val(),
    'password': $("#auth-password").val(),
    'password_confirmation': $("#auth-password-confirmation").val(),
    'first_name': $("#auth-first-name").val(),
    'last_name': $("#auth-last-name").val(),
  };
  $.ajax({
    type: "POST",
    url: $apiUrl + '/user/register',
    data: body,
    success: function(data) {
      get_register(data);
    },
    error: function(e) {
      alert(e.responseText)
      console.log(e);
    }
  });
}

$( document ).ready(function() {
  close_command();
    $("#register-btn").click(function() {
      post_register();
    });
});
