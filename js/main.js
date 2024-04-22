const carrito = [];

const productos = [
    {
        titulo: "Alamos malbec",
        precio: 4500,
        imagen: "../img/alamos_malbec1-a14e842ac660d97f4816782062172498-480-0.webp",
    },
    {
        titulo: "Saint felicien malbec",
        precio: 8000,
        imagen: "../img/saint_felicien_malbec1-aa06d829e5a9ec611516782774647136-480-0.webp",
    },
    {
        titulo: "Rutini malbec",
        precio: 15000,
        imagen: "../img/rutini-cabernet-franc-_-malbec1-ddf5e655330d804b6016815561338653-480-0.webp",
    },
    {
        titulo: "Trumpeter malbec",
        precio: 12000,
        imagen: "../img/trumpeter_merlot11-4787236df8dd58894716811385521484-480-0.webp",
    },
    {
        titulo: "Mosquita muerta black malbec",
        precio: 35000,
        imagen: "../img/mosquita_muerta_black_cabernet_sauvignon1-381ac49c2c11c660e916782961529260-480-0.webp",
    },
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

// Cargar carrito desde localStorage al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito.push(...JSON.parse(carritoGuardado));
        actualizarCarrito();
    }
});

productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;
    const btn = document.createElement("button");
    btn.classList.add("producto-btn");
    btn.innerText = "Agregar al carrito";

    btn.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });
    div.append(btn);

    contenedorProductos.append(div);
});

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoProductos.innerHTML = "";
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        carrito.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `<h3>${producto.titulo}</h3>
            <p>$${producto.precio}</p>
            <p>Cant:${producto.cantidad}</p>
            <p>Subt:${producto.cantidad * producto.precio}</p>
            `;
            const btn = document.createElement("button");
            btn.classList.add("carrito-producto-btn");
            btn.innerText = "Eliminar";
            btn.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });
            div.append(btn);
            carritoProductos.append(div);
        });
    }
    actualizarTotal();
}

// función para agregar algún producto
const agregarAlCarrito = (producto) => {
    const productoEncontrado = carrito.find((item) => item.titulo === producto.titulo);
    if (productoEncontrado) {
        productoEncontrado.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
};

const borrarDelCarrito = (producto) => {
    const prodIndex = carrito.findIndex((item) => item.titulo === producto.titulo);
    carrito.splice(prodIndex, 1);
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
};

const actualizarTotal = () => {
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    carritoTotal.innerText = `$${total}`;
};
