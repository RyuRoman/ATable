@extends('layouts.home')
@section('content')

<div>


<!-- Region : $query['region']
Ville : $query['city']
Organisation : $query['org']
Identifiant AS : $query['as']
Longitude : $query['lon']
Lattitude : $query['lat']
ISP : $query['isp']
ZIP : $query['zip']
Timezone : $query['timezone']
Pays : $query['country']
Code du pays : $query['countryCode']
Nom de la region : $query['regionName'] -->



<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSsKUzYG_Wz7u2qL6unHqfBOmvaZ0H1Mg&callback=myMap"></script>

</div>

<section class="ftco-section">
  <div class="container">
    <div class="row justify-content-center mb-3 pb-3">
      <div class="col-md-12 heading-section text-center ftco-animate">
        <h2 class="mb-4">Nos Engagements</h2>
        <span class="subheading">Apprêtez-vous à commander de bon petits plâts de nos cuisiniers ! Ou lancez vous en tant que Cooker dans l'aventure A'Table !</span>
        <!-- <p>Restez healthy avec A'Table</p> -->
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row no-gutters ftco-services">
      <div class="col-md-3 text-center d-flex align-self-stretch ftco-animate">
        <div class="media block-6 services mb-md-0 mb-4">
          <div class="icon bg-color-1 active d-flex justify-content-center align-items-center mb-2">
            <span class="flaticon-shipped"></span>
          </div>
          <div class="media-body">
            <h3 class="heading">Livraison</h3>
            <span style="text-transform: none">Livré à la maison ou à emporter chez le cuisinier</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 text-center d-flex align-self-stretch ftco-animate">
        <div class="media block-6 services mb-md-0 mb-4">
          <div class="icon bg-color-2 d-flex justify-content-center align-items-center mb-2">
            <span class="flaticon-diet"></span>
          </div>
          <div class="media-body">
            <h3 class="heading">Fraîcheur</h3>
            <span style="text-transform: none">Tous nos plâts sont préparés le jour même</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 text-center d-flex align-self-stretch ftco-animate">
        <div class="media block-6 services mb-md-0 mb-4">
          <div class="icon bg-color-3 d-flex justify-content-center align-items-center mb-2">
            <span class="flaticon-award"></span>
          </div>
          <div class="media-body">
            <h3 class="heading">Qualité</h3>
            <span style="text-transform: none">Nos Cookers utilisent des produits de qualité</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 text-center d-flex align-self-stretch ftco-animate">
        <div class="media block-6 services mb-md-0 mb-4">
          <div class="icon bg-color-4 d-flex justify-content-center align-items-center mb-2">
            <span class="flaticon-customer-service"></span>
          </div>
          <div class="media-body">
            <h3 class="heading">Support</h3>
            <span style="text-transform: none">L'équipe A'Tabke est à l'écoute 7j/24h</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="ftco-section ftco-category ftco-no-pt">
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6 order-md-last align-items-stretch d-flex">
            <div class="category-wrap-2 ftco-animate img align-self-stretch d-flex" style="width: 1300px; background-image: url(images/category.jpg);">
              <div class="text text-center">
                <h2>A'Table</h2>
                <p>De la cuisine maison, préparée à la maison, et livrée à la maison. Plongez dans le shop A'Table pour découvrir les plâts de nos Cookers ou postez vos propre plat directement dans le shop !</p>
                <p><a href="#" class="btn btn-primary">Visiter le Shop</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="category-wrap ftco-animate img mb-4 d-flex align-items-end" style="background-image: url(images/image_3.jpg);">
              <div class="text px-3 py-1">
                <h2 class="mb-0"><a href="#">Nos Cookers</a></h2>
              </div>
            </div>
            <div class="category-wrap ftco-animate img d-flex align-items-end" style="background-image: url(images/image_5.jpg);">
              <div class="text px-3 py-1">
                <h2 class="mb-0"><a href="#">Mangez sain !</a></h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="category-wrap ftco-animate img mb-4 d-flex align-items-end" style="background-image: url(images/image_1.jpg);">
          <div class="text px-3 py-1">
            <h2 class="mb-0"><a href="#">Faites vous plaisir !</a></h2>
          </div>
        </div>
        <div class="category-wrap ftco-animate img d-flex align-items-end" style="background-image: url(images/person_1.jpg);">
          <div class="text px-3 py-1">
            <h2 class="mb-0"><a href="#">Nos Customers</a></h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="ftco-section">
  <div class="container">
    <div class="row justify-content-center mb-3 pb-3">
      <div class="col-md-12 heading-section text-center ftco-animate">
        <h2 class="mb-4">Nos Produits</h2>
        <span class="subheading">Découvrez une grande séléction de nos produits phares A'Table</span>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-lg-3 ftco-animate">
        <div class="product">
          <a href="#" class="img-prod"><img class="img-fluid" src="images/product-1.jpg" alt="Colorlib Template">
            <span class="status">30%</span>
            <div class="overlay"></div>
          </a>
          <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">Poivrons</a></h3>
            <div class="d-flex">
              <div class="pricing">
                <p class="price"><span class="mr-2 price-dc">120.00€</span><span class="price-sale">80.00€</span></p>
                <p>Préparé par Murielle</p>
              </div>
            </div>
            <!-- <div class="d-flex">
              <div class="pricing">
                <p class="price" style="color=black;"><span>Préparé par :</span><span class="price-sale">Murielle</span></p>
              </div>
            </div> -->
            <div class="bottom-area d-flex px-3">
              <div class="m-auto d-flex">
                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                  <span><i class="ion-ios-menu"></i></span>
                </a>
                <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                  <span><i class="ion-ios-cart"></i></span>
                </a>
                <a href="#" class="heart d-flex justify-content-center align-items-center ">
                  <span><i class="ion-ios-heart"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 ftco-animate">
        <div class="product">
          <a href="#" class="img-prod"><img class="img-fluid" src="images/product-2.jpg" alt="Colorlib Template">
            <div class="overlay"></div>
          </a>
          <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">Fraises</a></h3>
            <div class="d-flex">
              <div class="pricing">
                <p class="price"><span>120.00€</span></p>
                <p>Préparé par Jean</p>
              </div>
            </div>
            <div class="bottom-area d-flex px-3">
              <div class="m-auto d-flex">
                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                  <span><i class="ion-ios-menu"></i></span>
                <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                  <span><i class="ion-ios-cart"></i></span>
                </a>
                <a href="#" class="heart d-flex justify-content-center align-items-center ">
                  <span><i class="ion-ios-heart"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 ftco-animate">
        <div class="product">
          <a href="#" class="img-prod"><img class="img-fluid" src="images/product-3.jpg" alt="Colorlib Template">
            <div class="overlay"></div>
          </a>
          <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">Petits Pois</a></h3>
            <div class="d-flex">
              <div class="pricing">
                <p class="price"><span>120.00€</span></p>
                <p>Préparé par Nico</p>
              </div>
            </div>
            <div class="bottom-area d-flex px-3">
              <div class="m-auto d-flex">
                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                  <span><i class="ion-ios-menu"></i></span>
                </a>
                <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                  <span><i class="ion-ios-cart"></i></span>
                </a>
                <a href="#" class="heart d-flex justify-content-center align-items-center ">
                  <span><i class="ion-ios-heart"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 ftco-animate">
        <div class="product">
          <a href="#" class="img-prod"><img class="img-fluid" src="images/product-4.jpg" alt="Colorlib Template">
            <div class="overlay"></div>
          </a>
          <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">Choux</a></h3>
            <div class="d-flex">
              <div class="pricing">
                <p class="price"><span>120.00€</span></p>
                <p>Préparé par Vic</p>
              </div>
            </div>
            <div class="bottom-area d-flex px-3">
              <div class="m-auto d-flex">
                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                  <span><i class="ion-ios-menu"></i></span>
                </a>
                <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                  <span><i class="ion-ios-cart"></i></span>
                </a>
                <a href="#" class="heart d-flex justify-content-center align-items-center ">
                  <span><i class="ion-ios-heart"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="col-md-6 col-lg-3 ftco-animate">
        <div class="product">
          <a href="#" class="img-prod"><img class="img-fluid" src="images/product-5.jpg" alt="Colorlib Template">
            <span class="status">30%</span>
            <div class="overlay"></div>
          </a>
          <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">Tomates</a></h3>
            <div class="d-flex">
              <div class="pricing">
                <p class="price"><span class="mr-2 price-dc">120.00€</span><span class="price-sale">80.00€</span></p>
                <p>Préparé par Dodo</p>
              </div>
            </div>
            <div class="bottom-area d-flex px-3">
              <div class="m-auto d-flex">
                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                  <span><i class="ion-ios-menu"></i></span>
                </a>
                <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                  <span><i class="ion-ios-cart"></i></span>
                </a>
                <a href="#" class="heart d-flex justify-content-center align-items-center ">
                  <span><i class="ion-ios-heart"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 ftco-animate">
        <div class="product">
          <a href="#" class="img-prod"><img class="img-fluid" src="images/product-6.jpg" alt="Colorlib Template">
            <div class="overlay"></div>
          </a>
          <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">Brocoli</a></h3>
            <div class="d-flex">
              <div class="pricing">
                <p class="price"><span>120.00€</span></p>
                <p>Préparé par PL</p>
              </div>
            </div>
            <div class="bottom-area d-flex px-3">
              <div class="m-auto d-flex">
                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                  <span><i class="ion-ios-menu"></i></span>
                </a>
                <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                  <span><i class="ion-ios-cart"></i></span>
                </a>
                <a href="#" class="heart d-flex justify-content-center align-items-center ">
                  <span><i class="ion-ios-heart"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 ftco-animate">
        <div class="product">
          <a href="#" class="img-prod"><img class="img-fluid" src="images/product-7.jpg" alt="Colorlib Template">
            <div class="overlay"></div>
          </a>
          <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">Carrotes</a></h3>
            <div class="d-flex">
              <div class="pricing">
                <p class="price"><span>120.00€</span></p>
                <p>Préparé par Sid</p>
              </div>
            </div>
            <div class="bottom-area d-flex px-3">
              <div class="m-auto d-flex">
                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                  <span><i class="ion-ios-menu"></i></span>
                </a>
                <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                  <span><i class="ion-ios-cart"></i></span>
                </a>
                <a href="#" class="heart d-flex justify-content-center align-items-center ">
                  <span><i class="ion-ios-heart"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 ftco-animate">
        <div class="product">
          <a href="#" class="img-prod"><img class="img-fluid" src="images/product-8.jpg" alt="Colorlib Template">
            <div class="overlay"></div>
          </a>
          <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">Jus Frais</a></h3>
            <div class="d-flex">
              <div class="pricing">
                <p class="price"><span>120.00€</span></p>
                <p>Préparé par Rom</p
              </div>
            </div>
            <div class="bottom-area d-flex px-3">
              <div class="m-auto d-flex">
                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                  <span><i class="ion-ios-menu"></i></span>
                </a>
                <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                  <span><i class="ion-ios-cart"></i></span>
                </a>
                <a href="#" class="heart d-flex justify-content-center align-items-center ">
                  <span><i class="ion-ios-heart"></i></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="ftco-section ftco-counter img" id="section-counter" style="background-image: url(images/bg_3.jpg);">
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
            <div class="block-18 text-center">
              <div class="text">
                <strong class="number" data-number="10000">0</strong>
                <span>Customers</span>
              </div>
            </div>
          </div>
          <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
            <div class="block-18 text-center">
              <div class="text">
                <strong class="number" data-number="100">0</strong>
                <span>Cookers</span>
              </div>
            </div>
          </div>
          <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
            <div class="block-18 text-center">
              <div class="text">
                <strong class="number" data-number="1000">0</strong>
                <span>Plats postés</span>
              </div>
            </div>
          </div>
          <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
            <div class="block-18 text-center">
              <div class="text">
                <strong class="number" data-number="100">0</strong>
                <span>Plâts diponibles maintenant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section class="ftco-section testimony-section">
  <div class="container">
    <div class="row justify-content-center mb-5 pb-3">
      <div class="col-md-7 heading-section ftco-animate text-center">
        <span class="subheading">Rejoignez la grande famille A'Table et nos nombreux cookers heureux !</span>
        <h2 class="mb-4">Nos Cookers</h2>
        <p>Devenez un grand chef avec A'Table !</p>
      </div>
    </div>
    <div class="row ftco-animate">
      <div class="col-md-12">
        <div class="carousel-testimony owl-carousel">

          <div class="item">
            <div class="testimony-wrap p-4 pb-5">
              <div class="user-img mb-5" style="background-image: url(images/person_2.jpg)">
                <span class="quote d-flex align-items-center justify-content-center">
                  <i class="icon-quote-left"></i>
                </span>
              </div>
              <div class="text text-center">
                <p class="mb-5 pl-4 line">J'ai découvert A'Table car mes gosses ne finissaient jamais mes bons petits plâts. Du coup je fais plus de gachis et ça arrondi mes fins de mois</p>
                <p class="name">Garreth Smith</p>
                <span class="position">Informaticien et Papa de deux enfants</span>
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
                <p class="mb-5 pl-4 line">Je suis à la retraite et grand passionné de cuisine. J'ai tout de suite accroché sur A'Table car je peux exercer ma passion et garder une activité rémunérée ! Et la purée maison j'espère ?</p>
                <p class="name">Jean-Pierre Coffe</p>
                <span class="position">Retraité</span>
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
                <p class="mb-5 pl-4 line">J'aime le poulet mais je ne mange jamais les blancs, merci A'Table grâce à toi mes blancs de poulets ne s'entassent plus dans mon frigo car des milliers de personnes aiment le blanc de poulet et du coup c'est top !</p>
                <p class="name">Billy Bob</p>
                <span class="position">Avocat</span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="testimony-wrap p-4 pb-5">
              <div class="user-img mb-5" style="background-image: url(images/person_1.jpg)">
                <span class="quote d-flex align-items-center justify-content-center">
                  <i class="icon-quote-left"></i>
                </span>
              </div>
              <div class="text text-center">
                <p class="mb-5 pl-4 line">Je suis un jeune passioné de cuisine et A'Table m'a permis d'évoluer en tant qu'apprenti cuisnier tout en mettant de l'argent de côté !</p>
                <p class="name">John Doe</p>
                <span class="position">Apprenti cuisinier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="ftco-section img" style="background-image: url(images/bg_3.jpg);">
  <div class="container">
    <div class="row justify-content-end">
      <div class="col-md-6 heading-section ftco-animate deal-of-the-day ftco-animate">
        <span class="subheading">Faites des économies avec A'Table !</span>
        <h2 class="mb-4">Le plât à l'affiche !</h2>
        <p> Aujourd'hui seulement, ne passez pas à côté ! </p>
        <h3><a href="#">La salade aux concombres de Nadine</a></h3>
        <span class="price">10€ <a href="#">Aujourd'hui à 5€ seulement !</a></span>
        <div id="timer" class="d-flex mt-5">
          <!-- <div class="time" id="days"></div> -->
          <div class="time pl-3" id="heures"></div>
          <div class="time pl-3" id="minutes"></div>
          <div class="time pl-3" id="secondes"></div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- <section class="ftco-section ftco-no-pb ftco-no-pt bg-light">
  <div class="container">
    <div class="row">
      <div class="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center" style="background-image: url(images/epitech-logo.jpg);">
      </div>
      <div class="col-md-7 py-5 wrap-about pb-md-5 ftco-animate">
        <div class="heading-section-bold mb-4 mt-md-5">
          <div class="ml-md-0">
            <h2 class="mb-4">Bienvenue sur A'Table, un sevice de livraisons de nourriture de qualité entre particuliers</h2>
          </div>
        </div>
        <div class="pb-md-5">
          <p>A'Table est un EIP (Epitech Innovative Project), crée et developpé par un groupe de six étudiants, le CROU.</p>
          <p>Notre mission est de sortir de l'offre actuel de livraison de repas à domicile, en mettant en avant de la cusine maison, locale.</p>
          <p><a href="#" class="btn btn-primary">Shop now</a></p>
        </div>
      </div>
    </div>
  </div>
</section> -->




<!-- <section class="ftco-section ftco-partner">
  <div class="container">
    <div class="row">
      <div class="col-sm ftco-animate">
        <a href="#" class="partner"><img src="images/partner-1.png" class="img-fluid" alt="Colorlib Template"></a>
      </div>
      <div class="col-sm ftco-animate">
        <a href="#" class="partner"><img src="images/partner-2.png" class="img-fluid" alt="Colorlib Template"></a>
      </div>
      <div class="col-sm ftco-animate">
        <a href="#" class="partner"><img src="images/partner-3.png" class="img-fluid" alt="Colorlib Template"></a>
      </div>
      <div class="col-sm ftco-animate">
        <a href="#" class="partner"><img src="images/partner-4.png" class="img-fluid" alt="Colorlib Template"></a>
      </div>
      <div class="col-sm ftco-animate">
        <a href="#" class="partner"><img src="images/partner-5.png" class="img-fluid" alt="Colorlib Template"></a>
      </div>
    </div>
  </div>
</section> -->

<!-- <section class="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
  <div class="container py-4">
    <div class="row d-flex justify-content-center py-5">
      <div class="col-md-6">
        <h2 style="font-size: 22px;" class="mb-0">Subcribe to our Newsletter</h2>
        <span>Get e-mail updates about our latest shops and special offers</span>
      </div>
      <div class="col-md-6 d-flex align-items-center">
        <form action="#" class="subscribe-form">
          <div class="form-group d-flex">
            <input type="text" class="form-control" placeholder="Enter email address">
            <input type="submit" value="Subscribe" class="submit px-3">
          </div>
        </form>
      </div>
    </div>
  </div>
</section> -->



@Stop
