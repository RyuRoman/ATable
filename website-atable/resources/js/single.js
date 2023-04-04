const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function show_cooker(res)
{
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/user/' + res.user_id,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      document.getElementById("cooker_name").innerText = res.first_name + " " + res.last_name;
      document.getElementById("cooker_desc").innerText = res.description;
      if (res.delivery == 0)
      document.getElementById("dish_delivery").innerText = "A emporter de chez notre cooker !";
      else
      document.getElementById("dish_delivery").innerText = "Livré par noter cooker !";
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function show_dish(res)
{
  var token = window.localStorage.getItem('BearerToken');
  if (res.photo_content)
      document.getElementById("dish_pic").src = "data:image/jpeg;base64," + res.photo_content;
  else
      document.getElementById("dish_pic").src = "images/" + res.photo_path;
  document.getElementById("dish_name").innerText = res.name;
  document.getElementById("dish_price").innerText = res.price + "€";
  document.getElementById("dish_desc").innerText = res.description;
  document.getElementById("dish_date").innerText = "Disponible jusqu'au " + res.expiration_date;
  // document.getElementById("dish_quantity").innerText = "Il reste " + res.quantity + " plats disponibles à la vente";
  $.ajax({
    url: $apiUrl + '/cooker/' + res.cooker_id,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      show_cooker(res);
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function add_cart_from_item()
{
  add_cart(id);
}

$( document ).ready(function() {
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    url: $apiUrl + '/dish/' + id,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      show_dish(res);
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  });
});
