@extends('layouts.home')
@section('content')

<script src="js/profil.js"></script>
<section class="ftco-section ">
  <!-- <div class="container">
    <div class="row justify-content-center mb-3 pb-3">
      <div class="col-md-12 heading-section text-center ftco-animate">
        <h2 class="mb-4">Rechercher un Cooker :</h2>
        <p><center><input type=text id="search_name"> </center></p>
        <div class="form-group">
    <type=button id= "profil-btn" class="btn btn-primary py-3 px-5s"> Rechecher
  </div>
      </div>
    </div>
  </div> -->



  <div class="container" id="profil_info">
  </div>

  <section class="ftco-section">
    <div class="container">
      <div class="row justify-content-center mb-3 pb-3">
        <div class="col-md-12 heading-section text-center ftco-animate">
          <h2 class="mb-4">Mes plâts</h2>
          <span class="subheading">Retrouvez ici tous les plât que vous avez réalisé depuis que vous êtes devenu Cooker chez A'Table !</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" id="profil_dish">
      </div>
    </div>
    <center>
      <a href="/my_current_orders" class="btn btn-primary py-3 px-4" style="margin: 10%,10%;">Mes commandes COOKER</a>
      <a href="/add_dish" class="btn btn-primary py-3 px-4" style="margin: 10%,10%;">Ajouter un plat à la vente</a>
      <a href="/my_past_orders" class="btn btn-primary py-3 px-4" style="margin: 10%,10%;">Mes commandes CUSTOMER</a>
    </center>
    <center>
    </center>
  </section>

  <section class="ftco-section img" style="background-image: url(images/bg_3.jpg);">
    <div class="container" id="profil_desc">
    </div>
  </section>
  <p style="padding-top: 10px;">
    <center><a href="#" id="desc-btn" class="btn btn-primary py-3 px-4">Modifier la description</a></center>
    <section class="ftco-section testimony-section">
      <div class="container">
        <div class="row justify-content-center mb-5 pb-3">
          <div class="col-md-7 heading-section ftco-animate text-center">
            <h2 class="mb-4">Commentaires d'heureux clients</h2>
            <span class="subheading">Que pensent nos customers de vos plâts ?</span>
          </div>
        </div>
        <div class="row ftco-animate">
          <div class="col-md-12">
            <div class="carousel-testimony owl-carousel">
              <div class="item">
                <div class="testimony-wrap p-4 pb-5">
                  <div class="user-img mb-5" style="background-image: url(images/person_1.jpg)">
                    <span class="quote d-flex align-items-center justify-content-center">
                      <i class="icon-quote-left"></i>
                    </span>
                  </div>
                  <div class="text text-center">
                    <p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <p class="name">Garreth Smith</p>
                    <span class="position">Marketing Manager</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap p-4 pb-5">
                  <div class="user-img mb-5" style="background-image: url(images/person_2.jpg)">
                    <span class="quote d-flex align-items-center justify-content-center">
                      <i class="icon-quote-left"></i>
                    </span>
                  </div>
                  <div class="text text-center">
                    <p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <p class="name">Garreth Smith</p>
                    <span class="position">Interface Designer</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap p-4 pb-5">
                  <div class="user-img mb-5" style="background-image: url(images/person_3.jpg)">
                    <span class="quote d-flex align-items-center justify-content-center">
                      <i class="icon-quote-left"></i>
                    </span>
                  </div>
                  <div class="text text-center">
                    <p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <p class="name">Garreth Smith</p>
                    <span class="position">UI Designer</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap p-4 pb-5">
                  <div class="user-img mb-5" style="background-image: url(images/person_4.jpg)">
                    <span class="quote d-flex align-items-center justify-content-center">
                      <i class="icon-quote-left"></i>
                    </span>
                  </div>
                  <div class="text text-center">
                    <p class="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <p class="name">Garreth Smith</p>
                    <span class="position">Web Developer</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <hr>
    @Stop
    </html>
