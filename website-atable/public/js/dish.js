$(document).ready(function(){var e=window.localStorage.getItem("BearerToken"),t=window.localStorage.getItem("cooker_id");$("#add_dish_button").click(function(){document.getElementById("add_dish_button").hidden=!0,document.getElementById("loading").hidden=!1;var d=document.getElementById("dish_image").files[0];if(d){var o=new FileReader;o.onloadend=function(){let d={name:$("#dish_name").val(),description:$("#dish_description").val(),price:$("#euro").val(),photo_path:"apple.jpg",photo_content:o.result.replace(/^data:.+;base64,/,""),preparation_time:5,expiration_date:"2020-09-15 12:12:12",cooker_id:t,dish_category_id:"0"};$.ajax({url:$apiUrl+"/dish",headers:{Authorization:`Bearer ${e}`},type:"POST",data:d,success:function(e){swal("Bravo!","Votre plât a été créé!","success").then(e=>{document.getElementById("add_dish_button").hidden=!1,document.getElementById("loading").hidden=!0,window.location=$webUrl+"/profil"}),console.log("data: ",e)},error:function(e){console.log("error",e),swal("Erreur","Mauvais format (image trop lourde)","warning").then(e=>{document.getElementById("add_dish_button").hidden=!1,document.getElementById("loading").hidden=!0})}})},o.readAsDataURL(d)}})});
