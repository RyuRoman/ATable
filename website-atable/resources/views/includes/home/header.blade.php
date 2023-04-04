@if (request()->is('/'))
<section id="home-section" class="hero">
  <div class="home-slider owl-carousel">
    <div class="slider-item" style="background-image: url(images/bg_1.jpg);">
      <div class="overlay"></div>
      <div class="container">
        <div class="row slider-text justify-content-center align-items-center" data-scrollax-parent="true">

          <div class="col-md-12 ftco-animate text-center">
            <h1 class="mb-2">We serve Homemade &amp; Fresh Food</h1>
            <h2 class="subheading mb-4">We deliver organic meals</h2>
            <p><a href="#" class="btn btn-primary">View Details</a></p>
          </div>

        </div>
      </div>
    </div>

    <div class="slider-item" style="background-image: url(images/bg_2.jpg);">
      <div class="overlay"></div>
      <div class="container">
        <div class="row slider-text justify-content-center align-items-center" data-scrollax-parent="true">

          <div class="col-sm-12 ftco-animate text-center">
            <h1 class="mb-2">100% Fresh &amp; Organic Foods</h1>
            <h2 class="subheading mb-4">We deliver when and where you want</h2>
            <p><a href="#" class="btn btn-primary">View Details</a></p>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
@else
<style>
/* .hero-wrap .hero-bread {
  width:auto;
  text-align:center;
  padding:20px;
}
img {
  max-width:100%;
  height:auto;
} */
</style>

@if (request()->is('landing'))
<div class="hero-wrap hero-bread" style="background-image: url('images/banner5.png');">
@else
<?php
  $bg = array('bg_1.jpg', 'bg_2.jpg', 'image_4.jpg', 'image_5.jpg', 'image_6.jpg' ); // array of filenames

  $i = rand(0, count($bg)-1); // generate random number size of the array
  $selectedBg = "$bg[$i]"; // set variable equal to which random filename was chosen
?>
<div class="hero-wrap hero-bread" style="background-image: url('images/<?php echo $selectedBg; ?>');">
@endif

  <div class="container">
    <div class="row no-gutters slider-text align-items-center justify-content-center">
      <div class="col-md-9 ftco-animate text-center">
      <p class="breadcrumbs"><span class="mr-0-bread"><a href="/">A'</a></span> <span>TABLE !</span></p>
      @if (request()->is('shop'))
        <h1 class="mb-0 bread">Shop</h1>
        @elseif (request()->is('landing'))
        <h1 class="mb-0 bread">Bienvenue !</h1>
        @elseif (request()->is('wishlist'))
        <h1 class="mb-0 bread">Wishlist</h1>
        @elseif (request()->is('productsingle'))
        <h1 class="mb-0 bread">Single Product</h1>
        @elseif (request()->is('cart'))
        <h1 class="mb-0 bread">Cart</h1>
        @elseif (request()->is('checkout'))
        <h1 class="mb-0 bread">Checkout</h1>
        @elseif (request()->is('about'))
        <h1 class="mb-0 bread">About Us</h1>
        @elseif (request()->is('blog'))
        <h1 class="mb-0 bread">Blog</h1>
        @elseif (request()->is('contact'))
        <h1 class="mb-0 bread">Contact</h1>
        @elseif (request()->is('profil'))
        <h1 class="mb-0 bread">Profil</h1>
      @endif
      </div>
    </div>
  </div>
</div>
@endif
