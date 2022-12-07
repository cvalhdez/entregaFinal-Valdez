let productosCarrito = localStorage.getItem("productosCarrito");
productosCarrito = JSON.parse(productosCarrito);

const carritoVacio = document.querySelector(".carritoVacio");
const carritoProductos = document.querySelector(".carritoProductos");
const carritoAcciones = document.querySelector(".carritoAcciones");
const carritoComprado = document.querySelector(".carritoComprado");
let carritoBorrar = document.querySelector(".carritoProductoBorrar");
const carritoVaciar =document.querySelector(".carritoVaciar");
const total = document.querySelector("#total");
const carritoComprar = document.querySelector(".carritoComprar");

function cargarProductosCarrito(){
  if (productosCarrito && productosCarrito.length > 0){
    carritoVacio.classList.add("desactivado");
    carritoProductos.classList.remove("desactivado");
    carritoAcciones.classList.remove("desactivado");
    carritoComprado.classList.add("desactivado"); 
    carritoProductos.innerHTML = "";
    
    productosCarrito.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("carritoProducto");
      div.innerHTML = `
      <img class="carritoProductoImagen" src="${producto.imagen}" alt="${producto.nombre}">
      <div class="carritoSeparador">
        <p>Producto</p>
        <h3 class="carritoProductoNombre">${producto.nombre}</h3>
      </div>
      <div class="carritoSeparador">
        <p>Cantidad</p>
        <p class="carritoProductoCantidad">${producto.cantidad}</p>
      </div>
      <div class="carritoSeparador">
        <p>Precio</p>
        <p class="carritoProductoPrecio">$${producto.precio}</p>
      </div>
      <div class="carritoSeparador">
        <p>Subtotal</p>
        <p class="carritoProductoSubtotal">$${producto.precio * producto.cantidad}</p>
      </div>
      <button class="carritoProductoBorrar" id="${producto.id}">Borrar</button>
      `;
      carritoProductos.append(div);
    })
  }else{
    carritoVacio.classList.remove("desactivado");
    carritoProductos.classList.add("desactivado");
    carritoComprado.classList.add("desactivado"); 
    carritoAcciones.classList.add("desactivado");
  };
  actualizarBotonBorrar ();
  actualizarTotal();
};

cargarProductosCarrito();

function actualizarBotonBorrar () {
  borrar = document.querySelectorAll(".carritoProductoBorrar");
  borrar.forEach(boton => {
    boton.addEventListener("click",eliminarDelCarrito);
  });
};

function eliminarDelCarrito(e){
  const idBoton = e.currentTarget.id;
  const index = productosCarrito.findIndex(producto => producto.id ===idBoton);
  productosCarrito.splice(index,1);
  cargarProductosCarrito();
  localStorage.setItem("productosCarrito",JSON.stringify(productosCarrito));
};

carritoVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
  productosCarrito.length = 0;
  localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
  cargarProductosCarrito();
};

function actualizarTotal() {
  const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  total.innerText = `$${totalCalculado}`;
};

carritoComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
  productosCarrito.length = 0;
  localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
  carritoVacio.classList.add("desactivado");
  carritoProductos.classList.add("desactivado");
  carritoComprado.classList.remove("desactivado"); 
  carritoAcciones.classList.add("desactivado");
};