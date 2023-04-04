@extends('layouts.home')
@section('content')
<script src="js/dish.js"></script>
<section class="ftco-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-7 ftco-animate">
        <form action="#" class="billing-form">
          <h3 class="mb-4 billing-heading">Ajouter un plât à la vente</h3>
          <div class="row align-items-end">
            <div class="col-md-6">
              <div class="form-group">
                <label for="dish_name">Nom du plât</label>
                <input type="text" class="form-control" placeholder="" id="dish_name">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="dish_description">Description</label>
                <input type="text" class="form-control" placeholder="" id="dish_description">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="euro">Prix</label>
                <input type="number" id="euro" class="form-control" size="10">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="dish_image">Poster la photo</label>
                <input id="dish_image" class="form-control file" type="file">
              </div>
            </div>
          </div>
        </form>
        <div class="col-md-12">
          <center><a type=button id="add_dish_button" class="btn btn-primary">Ajouter le plat</a></center>
          <center><a id="loading" hidden>Chargement en cours ...</a></center>
        </div>
      </div>
    </div>
  </div>
</section>
@Stop
