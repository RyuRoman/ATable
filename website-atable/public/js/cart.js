var res_g,total=0;function parse_dishes(e,a){var t='<tr class="text-center"><td class="product-remove"><a type=button id="'+e.id+'" onclick="remove_cart(this.id)"><span class="ion-ios-close"></span></a></td><td class="image-prod"><div class="img" style="background-image:url(images/'+e.photo_path+');"></div></td>';e.photo_content&&(t='<tr class="text-center"><td class="product-remove"><a type=button id="'+e.id+'" onclick="remove_cart(this.id)"><span class="ion-ios-close"></span></a></td><td class="image-prod"><div class="img" style="background-image:url(data:image/jpeg;base64,'+e.photo_content+');"></div></td>');var o='<td class="product-name"><h3>'+e.name+"</h3>",r="<p>"+e.description+"</p></td>",c='<td class="price">'+e.price+'</td> <td class="price">'+a+'</td><td class="total">'+e.price*a+"</td></tr>";$("#cart_list").append(t+o+r+c),console.log(e)}function build_cart(e){var a=window.localStorage.getItem("BearerToken");total_cart=0,$("#cart_list").empty();for(var t=0;t<Object.keys(e).length;t++)if(e[t].command_id==window.localStorage.getItem("command_id")){var o=e[t].quantity;$.ajax({url:$apiUrl+"/dish/"+e[t].dish_id,headers:{Authorization:`Bearer ${a}`},type:"GET",async:!1,dataType:"json",success:function(e){parse_dishes(e,o)}})}}function get_command_dish(){var e=window.localStorage.getItem("BearerToken");$.ajax({url:$apiUrl+"/command_dish",headers:{Authorization:`Bearer ${e}`},type:"GET",dataType:"json",success:function(e){console.log(e),res_g=e,build_cart(e)}})}function update_command(e){var a=window.localStorage.getItem("BearerToken");$.ajax({url:$apiUrl+"/command/"+window.localStorage.getItem("command_id"),headers:{Authorization:`Bearer ${a}`},type:"PUT",data:e,dataType:"json",success:function(e){swal("Succès!","Item supprimé du panier!","success").then(e=>{document.location.reload(!0)}),console.log(e)}})}function update_command_price(e,a){var t=window.localStorage.getItem("BearerToken"),o=0;$.ajax({url:$apiUrl+"/command/"+window.localStorage.getItem("command_id"),headers:{Authorization:`Bearer ${t}`},type:"GET",dataType:"json",success:function(t){o=t.price;let r={price:parseInt(o,10)-parseInt(e,10)*parseInt(a,10)};var c=window.localStorage.getItem("command_qty");window.localStorage.setItem("command_qty",parseInt(c,10)-parseInt(a,10));c=window.localStorage.getItem("command_qty");$("#cart_icon").replaceWith(c),update_command(r),console.log(t)},error:function(e){console.log(e)}})}function remove_item(e,a){for(var t=window.localStorage.getItem("BearerToken"),o=0;o<Object.keys(e).length;o++)if(e[o].dish_id==a&&e[o].command_id==window.localStorage.getItem("command_id")){var r=e[o].price,c=e[o].quantity;$.ajax({url:$apiUrl+"/command_dish/"+e[o].id,headers:{Authorization:`Bearer ${t}`},type:"DELETE",dataType:"json",success:function(e){update_command_price(r,c)}});break}}function remove_cart(e){var a=window.localStorage.getItem("BearerToken");$.ajax({url:$apiUrl+"/command_dish",headers:{Authorization:`Bearer ${a}`},type:"GET",dataType:"json",success:function(a){console.log(a),remove_item(a,e)}})}$(document).ready(function(){var e=window.localStorage.getItem("BearerToken");$.ajax({url:$apiUrl+"/command/"+window.localStorage.getItem("command_id"),headers:{Authorization:`Bearer ${e}`},type:"GET",dataType:"json",success:function(e){console.log(e),total=e.price,$("#total").replaceWith(e.price+"€"),$("#sous-total").replaceWith(e.price+"€"),get_command_dish()}})});