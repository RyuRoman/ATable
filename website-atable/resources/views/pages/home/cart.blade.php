@extends('layouts.home')
@section('content')
<script src="js/cart.js"></script>
<script src="js/paypal.js"></script>
<script src="https://www.paypal.com/sdk/js?client-id=AStUT8j4Dzwpy1funHhJAvSwzpPmNa6iCxTeP-oz5E3mIKcPq95coLAVjcn08VVCy7gpwv3yNNdoadaE&currency=EUR"></script>
    <section class="ftco-section ftco-cart">
			<div class="container">
				<div class="row">
    			<div class="col-md-12 ftco-animate">
    				<div class="cart-list">
	    				<table class="table">
						    <thead class="thead-primary">
						      <tr class="text-center">
						        <th>&nbsp;</th>
						        <th>&nbsp;</th>
						        <th>Nom du produit</th>
						        <th>Prix</th>
						        <th>Quantité</th>
						        <th>Total</th>
						      </tr>
						    </thead>
						    <tbody id="cart_list">
						    </tbody>
						  </table>
					  </div>
    			</div>
    		</div>
    		<div class="row justify-content-end">
    			<!-- <div class="col-lg-4 mt-5 cart-wrap ftco-animate">
    				<div class="cart-total mb-3">
    					<h3>Coupon Code</h3>
    					<p>Enter your coupon code if you have one</p>
  						<form action="#" class="info">
	              <div class="form-group">
	              	<label for="">Coupon code</label>
	                <input type="text" class="form-control text-left px-3" placeholder="">
	              </div>
	            </form>
    				</div>
    				<p><a href="/checkout" class="btn btn-primary py-3 px-4">Apply Coupon</a></p>
    			</div> -->
    			<!-- <div class="col-lg-4 mt-5 cart-wrap ftco-animate">
    				<div class="cart-total mb-3">
    					<h3>Estimate shipping and tax</h3>
    					<p>Enter your destination to get a shipping estimate</p>
  						<form action="#" class="info">
	              <div class="form-group">
	              	<label for="">Country</label>
	                <input type="text" class="form-control text-left px-3" placeholder="">
	              </div>
	              <div class="form-group">
	              	<label for="country">State/Province</label>
	                <input type="text" class="form-control text-left px-3" placeholder="">
	              </div>
	              <div class="form-group">
	              	<label for="country">Zip/Postal Code</label>
	                <input type="text" class="form-control text-left px-3" placeholder="">
	              </div>
	            </form>
    				</div>
    				<p><a href="/checkout" class="btn btn-primary py-3 px-4">Estimate</a></p>
    			</div> -->
    			<div class="col-lg-4 mt-5 cart-wrap ftco-animate">
    				<div class="cart-total mb-3">
    					<h3>Total Panier</h3>
    					<p class="d-flex">
    						<span>Sous-total</span>
    						<span id="sous-total">0€</span>
    					</p>
    					<p class="d-flex">
    						<span>Livraison</span>
    						<span>0€</span>
    					</p>
    					<p class="d-flex">
    						<span>Promo</span>
    						<span>0€</span>
    					</p>
    					<hr>
    					<p class="d-flex total-price">
    						<span>Total</span>
    						<span id = total>0€</span>
    					</p>
    				</div>
            <div id="paypal-button-container">
    				<!-- <p><a href="/checkout" class="btn btn-primary py-3 px-4">Proceed to Checkout</a></p> -->
    			</div>
    		</div>
			</div>
		</section>

  <script>
		$(document).ready(function(){

		var quantitiy=0;
		   $('.quantity-right-plus').click(function(e){

		        // Stop acting like a button
		        e.preventDefault();
		        // Get the field name
		        var quantity = parseInt($('#quantity').val());

		        // If is not undefined

		            $('#quantity').val(quantity + 1);


		            // Increment

		    });

		     $('.quantity-left-minus').click(function(e){
		        // Stop acting like a button
		        e.preventDefault();
		        // Get the field name
		        var quantity = parseInt($('#quantity').val());

		        // If is not undefined

		            // Increment
		            if(quantity>0){
		            $('#quantity').val(quantity - 1);
		            }
		    });

		});
	</script>

@Stop
