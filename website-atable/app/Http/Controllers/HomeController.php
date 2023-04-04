<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Message\Request;
use GuzzleHttp\Message\Response;



class HomeController extends Controller
{


  public function description()
  {
      return view('pages.home.description');
  }
    public function landing()
    {
        return view('pages.home.landing');
    }

    public function blogsingle()
    {
        return view('pages.home.blogsingle');
    }

    public function checkout()
    {
        return view('pages.home.checkout');
    }

    public function contact()
    {
        return view('pages.home.contact');
    }

    public function cart()
    {
        return view('pages.home.cart');
    }

    public function productsingle()
    {
        return view('pages.home.productsingle');
    }

    public function shop()
    {
      // $client = new Client;
      // $api_response = $client->get("api-local.atable.io/api/dish");
      // dd($api_response);
      // $response = json_decode($api_response);
      // return view('products/show', compact('response'));
      return view('pages.home.shop');
    }

    public function wishlist()
    {
        return view('pages.home.wishlist');
    }
    public function profil()
    {
        return view('pages.home.profil');
    }
    public function test()
    {
        return ('test');
    }
    public function dish()
    {
      return view('pages.home.dish');
    }
    public function dodo()
    {
        return view('pages.home.dodo');
    }
    public function my_past_orders()
    {
        return view('pages.home.my_past_orders');
    }
    public function my_current_orders()
    {
        return view('pages.home.my_current_orders');
    }
}
