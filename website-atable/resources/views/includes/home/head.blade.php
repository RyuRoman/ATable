<script src="js/logout.js"></script>
<script src="js/icons.js"></script>
<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
<body class="goto-here">
  <div class="py-1 bg-primary">
    <div class="container">
      <div class="row no-gutters d-flex align-items-start align-items-center px-md-0">
        <div class="col-lg-12 d-block">
          <div class="row d-flex">
            <div class="col-md pr-4 d-flex topper align-items-center">
              <div class="icon mr-2 d-flex justify-content-center align-items-center"><span class="icon-phone2"></span></div>
              <span class="text">+ 1235 2355 98</span>
            </div>
            <div class="col-md pr-4 d-flex topper align-items-center">
              <div class="icon mr-2 d-flex justify-content-center align-items-center"><span class="icon-paper-plane"></span></div>
              <span class="text">atable@lecrou.com</span>
            </div>
            <div class="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
              <span class="text">Livraison garantie en 30 minutes &amp; Retours gratuits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div class="container">
      <a class="navbar-brand" href="/landing">A'Table</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="oi oi-menu"></span> Menu
      </button>

      <div class="collapse navbar-collapse" id="ftco-nav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active"><a href="/landing" class="nav-link">Accueil</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop</a>
            <div class="dropdown-menu" aria-labelledby="dropdown04">
              <a class="dropdown-item" href="/shop">Shop</a>
              <a class="dropdown-item" href="/cart">Panier</a>
              <!-- <a class="dropdown-item" href="/checkout">Paiement</a> -->
            </div>
          </li>
          <li class="nav-item"><a href="/profil" class="nav-link">Profil</a></li>
          <!-- <li class="nav-item"><a href="/contact" class="nav-link">Contact</a></li> -->
          <li class="nav-item"><a href="#" onclick="logout()" class="nav-link">Déconnexion</a></li>
          <li class="nav-item cta cta-colored"><a href="/cart" class="nav-link"><span class="icon-shopping_cart"></span><span id="cart_icon">[0]</span></a></li>

        </ul>
      </div>
    </div>
  </nav>
