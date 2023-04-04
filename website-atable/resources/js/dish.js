$( document ).ready(function() {
  var token = window.localStorage.getItem('BearerToken');
  var cooker_id = window.localStorage.getItem('cooker_id');
  $("#add_dish_button").click(function() {
    document.getElementById("add_dish_button").hidden = true;
    document.getElementById("loading").hidden = false;
    var img = document.getElementById("dish_image").files[0];
    if (!img)
      return;

    var reader = new FileReader();
    reader.onloadend = function () {
      let body = {
        'name': $("#dish_name").val(),
        'description': $("#dish_description").val(),
        'price': $("#euro").val(),
        'photo_path': 'apple.jpg',
        'photo_content': reader.result.replace(/^data:.+;base64,/, ''),
        'preparation_time': 5,
        'expiration_date': "2020-09-15 12:12:12",
        'cooker_id': cooker_id,
        'dish_category_id': "0"
      };

      $.ajax({
        url: $apiUrl + '/dish',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        type: 'POST',
        data: body,
        success: function(data) {
          swal("Bravo!", "Votre plât a été créé!", "success")
              .then((value) => {
                document.getElementById("add_dish_button").hidden = false;
                document.getElementById("loading").hidden = true;
                window.location = $webUrl + '/profil';
              });
          console.log("data: ", data);
        },
        error: function(e) {
          console.log("error", e);
          swal("Erreur", "Mauvais format (image trop lourde)", "warning")
              .then((value) => {
                document.getElementById("add_dish_button").hidden = false;
                document.getElementById("loading").hidden = true;
              });
        }
      });
    };
    reader.readAsDataURL(img);

  });
});
