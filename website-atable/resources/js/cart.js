var res_g;
var total = 0;

function parse_dishes(res, quantity)
{
  var photo_path='<tr class="text-center"><td class="product-remove"><a type=button id="' + res.id + '" onclick="remove_cart(this.id)"><span class="ion-ios-close"></span></a></td><td class="image-prod"><div class="img" style="background-image:url(images/' + res.photo_path + ');"></div></td>';
  if (res.photo_content)
    photo_path='<tr class="text-center"><td class="product-remove"><a type=button id="' + res.id + '" onclick="remove_cart(this.id)"><span class="ion-ios-close"></span></a></td><td class="image-prod"><div class="img" style="background-image:url(data:image/jpeg;base64,' + res.photo_content + ');"></div></td>';
  var name='<td class="product-name"><h3>' + res.name + '</h3>';
  var desc='<p>' + res.description + '</p></td>';
  var price='<td class="price">' + res.price + '</td> <td class="price">' + quantity + '</td><td class="total">' + res.price * quantity + '</td></tr>';
  $("#cart_list").append(photo_path + name + desc + price);
  console.log(res);
}

function build_cart(res) {
  var token = window.localStorage.getItem('BearerToken');
  var contenu;
  total_cart = 0;
  $("#cart_list").empty();
  for(var i=0; i < Object.keys(res).length ; i++) {
    if(res[i].command_id == window.localStorage.getItem('command_id')) {
      var quantity = res[i].quantity;
      $.ajax({
        url: $apiUrl + '/dish/' + res[i].dish_id,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        async: false,
        dataType: 'json', // added data type
        success: function(res) {
          parse_dishes(res, quantity);
        }
      });
    }
  }
}

// function add() {
//   quantity += 1;
//   build_cart(res_g);
// };
//
// function remove() {
//   quantity -= 1;
//   build_cart(res_g);
// };

function get_command_dish() {
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/command_dish',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      console.log(res);
      res_g = res;
      build_cart(res);
    }
  });
}

function update_command(body)
{
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/command/' + window.localStorage.getItem('command_id'),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'PUT',
    data: body,
    dataType: 'json',
    success: function(res) {
      swal("Succès!", "Item supprimé du panier!", "success")
      .then((value) => {
        document.location.reload(true);
      });
      console.log(res);
    }
  });
}

function update_command_price(dish_price, quantity)
{
  var token = window.localStorage.getItem('BearerToken');
  var total_price = 0;
  $.ajax({
    url: $apiUrl + '/command/' + window.localStorage.getItem('command_id'),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      total_price = res.price;
      let body = {
        'price': parseInt(total_price, 10) - parseInt(dish_price, 10) * parseInt(quantity, 10)
      };
      var total_quantity = window.localStorage.getItem('command_qty');
      window.localStorage.setItem('command_qty', parseInt(total_quantity, 10) - parseInt(quantity, 10));
      var total_quantity = window.localStorage.getItem('command_qty');
      $("#cart_icon").replaceWith(total_quantity);
      update_command(body)
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function remove_item(res, clicked_id) {
  var token = window.localStorage.getItem('BearerToken');
  for(var i=0; i < Object.keys(res).length ; i++) {
    if(res[i].dish_id == clicked_id && res[i].command_id == window.localStorage.getItem('command_id')) {
      var dish_price = res[i].price;
      var quantity = res[i].quantity;
      $.ajax({
        url: $apiUrl + '/command_dish/' + res[i].id,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'DELETE',
        dataType: 'json', // added data type
        success: function(res) {
          update_command_price(dish_price, quantity);
        }
      });
      break;
    }
  }
}

function remove_cart(clicked_id)
{
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/command_dish',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      console.log(res);
      remove_item(res, clicked_id);
    }
  });
}

$( document ).ready(function() {
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/command/' + window.localStorage.getItem('command_id'),
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      console.log(res);
      total = res.price;
      $("#total").replaceWith(res.price + '€');
      $("#sous-total").replaceWith(res.price + '€');
      get_command_dish();
    }
  });
});
