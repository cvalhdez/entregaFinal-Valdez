fetch("../app/productos.json")
  .then(response => response.json())
  .then((data) => {
    productos = data;
    cargarProductos();
    actualizarBotonCompra ();
  });

const containerProductos = document.querySelector(".containerProductos");
const menuToggle = document.querySelector(".menuToggle");
const navMenu = document.querySelector(".navMenu");
const gridContainer = document.querySelector(".gridContainer");
let comprar = document.querySelectorAll(".comprar");
const numero = document.querySelector(".numero");

menuToggle.addEventListener("click", () =>{
  navMenu.classList.toggle("navMenu_visible")
  gridContainer.classList.toggle("noScrollBody")
});

function cargarProductos(){
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("containerCard");
    div.innerHTML = `
            <img class="productoImagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="containerInfo">
              <h3 class="productoNombre">${producto.nombre}</h3>
              <h3 class="productoTipo">${producto.tipo}</h2>
              <p class="productoResumen">
                ${producto.resumen}
              </p>
              <ul>
                <li class="productoSMR">SMR:${producto.smr}</li>
                <li class="productoCuerpo">Cuerpo: ${producto.cuerpo}</li>
                <li class="productoIBUS">IBUS:${producto.ibus}</li>
                <li class="productoPrecio">$${producto.precio}</li>
              </ul>
              <button id="${producto.id}" class="comprar">COMPRAR</button>
            </div>
    `;
    containerProductos.append(div);
  })
};

function actualizarBotonCompra () {
  comprar = document.querySelectorAll(".comprar");
  comprar.forEach(boton => {
    boton.addEventListener("click",agregarAlCarrito);
  });
};

let productosCarrito;
let productosCarritoLS = localStorage.getItem("productosCarrito");

if (productosCarritoLS){
  productosCarrito = JSON.parse(productosCarritoLS);
  actualizarNumero();
} else {
  productosCarrito = [];
}

function agregarAlCarrito (e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(producto => producto.id === idBoton);
  if(productosCarrito.some(producto => producto.id === idBoton)){
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);
    productosCarrito[index].cantidad++;
  }else{
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
  }
  actualizarNumero();
  localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
};

function actualizarNumero(){
  let nuevoNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numero.innerText = nuevoNumero;
};
