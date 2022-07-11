//Clases
class Producto {
    constructor(id, nombre, color, tipo, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.color = color;
        this.tipo = tipo;
        this.precio = precio;
        this.imagen = imagen;
    }
}

//Productos a vender

const listaProductos = [];

let prod1 = new Producto(1, "Remera Manga Corta", "blanco", "remera", 2500.00, "Remera-blanca-hombre.jpg")
let prod2 = new Producto(2, "Remera Manga Larga", "blanco", "remera", 3000.00, "remera-blanca-hombre-ml.jpg")
let prod3 = new Producto(3, "Remera Manga Corta", "negro", "remera", 2500.00, "remera-negra-hombre.webp")
let prod4 = new Producto(4, "Remera Manga Larga", "negro", "remera", 3000.00, "remera-negra-hombre-ml.webp")
let prod5 = new Producto(5, "Buzo Liso", "negro", "buzo", 5000.00, "buzo-negro-hombre.webp")
let prod6 = new Producto(6, "Buzo Liso", "blanco", "buzo", 5000.00, "buzo-blanco-hombre.jpg")
let prod7 = new Producto(7, "Buzo Capucha", "negro", "buzo", 5500.00, "buzo-negro-capucha.webp")
let prod8 = new Producto(8, "Buzo Capucha", "blanco", "buzo", 5500.00, "buzo-blanco-capucha.jpg")


listaProductos.push(prod1);
listaProductos.push(prod2);
listaProductos.push(prod3);
listaProductos.push(prod4);
listaProductos.push(prod5);
listaProductos.push(prod6);
listaProductos.push(prod7);
listaProductos.push(prod8);



//------FUNCIONES--------


//Crear cards de productos
function crearCardsMain() {
    let cardsBloque = document.querySelector("#productos-todos");
    listaProductos.forEach(producto => {
        cardsBloque.innerHTML += crearCard(producto);
    })
}

//Incertar en el Html
function crearCard(producto) {
    let cardCreada = `
        <div class="productos-todos-card">
            <img src="./img/productos/${producto.imagen}" alt="">
            <div id="agregar-carrito">
                <img src="./img/icon/heart2.svg" alt="" id="${producto.id}" class="favoritos" onclick="manejarFavs(${producto.id})">
                <img src="./img/icon/cart.svg" alt="" id="${producto.id}" class="botoncarrito"  onclick="manejarCarrito(${producto.id})">
            </div>
            <div>
                <h2>${producto.nombre} ${producto.color}</h2>
                <p>$ ${producto.precio}</p>
            </div>
        </div>
        `;
    return cardCreada
}


function crearCardFav(producto) {
    let cardCreada = `
                <div class="productos-fav-card" id="fav-${producto.id}" >
                    <img src="./img/productos/${producto.imagen}" alt="">
                    <div>
                        <h2>${producto.nombre} ${producto.color}</h2>
                        <h4>$ ${producto.precio}</h4>
                        <img src="./img/icon/trash.svg" alt=""id="${producto.id}" class="trash" onclick= "eliminarFavorito(${producto.id})">
                    </div>
                </div>
                `;
    return cardCreada
}

function crearCardCarrito(producto) {
    let cardCreada = `
                <div class="productos-fav-card" id="car-${producto.id}" >
                    <img src="./img/productos/${producto.imagen}" alt="">
                    <div>
                        <h2>${producto.nombre} ${producto.color}</h2>
                        <h4>$ ${producto.precio}</h4>
                        <img src="./img/icon/trash.svg" alt=""id="${producto.id}" class="trash" onclick= "eliminarCarrito(${producto.id})">
                    </div>
                </div>
                `;
    return cardCreada
}

//Funcion ver los totales del carrito

function contadorCarrito() {
    let contadorCar = document.getElementById("contCar")
    contadorCar.innerHTML = `${carrito.length}`
}

function contadorFavoritos() {
    let contadorFav = document.getElementById("contFav")
    contadorFav.innerHTML = `${favoritos.length}`
}


//------CARRITO--------

let carrito = []

class ProductoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto
        this.cantidad = cantidad
    }
}

function manejarCarrito(id) {
    if (estaEnCarrito(id)) {
        eliminarCarrito(id)
    } else {
        agregarCarrito(id)
    }
}

function estaEnCarrito(id) {
    for (let prod of carrito) {
        if (prod.producto.id == id) {
            return true
        }
    }
    return false
}

function agregarCarrito(id) {
    let productoSelecFav = listaProductos.find(producto => producto.id == id)
    carrito.push(new ProductoCarrito(productoSelecFav, 1))

    let cardCar = document.querySelector("#carrito");
    cardCar.innerHTML += crearCardCarrito(productoSelecFav);

    contadorCarrito()

}

function eliminarCarrito(id) {
    let index = carrito.findIndex(prodCarrito => prodCarrito.producto.id === id);
    carrito.splice(index, 1)

    let card = document.querySelector(`#car-${id}`)
    card.parentNode.removeChild(card)

    contadorCarrito()
}


//------FAVORITOS--------
let favoritos = []

function manejarFavs(id) {
    let productoSelecFav = listaProductos.find(producto => producto.id == id)

    if (favoritos.includes(productoSelecFav)) {
        eliminarFavorito(id)
    } else {
        agregarFavorito(id)
    }
}

function agregarFavorito(id) {
    let productoSelecFav = listaProductos.find(producto => producto.id == id)
    favoritos.push(productoSelecFav)

    document.getElementById(productoSelecFav.id).src = "./img/icon/heart.svg";
    let cardFav = document.querySelector("#favoritos");
    cardFav.innerHTML += crearCardFav(productoSelecFav);

    contadorFavoritos()
}

function eliminarFavorito(id) {
    let index = favoritos.findIndex(producto => producto.id === id);
    favoritos.splice(index, 1)

    let productoSelecFav = listaProductos.find(producto => producto.id == id)
    document.getElementById(productoSelecFav.id).src = "./img/icon/heart2.svg";

    let card = document.querySelector(`#fav-${id}`)
    card.parentNode.removeChild(card)

    contadorFavoritos()
}

function main() {
    crearCardsMain()
}

main()