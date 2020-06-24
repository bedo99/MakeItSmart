auth.onAuthStateChanged(user =>{
 
    if(user){
        console.log('Usuario entró');

        if(navigator.geolocation){

            navigator.geolocation.getCurrentPosition( position =>{
                

                db.collection('Usuarios').doc(user.uid).update({
                    coordenadas : {
                        latitude : position.coords.latitude,
                        longitude : position.coords.longitude
                    }
                });

            });
        }

        db.collection('Usuarios').onSnapshot(snapshot =>{
            obtieneAmigos(snapshot.docs);
        }, err => {
            console.log(err.message);
        });


    }
    else{
        console.log('Usuario salió');
        obtieneAmigos([]);
    }

});

const obtieneAmigos = (data) =>{

    var propiedades = { 
        center: { 
                    lat: 21.152639, lng: -101.711598 
                }, 
        zoom: 14 
    }

    var mapacliente =  document.getElementById("mapacliente")
    var map = new google.maps.Map(mapacliente, propiedades);

    var marcadores = [];

    data.forEach( doc => {

        
        var informacion = "<img src='../img/MakeItSmartLogo.png' style=' width: 50px; margin: 0px 0px 0px 6px;'>"+ "<br><strong>Cliente:</strong>" + doc.data().nombre;

        var pos = { 
            lat: doc.data().coordenadas.latitude,
            lng: doc.data().coordenadas.longitude
        };

        var infowindow = new google.maps.InfoWindow({
            map: map,
            content: informacion,
            position: pos
        });

        infowindow.open(map);
        marcadores.push(infowindow);
        

    });

    var markerCluster = new markerCluster(map, marcadores,
        {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            gridSize: 60,
            zoomOnClick: true,
            maxZoom: 10
        }
    );



 };

const salir = document.getElementById('salir');

salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        return window.document.location = '../index.html';
    });

});