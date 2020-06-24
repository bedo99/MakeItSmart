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