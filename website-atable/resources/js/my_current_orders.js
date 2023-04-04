function get_dish_infos(command_dish, dish) {
    var command_id = 0;
    var dish_name = 0;
    var dish_date = 0;
    var dish_price = 0;
    var command = 0;
    var customer = 0;
    var user = 0;

    var token = window.localStorage.getItem('BearerToken');

    $.ajax({
    url: $apiUrl + '/command/' + command_dish.command_id,
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function(res) {
        command = res;
    }
});
    $.ajax({
    url: $apiUrl + '/customer/' + command.customer_id,
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function(res) {
        customer = res;
    }
});
$.ajax({
url: $apiUrl + '/user/' + customer.user_id,
headers: {
    'Authorization': `Bearer ${token}`,
},
type: 'GET',
async: false,
dataType: 'json',
success: function(res) {
    user = res;
}
});

    photo_path = '<tbody><tr class="text-center"><td id ="command_id" class="image-prod"><div class="img" style="background-image:url(images/' + dish.photo_path + ')"></div>';
    if (dish.photo_content)
    photo_path = '<tbody><tr class="text-center"><td id ="command_id" class="image-prod"><div class="img" style="background-image:url(data:image/jpeg;base64,' + dish.photo_content + ')"></div>';
    command_id = '<h>commande n°' + command_dish.command_id + ' : ' + '<h> ' + user.email ;
    dish_date = '</ul></td><td id="footer" class="quantity"><h>' + command_dish.created_at;
    dish_price = '</h></h></td><td>Livraison</td><td class="total"> ' + command_dish.price + ' €</td></tr></tbody>';
    dish_name = '</h></td><td><ul id="dish"><li>' + dish.name;


    $(lignes).append(photo_path + command_id + dish_name + dish_date + dish_price);
}

function get_command_dish(command_dish_tab, token) {
    var dish_tab;
    $.ajax({
        url: $apiUrl + '/dish',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
            dish_tab = res;
        }
    });
    for (var i = 0; i < Object.keys(command_dish_tab).length; i++) {
        for (var j = 0; j < Object.keys(dish_tab).length; j++) {
            if (command_dish_tab[i].dish_id == dish_tab[j].id && dish_tab[j].cooker_id == window.localStorage.getItem('cooker_id')) {
                get_dish_infos(command_dish_tab[i], dish_tab[j]);
            }

        }
    }
}

$(document).ready(function() {
    var token = window.localStorage.getItem('BearerToken');
    $.ajax({
        url: $apiUrl + '/command_dish',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
            console.log(res);
            get_command_dish(res, token);
        }
    });
});
