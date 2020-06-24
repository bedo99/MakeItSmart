auth.onAuthStateChanged(user =>{
 
    if(user){
        console.log('Usuario entró');

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


    data.forEach( doc => {
        
        var informacion = "<img src='../img/MakeItSmartLogo.png' style=' width: 50px; margin: 0px 0px 0px 6px;'>"+ "<br><strong>Cliente:</strong>" + doc.data().nombre;

        var pos = { 
            lat: doc.data().coordenadas.latitude,
            lng: doc.data().coordenadas.longitude
        };

        var infowindow = new google.maps.InfoWindow({
            content: informacion,
            position: pos
        });

        infowindow.open(map);

    });



 };

const salir = document.getElementById('salir');

salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        return window.document.location = '../index.html';
    });

});