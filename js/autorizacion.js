const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');

const configuraMenu = (user) => {
    if(user){
       listaloggedin.forEach( item => item.style.display = 'block');
       listaloggedout.forEach( item => item.style.display = 'none');
    }
    else
    {
       listaloggedin.forEach( item => item.style.display = 'none');
       listaloggedout.forEach( item => item.style.display = 'block');
    }
}

auth.onAuthStateChanged( user =>{
 
    if(user){
        console.log('Usuario entró');

        db.collection('ProductosMakeitSmart').onSnapshot(snapshot =>{
            configuraMenu(user);
        }, err => {
            console.log(err.message);
        });
 

    }
    else{
        console.log('Usuario salió');
        //obtieneProductos([]);
        configuraMenu();
    }

});


const salir = document.getElementById('salir');

salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        return window.document.location = './index.html';
    });

});

