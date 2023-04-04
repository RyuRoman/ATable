@extends('layouts.home')
@section('content')
<script src="js/my_current_orders.js"></script>
    <section class="ftco-section ftco-cart">
      <div class="row justify-content-center mb-5 pb-3">
        <div class="col-md-7 heading-section ftco-animate text-center">
          <span class="subheading">Mes commandes</span>
          <h2 class="mb">Mes commandes COOKER</h2>
          <p>Retrouvez ici toutes les informations pour vos commandes passées !</p>
          <a href="/my_past_orders" class="btn btn-primary py-3 px-4" style="margin-top: 100px;">Voir mes commandes CUSTOMER</a>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12 ftco-animate">
            <div class="cart-list">
              <table id="lignes" class="table">
                <thead class="thead-primary">
                  <tr class="text-center">
                    <th>&nbsp;</th>
                    <th>Plats</th>
                    <th>Date</th>
                    <th>Mode Retrait</th>
                    <th>Total</th>
                  </tr>
                </thead>
              </div>
              </table>
            </div>
          </div>
        </div>
		</section>
@Stop
