var dish_list;
var token = window.localStorage.getItem('BearerToken');

function build_headder(res) {
  var delivery;
  var change;
  $.ajax({
    url: $apiUrl + '/cooker/' + window.localStorage.getItem('cooker_id'),
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    async: false,
    dataType: 'json', // added data type
    success: function(res) {
      if (res.delivery == 0)
      {
        delivery = "Takeaway";
        change = "Delivery";
      }
      else
      {
        delivery = "Delivery";
        change = "Takeaway";
      }
      console.log(res);
    },
  });
  console.log("HELLO");
  var email='<div class="col-md-3 d-flex"><div class="info bg-white p-4"><p><span>Email:<br></span> <a href="mailto:info@yoursite.com">' + res.email + '</a></p></div></div>';
  var date='<div class="col-md-3 d-flex"><div class="info bg-white p-4"><p><span>Date de naissance:</span> <a href="tel://1234567920"><br>' + res.date_of_birth + '</a></p><p><a id="bday-btn" class="btn btn-primary" style="color:white;">Modifier</a></p></div></div>';
  var phone='<div class="col-md-3 d-flex"><div class="info bg-white p-4"><p><span>Téléphone:</span> <a href="tel://1234567920"><br>' + res.phone + '</a></p><p><a id="phone-btn" class="btn btn-primary" style="color:white;">Modifier</a></p></div></div>';
  var website='<div class="col-md-3 d-flex"><div class="info bg-white p-4"><p><span>Delivery / Takeaway:<br></span> <a href="#">' + delivery + '</a></p><p><a id="delivery-btn" class="btn btn-primary" style="color:white;">Changer en ' + change + '</a></p></div></div>';
  var header='<div class="row d-flex mb-5 contact-info">' + email + date + phone + website + '<div class="w-100"></div></div>';
  $("#profil_info").html(header);

  $("#bday-btn").click(function() {
    swal("Quelle est votre date de naissance ? (yyyy-mm-dd)", {
      content: "input",
    })
    .then((value) => {
      if (value)
      {
          let body = {
            'date_of_birth': value
          };
          $.ajax({
            url: $apiUrl + '/user/' + window.localStorage.getItem('user_id'),
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            type: 'PUT',
            data: body,
            dataType: 'json', // added data type
            success: function(res) {
              console.log(res);
              swal("Succès!", "Vous êtes né le " + value , "success")
              .then(() => {
                document.location.reload(true);
              });
            },
            error: function(err) {
              console.log("toto: ", err);
              swal("Erreur!", "Mauvais format" , "warning")
              .then(() => {
              });
            }
        });
      }
    });
  });

  $("#phone-btn").click(function() {
    swal("Quelle est votre nuémro de téléphone ? (10 chiffres)", {
      content: "input",
    })
    .then((value) => {
      if (!(/^\d+$/.test(value)) || value.length != 10 || value[0] != "0")
      {
        console.log("test");
        swal("Erreur!", "Mauvais format", "warning")
        .then((value) => {
        });
      }
      else if (value)
      {
        swal("Succès!", "Votre numéro est le: " + value , "success")
        .then(() => {
          let body = {
            'phone': value
          };
          $.ajax({
            url: $apiUrl + '/user/' + window.localStorage.getItem('user_id'),
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            type: 'PUT',
            data: body,
            dataType: 'json', // added data type
            success: function(res) {
              console.log(res);
              document.location.reload(true);
            }
          });
        });
      }
    });
  });

  $("#delivery-btn").click(function() {
    $.ajax({
      url: $apiUrl + '/cooker/' + window.localStorage.getItem('cooker_id'),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        console.log(res);
        var new_delivery;
        if (res.delivery == 0)
        new_delivery = 1
        else
        new_delivery = 0;
        let body = {
          'delivery': new_delivery
        };
        $.ajax({
          url: $apiUrl + '/cooker/' + window.localStorage.getItem('cooker_id'),
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          type: 'PUT',
          data: body,
          dataType: 'json', // added data type
          success: function(res) {
            console.log(res);
            document.location.reload(true);
          }
        });
      }
    });
  });

}

function remove_product(clicked_id) {
  var token = window.localStorage.getItem('BearerToken');
  $.ajax({
    type: "DELETE",
    url: $apiUrl + '/dish/' + clicked_id,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    success: function(data) {
      swal("Bravo!", "Votre plât a été supprimé!", "success")
          .then((value) => {
            window.location = $webUrl + '/profil';
          });
    },
    error: function(e) {
      console.log(e);
    }
  });
}

function build_dishes(res, dish_list) {
  var dishes;
  for(var i=0; i < Object.keys(dish_list).length ; i++) {
    if (dish_list[i].cooker_id == res.cooker_id) {
      var photo_path='<a class="img-prod"><img class="img-fluid" src="images/' + dish_list[i].photo_path + '" alt="Colorlib Template"><div class="overlay"></div></a>';
      if (dish_list[i].photo_content)
          photo_path='<a class="img-prod"><img class="img-fluid" src="data:image/jpeg;base64,' + dish_list[i].photo_content + '" alt="Colorlib Template"><div class="overlay"></div></a>';
      var dish_name='<h3><a href="#">' + dish_list[i].name + '</a></h3>';
      var dish_price='<div class="d-flex"><div class="pricing"><p class="price"><span class="price-sale">' + dish_list[i].price + '€</span></p></div></div>';
      var menu_button='<a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center"><span><i class="ion-ios-menu"></i></span></a>';
      var cart_button='<a type=button id="' + dish_list[i].id + '" onclick="remove_product(this.id)" class="buy-now d-flex justify-content-center align-items-center mx-1"><span class="iconify" data-icon="akar-icons:cross" data-inline="false"></span></a>';
      var heart_button='<a href="#" class="heart d-flex justify-content-center align-items-center "><span><i class="ion-ios-heart"></i></span></a>';
      dishes= '<div class="col-md-6 col-lg-3"><div class="product">' + photo_path + '<div class="text py-3 pb-4 px-3 text-center">' + dish_name + dish_price + '<div class="bottom-area d-flex px-3"><div class="m-auto d-flex">' + menu_button + cart_button + heart_button + '</div></div></div></div>';
      $("#profil_dish").append(dishes);
    }
  }
}

function build_desc(res) {
  var name='<span class="subheading">' + res.first_name + ' ' + res.last_name + '</span>';
  var title='<h2 class="mb-4">Description du Cuisinier</h2>';
  var desc='<p>' + res.description + '</p>';
  var description='<div class="row justify-content-end"><div class="col-md-6 heading-section">' + name + title + desc + '</div></div>';
  $("#profil_desc").append(description);
}

$( document ).ready(function() {
  var user_token = window.localStorage.getItem('user_id');
  $.ajax({
    url: $apiUrl + '/user/' + user_token,
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
    var user = res;
      $.ajax({
        url: $apiUrl + '/dish',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
          console.log(res);
          build_headder(user);
          build_dishes(user, res);
          build_desc(user);
        }
      });
      console.log(res);
    }
  });

  $("#desc-btn").click(function() {
    swal("Tapez votre nouvelle description", {
      content: "input",
    })
    .then((value) => {
      if (value)
      {
        swal("Succès!", "Description modifié!", "success")
        .then(() => {
          let body = {
            'description': value
          };
          $.ajax({
            url: $apiUrl + '/user/' + window.localStorage.getItem('user_id'),
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            type: 'PUT',
            data: body,
            dataType: 'json', // added data type
            success: function(res) {
              console.log(res);
              document.location.reload(true);
            }
          });
        });
      }
    });
  });
  // $("#profil-btn").click(function() {
    // $.ajax({
    //   url: $apiUrl + '/user/current/' + $("#cooker_name").val(),
    //   headers: {
    //       'Authorization': `Bearer ${token}`,
    //   },
    //   type: 'GET',
    //   dataType: 'json', // added data type
    //   success: function(res) {
    //     console.log(res);
    //     build_headder(res);
    //     build_dishes(res, dish_list);
    //     build_desc(res);
    //   }
    // });
  // });
});
