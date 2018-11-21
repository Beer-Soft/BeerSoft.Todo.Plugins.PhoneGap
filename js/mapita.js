var Mapita = {

    InitMapa: function () {
        var lt, ln;
        var div = document.getElementById("map_canvas");

        // If your app does not use browser,
        // you can comment out this code.
        plugin.google.maps.environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBZamoub9SCWL2GriEBRSgLGVVrF0QPakk',
            'API_KEY_FOR_BROWSER_DEBUG': ''
        });
        // Create a Google Maps native view under the map_canvas div.
        var map = plugin.google.maps.Map.getMap(div, {
            camera: {
                target: { "lat": 19.503780, "lng": -99.173647 },
                zoom: 10
            }
        });

        map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
            ons.notification.alert("listo");
            $(".page__background").css("background-color", "rgba(0,0,0,0)");

        });


        // If you click the button, do something...
        var button = document.getElementById("button");
        button.addEventListener("click", function () {

            if (navigator.geolocation) {
                var opciones = {
                    timeout: 3000,
                    enableHighAccuracy: true
                };
                navigator.geolocation.getCurrentPosition(function (posicion) {

                    lt = posicion.coords.latitude;
                    ln = posicion.coords.longitude;

                    ons.notification.alert("Latitud:" + lt + "\n" + "Longitud: " + ln);
                    //// Move to the position with animation
                    map.animateCamera({
                        target: { lat: lt, lng: ln },
                        zoom: 13
                        //tilt: 60,
                        //bearing: 140,
                        //duration: 5000
                    });
                    // Add a maker
                    var marker = map.addMarker({
                        position: { lat: lt, lng: ln },
                        animation: plugin.google.maps.Animation.BOUNCE
                    });

                    // Latitude, longitude -> address
                    plugin.google.maps.Geocoder.geocode({
                        "position": { lat: lt, lng: ln }
                    }, function (results) {

                        if (results.length === 0) {
                            // Not found
                            return;
                        }

                        var address = [
                            results[0].subThoroughfare || "",
                            results[0].thoroughfare || "",
                            results[0].locality || "",
                            results[0].adminArea || "",
                            results[0].postalCode || "",
                            results[0].country || ""].join(", ");

                        marker.setTitle(address)
                            .showInfoWindow();
                    });
                    //// Show the info window
                    //marker.showInfoWindow();

                }, function (e) {

                    var msg = "Error en geolocalización: #" + e.code + "\n" + e.message;
                    console.log(msg);
                    ons.notification.alert(msg);
                    //alert(msg);
                }
                    , opciones);
            } else {
                ons.notification.alert("Tu navegador no soporta la geolocalización");
            }
        });
    }
}