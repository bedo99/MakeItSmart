function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), { center: { lat:21.152359, lng: -101.711590}, zoom: 14 });
    informacion = new google.maps.InfoWindow;
    var pos = {
        lat: 21.152359,
        lng: -101.711590
    };
    informacion.setPosition(pos);
    informacion.setContent("<img src='img/logoNombreAzul.png' style=' width: 135px; margin: 0px 0px 0px 6px;'>");
    informacion.open(map);
    map.setCenter(pos);
}