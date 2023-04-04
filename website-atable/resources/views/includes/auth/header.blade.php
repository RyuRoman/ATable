<img src="logo.png" alt="logo" class="center">

<div class="card-header">
  <!-- <div class="category-wrap ftco-animate img mb-4 d-flex align-items-end" style="background-image: url(images/category-1.jpg);">
    <div class="text px-3 py-1">
      <h2 class="mb-0"><a href="#">Fruits</a></h2>
    </div>
  </div> -->
  @if (request()->is('/') || request()->is('login'))
  <!-- NOUS SOMMES SUR LA ROUTE LOGIN -->
  <h3><center>Connexion</center></h3>
  @elseif (request()->is('register'))
  <!-- NOUS SOMMES SUR LA ROUTE REGISTER -->
  <h3><center>Enregistrement</center></h3>
  @elseif (request()->is('choice'))
  <!-- NOUS SOMMES SUR LA ROUTE CHOICE -->
  <h3><center>Êtes-vous un Cooker ou un Customer ?</center></h3>
  @elseif (request()->is('recover'))
  <h3><center>Mot de passe oublié</center></h3>
  <div class="card-header-text">
    <div class="d-flex justify-content-center">
      <center>Un lien de réinitialisation va être envoyé</center>
    </div>
  </div>
  @elseif (!strcmp(request()->route()->getName(), "reset"))
  <div class="card-header">
    <h3><center>Réinitialisation de mot de passe</center></h3>
  </div>
  @endif
  <!--<div class="d-flex justify-content-end social_icon">
    <span><i class="fab fa-facebook-square"></i></span>
    <span><i class="fab fa-google-plus-square"></i></span>
    <span><i class="fab fa-twitter-square"></i></span>
  </div>-->
</div>
