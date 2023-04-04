$( document ).ready(function() {
  var qty = window.localStorage.getItem('command_qty');
  if (qty != null)
  $("#cart_icon").replaceWith(qty);
  else
  $("#cart_icon").replaceWith("0");
});
