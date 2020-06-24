document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
});



const formaregistrate = document.getElementById('formaregistrate');

formaregistrate.addEventListener('submit',(e)=>{
    e.preventDefault();

    const correo = formaregistrate['rcorreo'].value;
    const contrasena = formaregistrate['rcontrasena'].value;

    auth.createUserWithEmailAndPassword(correo,contrasena).then( cred =>{
        
        
        return db.collection('Usuarios').doc(cred.user.uid).set({
            nombre: formaregistrate['rnombre'].value,
            estatus: "0"
        }).then(() => {
            
            window.document.location = './index.html';
        });
        

    })

});

const formaingresar =  document.getElementById('formaingresar');

formaingresar.addEventListener('submit',(e)=>{
    e.preventDefault();
    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contrasena'].value;

    auth.signInWithEmailAndPassword(correo,contrasena).then( cred =>{

        const id = cred.user.uid;
        console.log(id);

        db.collection('Usuarios').doc(id).get().then(datos =>{
            if(datos.data().estatus == "0"){
                return window.document.location = './index.html';
            }
            else{
                return window.document.location = './Admin/index.html';
            }
        }, err => {
            console.log(err.message);
        });
       
        //window.document.location = './index.html';
        formaingresar.reset();
        
    }).catch( err => {
        
        console.log(err);
    });
    
});


entrarGoogle = () => {
 
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {

        var token = result.credential.accessToken;
        console.log(token);

        var user = result.user;

            
        

        // ...
        }).catch(function(error) {
            console.log(error);
    });

}