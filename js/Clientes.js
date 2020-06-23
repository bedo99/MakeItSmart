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
            configuraMenu(user);
        }, err => {
            console.log(err.message);
        });


    }
    else{
        console.log('Usuario salió');
        obtieneAmigos([]);
        configuraMenu();
    }

});

const obtieneAmigos = (data) =>{

    var propiedades = { 
        center: { 
                    lat: 21.152639, lng: -101.711598 
                }, 
        zoom: 14 
    }

    var mapa =  document.getElementById("map")
    var map = new google.maps.Map(mapa, propiedades);


    data.forEach( doc => {
        
        informacion = new google.maps.InfoWindow;

        var pos = { 
            lat: doc.data().coordenadas.latitude,
            lng: doc.data().coordenadas.longitude
        };

        informacion.setPosition(pos);
        informacion.setContent("<img src='img/logoNombreAzul.png' style=' width: 135px; margin: 0px 0px 0px 6px;'>");
        informacion.open(map);

    });



 };