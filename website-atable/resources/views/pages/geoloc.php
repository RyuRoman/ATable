<!DOCTYPE html>
<html>
  <head>
    <style>
      #map {
        height: 400px;
        width: 100%;
       }
    </style>
  </head>
  <body>

    <?php
    //$ip = $_SERVER['REMOTE_ADDR']; // Recuperation de l'IP du visiteur
    $ip='163.5.220.19';
    $query = @unserialize(file_get_contents('http://ip-api.com/php/'.$ip)); //connection au serveur de ip-api.com et recuperation des données
    if($query && $query['status'] == 'success')
    {
        //code avec les variables
        echo "Bonjour visiteur de " . $query['country'] . "," . $query['city'] . "<br>";
        echo "Organisation " . $query['org'] . "<br>";
        echo "Identifiant AS " . $query['as'] . "<br>";
        echo "Longitude " . $query['lon'] . "<br>";
        echo "Lattitude " . $query['lat'] . "<br>";
        echo "ISP " . $query['isp'] . "<br>";
        echo "ZIP " . $query['zip'] . "<br>";
        echo "Timezone " . $query['timezone'] . "<br>";
        echo "Code Payes " . $query['countryCode'] . "<br>";
        echo "Region " . $query['regionName'] . "<br>";
    }
    else {
      echo "null";
    }

    ?>

    <p>My Google Maps Demo</p>
    <div id="map"></div>
    <script>
      function initMap() {


        var test= {lat: 48.8543, lng: 2.3527};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: test
        });
        var marker = new google.maps.Marker({
          position: test,
          map: map
        });
      }
    </script>
    <script async defer
    src=
"https://maps.googleapis.com/maps/api/js?key=AIzaSyBY8_e2wWEd4u7qmaLtmh8qRYiC3N4Kgoc&callback=initMap">
    </script>



  </body>
</html>
