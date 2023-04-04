<?php

namespace App\Http\Controllers;

use Geocoder\Query\GeocodeQuery;
use Geocoder\Query\ReverseQuery;


class TestController extends Controller
{
    public function geolocIP()
    {
        return view('pages.geoloc');
    }

    public function geolocadd()
    {
        return view('pages.geolocadd');
    }
    public function geolocPHP()
    {
      // $httpClient = new \Http\Adapter\Guzzle6\Client();
      // $provider = new Geocoder\Provider\FreeGeoIp\FreeGeoIp($httpClient);
      // $geocoder = new \Geocoder\StatefulGeocoder($provider, 'en');
      //
      // $result = $geocoder->geocodeQuery(GeocodeQuery::create('Buckingham Palace, London'));
      // // $result = $geocoder->reverseQuery(ReverseQuery::fromCoordinates(...));
      // return view('pages.geolocphp');

      $geocoder = new \Geocoder\ProviderAggregator();
      $adapter  = new \Http\Adapter\Guzzle6\Client();

      $chain = new \Geocoder\Provider\Chain\Chain([
        new \Geocoder\Provider\FreeGeoIp\FreeGeoIp($adapter),
        new \Geocoder\Provider\HostIp\HostIp($adapter),
        new \Geocoder\Provider\GoogleMaps\GoogleMaps($adapter, 'France')
      ]);

      $geocoder->registerProvider($chain);

      $result = $geocoder->geocodeQuery(GeocodeQuery::create('Buckingham Palace, London'));
      var_export($result);
    }
}
