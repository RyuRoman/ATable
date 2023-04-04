function get_cooker_name(cooker, count) {
    var token = window.localStorage.getItem('BearerToken');
    var cooker_name;
    var cooker_index = '#cookers' + count;
    $.ajax({
        url: $apiUrl + '/user/' + cooker.user_id,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
            cooker_name = '<li>' + res.first_name + ' ' + res.last_name + ' : ' + res.email + '</li>';
            $(cooker_index).append(cooker_name);
        }
    });
}

function get_cooker_tab(dish, count) {
    var token = window.localStorage.getItem('BearerToken');
    $.ajax({
        url: $apiUrl + '/cooker/' + dish.cooker_id,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
            get_cooker_name(res, count);
        }
    });

}

function get_command_dish(command_dish, command_id, command_body, count) {
    var token = window.localStorage.getItem('BearerToken');

    for (var i = 0; i < Object.keys(command_dish).length; i++) {
        if (command_dish[i].command_id == command_id) {
            var dish_index = '#dishes' + count;
            var dish_name;

            $.ajax({
                url: $apiUrl + '/dish/' + command_dish[i].dish_id,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                type: 'GET',
                async: false,
                dataType: 'json',
                success: function(res) {
                    dish_name = '<li>' + res.name + '</li>';
                    $(dish_index).append(dish_name);
                    get_cooker_tab(res, count);
                }
            });
        }
    }
}

function parse_command_tab(command_tab) {
    var count = 0;
    var token = window.localStorage.getItem('BearerToken');
    var command_dish_tab;
    $.ajax({
        url: $apiUrl + '/command_dish',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
          command_dish_tab = res;
          console.log(res);
        }
    });
    for (var i = 0; i < Object.keys(command_tab).length; i++) {
        if (command_tab[i].customer_id == window.localStorage.getItem('customer_id')) {
            var command_body = '<tbody><tr class="text-center"><td class="total"><ul id="cookers' + count + '"></ul></td><td><ul id="dishes' + count + '"></ul></td>';
            var footer_body = '<td id="footer" class="quantity"><h>' + command_tab[i].created_at + '</h></td><td>Livraison</td><td class="total"> ' +
                command_tab[i].price + ' €</td></tr></tbody>';
            command_body = command_body + footer_body;
            $("#lignes").append(command_body);
            get_command_dish(command_dish_tab, command_tab[i].id, command_body, count);
            count += 1;
        }
    }
}

$(document).ready(function() {
    var token = window.localStorage.getItem('BearerToken');
    $.ajax({
        url: $apiUrl + '/command',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
            parse_command_tab(res);
        }
    });
});
