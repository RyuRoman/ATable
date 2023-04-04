function redirect()
{
  swal("Rester sur le shop ou aller au panier ?", {
  buttons: {
    cancel: "Shop",
    catch: {
      text: "Panier",
      value: "panier",
    },
  },
})
.then((value) => {
  switch (value) {

    case "panier":
    window.location = $webUrl + '/cart';
      break;

    default:
    window.location = $webUrl + '/shop';
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
      console.log(res);
      redirect();
    }
  });
}

function put_command_price(res) {
  var total_price = 0;
  var dish_price = res.price;
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/command/' + window.localStorage.getItem('command_id'),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      total_price = res.price
      if (window.location.href.includes($webUrl + "/productsingle") == true)
      var quantity = parseInt(document.getElementById('quantity').value, 10);
      else
      var quantity = 1;
      let body = {
        'price': parseInt(dish_price, 10) * quantity + parseInt(total_price, 10)
      };
      var total_quantity = window.localStorage.getItem('command_qty');
      window.localStorage.setItem('command_qty', parseInt(total_quantity, 10) + parseInt(quantity, 10));
      var total_quantity = window.localStorage.getItem('command_qty');
      $("#cart_icon").replaceWith(total_quantity);
      update_command(body);
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function add_new_item(body)
{
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/command_dish',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'POST',
    data: body,
    dataType: 'json', // added data type
    success: function(res) {
      if (window.location.href.includes($webUrl + "/productsingle") == true)
      {
        let body = {
          'quantity': parseInt(document.getElementById('quantity').value, 10)
        };
        $.ajax({
          url: $apiUrl + '/command_dish/' + res.id,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          type: 'PUT',
          data: body,
          dataType: 'json', // added data type
          success: function(res) {
            console.log(res);
          },
          error: function(e) {
            console.log(e);
          }
        });
      }
      put_command_price(res);
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function update_quantity(res, dish)
{
  var token = window.localStorage.getItem('BearerToken');
  var check = false;
  for(var i=0; i < Object.keys(res).length ; i++) {
    if (res[i].dish_id == dish.dish_id && res[i].command_id == dish.command_id)
    {
      check = true;
      if (window.location.href.includes($webUrl + "/productsingle") == true)
      var quantity = parseInt(document.getElementById('quantity').value, 10);
      else
      var quantity = 1;
      let body = {
        'quantity': parseInt(res[i].quantity, 10) + quantity
      };
      $.ajax({
        url: $apiUrl + '/command_dish/' + res[i].id,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        type: 'PUT',
        data: body,
        dataType: 'json', // added data type
        success: function(res) {
          put_command_price(res);
          console.log(res);
        },
        error: function(e) {
          console.log(e);
        }
      });
    }
  }
  if (check == false)
  add_new_item(dish)
}

function add_dish_to_cart(body)
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
      update_quantity(res, body);
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function add_dish_to_command(clicked_id)
{
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/dish/' + clicked_id,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      let body = {
        'command_id': window.localStorage.getItem('command_id'),
        'dish_id' : clicked_id,
        'price' : res.price
      };
      add_dish_to_cart(body);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function create_command()
{
  var token = window.localStorage.getItem('BearerToken');
  window.localStorage.setItem('command_qty', 0);
  let body = {
    'customer_id': window.localStorage.getItem('customer_id'),
    'price': 0,
    'command_status_id': 0
  };
  $.ajax({
    url: $apiUrl + '/command',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'POST',
    data: body,
    async: false,
    dataType: 'json', // added data type
    success: function(res) {
      console.log(res);
      window.localStorage.removeItem('command_id');
      window.localStorage.setItem('command_id', res.id);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function create_and_add(clicked_id)
{
  create_command();
  add_dish_to_command(clicked_id);
}

function check_and_add(clicked_id, data)
{
  for(var i=0; i < Object.keys(data).length ; i++) {
    var checker = 0;
    if (data[i].customer_id == window.localStorage.getItem('customer_id') && data[i].command_status_id == 0) {
      window.localStorage.removeItem('command_id');
      window.localStorage.setItem('command_id', data[i].id);
      add_dish_to_command(clicked_id);
      checker = 1;
    }
  }
  if (checker == 0)
    create_and_add(clicked_id);
}

function add_cart(clicked_id) {
  var token = window.localStorage.getItem('BearerToken');
  let body = {
    'command_id': 1,
    'dish_id' : clicked_id
  };
  $.ajax({
    type: "GET",
    url: $apiUrl + '/command',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    success: function(data) {
      if (data.length == 0)
        create_and_add(clicked_id);
      check_and_add(clicked_id, data);
    },
    error: function(e) {
      console.log(e);
    }
  });
  swal("Hop!", "Item ajouté au panier!", "success");
}

function show_single(clicked_id) {
  window.location = $webUrl + '/productsingle?id=' + clicked_id;
}

function build_shop(res) {
  var contenu;
  $("#dish_list").empty();
  for(var i=0; i < Object.keys(res).length ; i++) {
      var photo_path='<a class="img-prod" id="' + res[i].id + '" onclick="show_single(this.id)"><img class="img-fluid" src="images/' + res[i].photo_path + '" alt="Colorlib Template"><div class="overlay"></div></a>';
      if (res[i].photo_content)
          photo_path='<a class="img-prod" id="' + res[i].id + '" onclick="show_single(this.id)"><img class="img-fluid" src="data:image/jpeg;base64,' + res[i].photo_content + '" alt="Colorlib Template"><div class="overlay"></div></a>';
      var name='<h3><a href="#">' + res[i].name + '</a></h3>';
      var price='<div class="d-flex"><div class="pricing"><p class="price"><span class="mr-2 price-dc"></span><span class="price-sale">' + res[i].price + '€</span></p></div></div>';
      var menu_button='<a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center"><span><i class="ion-ios-menu"></i></span></a>';
      var cart_button='<a type=button price="' + res[i].price + '" id="' + res[i].id + '" onclick="add_cart(this.id)" class="btn btn-primary"><span><i class="ion-ios-cart"></i></span></a>';
      var heart_button='<a href="#" class="heart d-flex justify-content-center align-items-center "><span><i class="ion-ios-heart"></i></span></a>';
      contenu='<div class="col-md-6 col-lg-3"><div class="product">' + photo_path + '<div class="text py-3 pb-4 px-3 text-center">' + name + price + '<div class="bottom-area d-flex px-3"><div class="m-auto d-flex">' + menu_button + cart_button + heart_button + '</div></div></div></div></div>';
      $("#dish_list").append(contenu);
  }
}

$( document ).ready(function() {
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/dish',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      build_shop(res);
    }
  });

  $("#search_shop").click(function() {
    $.ajax({
      url: $apiUrl + '/shop_search/' + $("#search_name").val(),
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        build_shop(res);
      }
    });
  });

  $("#cost_ascend").click(function() {
    $.ajax({
      url: $apiUrl + '/cost_ascend',
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        build_shop(res);
      }
    });
  });

  $("#cost_descend").click(function() {
    $.ajax({
      url: $apiUrl + '/cost_descend',
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        build_shop(res);
      }
    });
  });

  $("#name_ascend").click(function() {
    $.ajax({
      type: 'GET',
      url: $apiUrl + '/name_ascend',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        build_shop(res);
      }
    });
  });

  $("#name_descend").click(function() {
    $.ajax({
      url: $apiUrl + '/name_descend',
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        build_shop(res);
      }
    });
  });

  $("#time_ascend").click(function() {
    $.ajax({
      url: $apiUrl + '/time_ascend',
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        build_shop(res);
      }
    });
  });

  $("#time_descend").click(function() {
    $.ajax({
      url: $apiUrl + '/time_descend',
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        build_shop(res);
      }
    });
  });

  $("#stock_ascend").click(function() {
    $.ajax({
      url: $apiUrl + '/stock_ascend',
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        build_shop(res);
      }
    });
  });

  $("#stock_descend").click(function() {
    $.ajax({
      url: $apiUrl + '/stock_descend',
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        build_shop(res);
      }
    });
  });
});

//
// function first_dish()
// {
//   $.ajax({
//     url: $apiUrl + '/command_dish',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//     type: 'POST',
//     data: body,
//     dataType: 'json', // added data type
//     success: function(res) {
//       put_command_price(res);
//       console.log(res);
//     },
//     error: function(e) {
//       console.log(e);
//     }
//   });
// }
