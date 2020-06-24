const ListaDeCarrito = document.getElementById('carrito');
const listaTotales = document.getElementById('totales');
const btnContinuarCompra = document.getElementById('continuarCompra');

auth.onAuthStateChanged( user =>{
 
    if(user){
        console.log('Usuario entró a carrito');

        obtieneCarrito();

    }
    else{
        console.log('Usuario salió');
        ListaDeCarrito.innerHTML = '<p class="text-center">Ingrese con sus claves para ver su carrito.</p>';
        configuraMenu();
    }

});

var productoParaCarrito;
var listaCarrito = [];
function addToCart(id, nombre, descripcion, imagen, precio) {
    console.log("agregar");
    productoParaCarrito = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        imagen: imagen,
        precio: precio
    };

    //Agregar a carrito
    if(listaCarrito.length > 0){
        const ids = listaCarrito.map(idproducto => idproducto[0].id);
        if(ids.includes(productoParaCarrito.id)) {
            //console.log('El producto ya estaba');
            var index = ids.indexOf(productoParaCarrito.id);
            listaCarrito[index][1].cantidad = listaCarrito[index][1].cantidad + 1;
        } else {
            //console.log('El producto no estaba');
            listaCarrito.push([productoParaCarrito, {cantidad: 1}]);
        }
    } else {
        listaCarrito.push([productoParaCarrito, {cantidad: 1}]);
    }

    console.log("micarrito",listaCarrito);
    localStorage.setItem('carrito', JSON.stringify(listaCarrito));
}

//para hmtl de carrito
function obtieneCarrito() {
    btnContinuarCompra.style.display = 'none';
    console.log("mi carrito");
    var guardado = localStorage.getItem('carrito');
    listaCarrito = JSON.parse(guardado);

   if(listaCarrito.length > 0){
       
       let html = '';

       listaCarrito.forEach(doc => {
            var precio = doc[1].cantidad * doc[0].precio;
           const columna = `
           <li class="list-group-item">
                <div class="row">
                    <div class="col-4 col-sm-6 col-lg-2" style="text-align: center;">
                        <img id="img-producto" src="${doc[0].imagen}" alt="">
                    </div>
                    <div class="col-8 col-sm-6 col-lg-5">
                        <ul class="ul-productos">
                            <li class="titulo-producto">${doc[0].nombre}</li>
                            <li class="des-producto">${doc[0].descripcion}</li>
                        </ul>
                    </div>
                    <div class="col-5 col-sm-6 col-lg-3">
                        <form class="cant-producto" action="">
                            <input type="number" name="cantidad" min="1" max="15" step="1"
                                value="${doc[1].cantidad}" onchange="cambiarCantidad('${doc[0].id}',this.value)"><br>
                            <a onclick="eliminar('${doc[0].id}')">Eliminar producto</a>
                        </form>
                    </div>
                    <div class="col-7 col-sm-6 col-lg-2">
                        <div class="precio-producto">
                            <p>$${precio}</p>
                        </div>
                    </div>
                </div>
            </li>
           `;
           html += columna;
   
       });
   
       ListaDeCarrito.innerHTML = html;
       btnContinuarCompra.style.display = 'block';
       obtieneTotales();

   }
   else{
    ListaDeCarrito.innerHTML = '<p class="text-center">No se ha agregado ningún producto.</p>';
    btnContinuarCompra.style.display = 'none';
   }
}

function cambiarCantidad(id, cantidad) {
    const ids = listaCarrito.map(idproducto => idproducto[0].id);
    var index = ids.indexOf(id);
    listaCarrito[index][1].cantidad = cantidad;    
    localStorage.setItem('carrito', JSON.stringify(listaCarrito));
    obtieneCarrito();
    obtieneTotales();
}

function obtieneTotales() {
    var porProducto = 0;
    var envio = 50;
    var subtotal = 0;
    if(listaCarrito.length > 0) { 
        listaCarrito.forEach(doc => {
            porProducto = doc[1].cantidad * doc[0].precio;
            subtotal += porProducto;
        });
        const html = `
        <li>
            <p class="totales">Precio Total:<span>$${subtotal}</span></p>
        </li>
        <li>
            <p class="totales">Envio:<span>$${envio}</span></p>
        </li>
        <li>
            <p class="totales">Total:<span>$${subtotal + envio}</span></p>
        </li>
        `;
        listaTotales.innerHTML = html;
    } else {
        listaTotales.innerHTML = '';
    }
    
}


function eliminar(id) {
    if(listaCarrito.length > 0) {
        const ids = listaCarrito.map(idproducto => idproducto[0].id);
        var index = ids.indexOf(id);
        listaCarrito.splice(index,1);
        localStorage.setItem('carrito', JSON.stringify(listaCarrito));
        obtieneCarrito();
        if(listaCarrito.length == 0){
            listaTotales.innerHTML = '';
        }
    } else {
        btnContinuarCompra.style.display = 'none';
        listaTotales.innerHTML = '';
    }
    
}