@extends('layouts.home')
@section('content')
<script src="js/dish.js"></script>
    <section class="ftco-section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-7 ftco-animate">
                <form action="#" class="billing-form">
                    <h3 class="mb-4 billing-heading">Add a new dish</h3>
                    <div class="row align-items-end">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="firstname">Dish Name</label>
                                <input type="text" class="form-control" placeholder="">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="lastname">Dish Description</label>
                                <input type="text" class="form-control" placeholder="">
                            </div>
                        </div>
                        <div class="w-100"></div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="country">Delivery / Takeaway</label>
                                <div class="select-wrap">
                                    <div class="icon"><span class="ion-ios-arrow-down"></span></div>
                                    <select name="" id="" class="form-control">
                                        <option value="">Delivery</option>
                                        <option value="">Takeaway</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="w-100"></div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="description" for="element_7">Food diet and alergies </label>
                                <span>
                                    <input id="element_7_1" name="element_7_1" class="element checkbox" type="checkbox" value="1" />
                                    <label class="choice" for="element_7_1">Kosher</label>
                                    <input id="element_7_2" name="element_7_2" class="element checkbox" type="checkbox" value="1" />
                                    <label class="choice" for="element_7_2">Halal</label>
                                    <input id="element_7_3" name="element_7_3" class="element checkbox" type="checkbox" value="1" />
                                    <label class="choice" for="element_7_3">Vegan</label>
                                    <input id="element_7_4" name="element_7_4" class="element checkbox" type="checkbox" value="1" />
                                    <label class="choice" for="element_7_4">Gluten Free</label>
                                </span>
                            </div>
                        </div>
                        <div class="w-100"></div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="description" for="element_3">Price </label>
                                <span class="symbol">&#8364;</span>
                                <span>
                                    <input id="element_3_1" name="element_3_1" class="element text currency" size="10" value="" type="text" /> .
                                </span>
                                <span>
                                    <input id="element_3_2" name="element_3_2" class="element text" size="2" maxlength="2" value="" type="text" />
                                </span>
                            </div>
                        </div>
                        <div class="w-100"></div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="input-group">
                                    <label class="description" for="element_4">Availability</label>
                                </div>
                                <input id="add_dish_date" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="w-100"></div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="description" for="element_5">Time </label>
                                <span>
                                    <input id="element_5_1" name="element_5_1" class="element text " size="2" type="text" maxlength="2" value="" /> :
                                    <label>Hour</label>
                                </span>
                                <span>
                                    <input id="element_5_2" name="element_5_2" class="element text " size="2" type="text" maxlength="2" value="" /> :
                                    <label>Minutes</label>
                                </span>
                                <span>
                                    <select class="element select" style="width:4em" id="element_5_4" name="element_5_4">
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                    <label>AM/PM</label>
                                </span>
                            </div>
                        </div>
                        <div class="w-100"></div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="description" for="element_6">Upload a Picture </label>
                                <div>
                                    <input id="element_6" name="element_6" class="element file" type="file" />
                                </div>
                            </div>
                        </div>

                        <div class="w-100"></div>
                        <label for="pic-select">Choose a picture:</label>

                        <select name="pic" id="pic-select">
                          <option value="">--Please choose an option--</option>
                          <option value="apple.jpg">Apple</option>
                          <option value="beans.jpg">Beans</option>
                          <option value="brocoli.jpg">Brocoli</option>
                          <option value="carrot.jpg">Carrot</option>
                          <option value="chili.jpg">Chili</option>
                          <option value="garlic.jpg">Garlic</option>
                          <option value="juice.jpg">Juice</option>
                          <option value="oignon.jpg">Oignon</option>
                          <option value="pepper.jpg">Pepper</option>
                          <option value="salad.jpg">Salad</option>
                          <option value="strawbery.jpg">Strawberry</option>
                          <option value="tomatoe.jpg">Tomatoe</option>
                        </select>



                        <div class="w-100"></div>
                        <div class="col-md-12">
                            <div class="form-group mt-4">
                                <div class="radio">
                                    <label class="mr-3"><input type="radio" name="optradio"> Create an Account? </label>
                                    <label><input type="radio" name="optradio"> Ship to different address</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-12">
                <div class="cart-detail p-3 p-md-4">
                    <h3 class="billing-heading mb-4">Payment Method</h3>
                    <div class="form-group">
                        <div class="col-md-12">
                            <div class="radio">
                                <label><input type="radio" name="optradio" class="mr-2"> Direct Bank Tranfer</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <div class="radio">
                                <label><input type="radio" name="optradio" class="mr-2"> Check Payment</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <div class="radio">
                                <label><input type="radio" name="optradio" class="mr-2"> Paypal</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <div class="checkbox">
                                <label><input type="checkbox" value="" class="mr-2"> I have read and accept the terms and conditions</label>
                            </div>
                        </div>
                    </div>
                    <p><a id="add_dish_button" class="btn btn-primary py-3 px-4">add dish</a></p>
                </div>
            </div>
        </div>
    </div>
</section>
  <script>
		$(document).ready(function() {

		    var quantitiy = 0;
		    $('.quantity-right-plus').click(function(e) {

		        // Stop acting like a button
		        e.preventDefault();
		        // Get the field name
		        var quantity = parseInt($('#quantity').val());

		        // If is not undefined

		        $('#quantity').val(quantity + 1);


		        // Increment

		    });

		    $('.quantity-left-minus').click(function(e) {
		        // Stop acting like a button
		        e.preventDefault();
		        // Get the field name
		        var quantity = parseInt($('#quantity').val());

		        // If is not undefined

		        // Increment
		        if (quantity > 0) {
		            $('#quantity').val(quantity - 1);
		        }
		    });

		});
	</script>

@Stop
</html>
