@extends('layouts.home')
@section('content')
<script src="js/shop.js"></script>
<section class="ftco-section">

  <div class="container">
    <div class="row justify-content-center mb-3 pb-3">
      <div class="col-md-12 heading-section text-center ftco-animate">
        <div class="form-group">
          <h2 class="mb-4">Rechercher un produit :</h2>
          <p><center><input type=text id="search_name"> </center></p>
          <!-- <input type="text" class="form-control" placeholder="Recherche..." style="width: 15%;"> -->
        </div>      <div class="form-group">
          <type=button id= "search_shop" class="btn btn-primary py-3 px-5s"> Rechecher
        </div>
        <!-- <p>Restez healthy avec A'Table</p> -->
      </div>
    </div>
  </div>

  <center>
    <form action="#" class="bg-white p-5 contact-form">

    </form>
  </center>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10 mb-5 text-center">
        <ul class="product-category">
          <!-- <p><center><type=button id="profil-btn" class="btn btn-primary">Profil</a></center></p> -->
          <li><type=button id="cost_ascend" style="  margin : 5% auto" class="btn btn-primary">Les moins chers</a></li>
          <li><type=button id ="cost_descend" style="  margin : 5% auto" class="btn btn-primary">Les plus chers</a></li>
          <li><type=button id ="name_ascend" style="  margin : 5% auto" class="btn btn-primary">De A à Z</a></li>
          <li><type=button id ="name_descend" style="  margin : 5% auto" class="btn btn-primary">De Z à A</a></li>
          <li><type=button id ="time_ascend" style="  margin : 5% auto" class="btn btn-primary">Pour les gens pressés</a></li>
          <li><type=button id ="time_descend" style="  margin : 5% auto" class="btn btn-primary">Pour ceux qui ont le temps</a></li>
          <li><type=button id ="stock_ascend" style="  margin : 5% auto" class="btn btn-primary">Plats bientôt plus disponibles</a></li>
          <li><type=button id ="stock_descend" style="  margin : 5% auto" class="btn btn-primary">Les plus récents</a></li>
        </ul>
      </div>
    </div>
    <div class="row" id="dish_list">
    </div>
    <div class="row mt-5">
      <div class="col text-center">
        <div class="block-27">
          <ul>
            <li><a href="#">&lt;</a></li>
            <li class="active"><span>1</span></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">&gt;</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
@Stop
