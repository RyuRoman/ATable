use Geocoder\Query\GeocodeQuery;
use Geocoder\Query\ReverseQuery;

$httpClient = new \Http\Adapter\Guzzle6\Client();
$provider = new \Geocoder\Provider\GoogleMaps\GoogleMaps($httpClient, null, 'your-api-key');
$geocoder = new \Geocoder\StatefulGeocoder($provider, 'en');

$result = $geocoder->geocodeQuery(GeocodeQuery::create('Buckingham Palace, London'));
$result = $geocoder->reverseQuery(ReverseQuery::fromCoordinates(...));
