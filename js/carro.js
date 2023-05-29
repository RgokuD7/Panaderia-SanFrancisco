document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const baseDeDatos = [
    {
      id: 1,
      nombre: "Marraqueta",
      precio: 3000,
      imagen: "img/pan/marraqueta.jpg",
      categoria: 1,
    },
    {
      id: 2,
      nombre: "Hallulla",
      precio: 3000,
      imagen: "img/pan/hallulla.jpg",
      categoria: 1,
    },
    {
      id: 3,
      nombre: "Dobladitas",
      precio: 3000,
      imagen: "img/pan/dobladitas.jpg",
      categoria: 1,
    },
    {
      id: 4,
      nombre: "Ciabatta",
      precio: 3000,
      imagen: "img/pan/ciabatta.jpg",
      categoria: 1,
    },
    {
      id: 5,
      nombre: "Baguette",
      precio: 3000,
      imagen: "img/pan/baguette.jpg",
      categoria: 1,
    },
    {
      id: 6,
      nombre: "Pan Masa Madre",
      precio: 3000,
      imagen: "img/pan/masamadre.jpg",
      categoria: 1,
    },
    {
      id: 7,
      nombre: "Pino de Horno",
      precio: 3000,
      imagen: "img/empanadas/pinohorno.jpg",
      categoria: 2,
    },
    {
      id: 8,
      nombre: "Queso de Horno",
      precio: 3000,
      imagen: "img/empanadas/quesohorno.jpg",
      categoria: 2,
    },
    {
      id: 9,
      nombre: "Queso Frita",
      precio: 3000,
      imagen: "img/empanadas/quesofrita.jpg",
      categoria: 2,
    },
    {
      id: 10,
      nombre: "Camaron Queso Frita",
      precio: 3000,
      imagen: "img/empanadas/camaronquesofrita.jpg",
      categoria: 2,
    },
    {
      id: 11,
      nombre: "Champiñon Queso Frita",
      precio: 3000,
      imagen: "img/empanadas/champinonquesofrita.jpg",
      categoria: 2,
    },
    {
      id: 12,
      nombre: "Ostión Queso Frita",
      precio: 3000,
      imagen: "img/empanadas/ostionquesofrita.jpg",
      categoria: 2,
    },
    {
      id: 13,
      nombre: "Churros con Azúcar",
      precio: 3000,
      imagen: "img/reposteria/churros.jpg",
      categoria: 3,
    },
    {
      id: 14,
      nombre: "Tartaleta de Manzana",
      precio: 3000,
      imagen: "img/reposteria/tartaleta.jpg",
      categoria: 3,
    },
    {
      id: 15,
      nombre: "Cupcake Vainilla",
      precio: 3000,
      imagen: "img/reposteria/cupcakevainilla.jpg",
      categoria: 3,
    },
    {
      id: 16,
      nombre: "Cupcake Chocolate",
      precio: 3000,
      imagen: "img/reposteria/cupcakechocolate.jpg",
      categoria: 3,
    },
    {
      id: 17,
      nombre: "Torta Mil Hojas",
      precio: 3000,
      imagen: "img/reposteria/tortamilhojas.jpg",
      categoria: 3,
    },
    {
      id: 18,
      nombre: "Torta Selva Negra",
      precio: 3000,
      imagen: "img/reposteria/tortaselvanegra.jpg",
      categoria: 3,
    },
  ];

  let carrito = [];
  const miLocalStorage = window.localStorage;
  var divisa = cargarDivisa().divisa;
  var valorDivisa = cargarDivisa().valorDivisa;
  const DOMitems = document.querySelector("#items");
  const DOMcarrito = document.querySelector("#carrito");
  const DOMtotal = document.querySelector("#total");
  const DOMbotonVaciar = document.querySelector("#boton-vaciar");
  var currentPage = window.location.pathname.split("/").pop();
  if (currentPage == "pan.html") {
    tipoProducto = 1;
  } else if (currentPage == "empanadas.html") {
    tipoProducto = 2;
  } else if (currentPage == "reposteria.html") {
    tipoProducto = 3;
  } else if (currentPage == "carrito.html") {
    tipoProducto = 4;
  }

  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
      dropdown.querySelector(".dropdown-menu").classList.toggle("show");
    });
  });

  // Funciones

  /**
   * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
   */
  function renderizarProductos() {
    DOMitems.textContent = "";
    baseDeDatos.forEach((info) => {
      // Estructura
      const miNodo = document.createElement("div");
      miNodo.classList.add("producto");
      // Titulo
      const miNodoTitle = document.createElement("h4");
      miNodoTitle.classList.add("titulo");
      miNodoTitle.textContent = info.nombre;
      // Imagen
      const miNodoImagen = document.createElement("img");
      miNodoImagen.setAttribute("src", info.imagen);
      const agregar = document.createElement("div");
      agregar.classList.add("agregar");
      // Precio
      const miNodoPrecio = document.createElement("h5");
      miNodoPrecio.classList.add("precio");
      const precio = Math.round(valorDivisa * info.precio* 100) / 100;
      var precioFinal = precio.toLocaleString("en-IN");
      miNodoPrecio.textContent = `${precioFinal} ${divisa}`;
      // Boton
      const miNodoBoton = document.createElement("button");
      miNodoBoton.classList.add(
        "btn-agregar",
        "fa-solid",
        "fa-cart-arrow-down"
      );
      miNodoBoton.setAttribute("marcador", info.id);
      miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);
      // Insertamos
      if (info.categoria == tipoProducto) {
        miNodo.appendChild(miNodoImagen);
        miNodo.appendChild(miNodoTitle);
        agregar.appendChild(miNodoPrecio);
        agregar.appendChild(miNodoBoton);
        miNodo.appendChild(agregar);
        DOMitems.appendChild(miNodo);
      }
    });
  }

  /**
   * Evento para añadir un producto al carrito de la compra
   */
  function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute("marcador"));
    // Actualizamos el carrito
    renderizarCarrito();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
  }
  function eliminarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el botón pulsado
    const id = evento.target.dataset.item;
    // Buscamos el índice del elemento a eliminar en el carrito
    const index = carrito.findIndex((carritoId) => carritoId === id);
    // Si se encuentra el elemento, lo eliminamos del carrito
    if (index !== -1) {
      carrito.splice(index, 1);
    }
    // volvemos a renderizar
    renderizarCarrito();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
  }
  /**
   * Dibuja todos los productos guardados en el carrito
   */
  function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = "";
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
      // Obtenemos el item que necesitamos de la variable base de datos
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        // ¿Coincide las id? Solo puede existir un caso
        return itemBaseDatos.id === parseInt(item);
      });
      // Cuenta el número de veces que se repite el producto
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
        // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
        return itemId === item ? (total += 1) : total;
      }, 0);
      // Creamos el nodo del item del carrito
      var precioFinal = Math.round(miItem[0].precio * valorDivisa * 100) / 100;
      precioFinal = precioFinal.toLocaleString("en-IN");
      const miNodo = document.createElement("li");
      miNodo.classList.add("item-carrito");
      const totalItem = document.createElement("p");
      totalItem.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${precioFinal} ${divisa}`;
      
      // Boton de agregar
      const botonAgregar = document.createElement("button");
      botonAgregar.classList.add("btn-agregar", "fa-solid", "fa-plus");
      botonAgregar.setAttribute("marcador", item);
      botonAgregar.addEventListener("click", anyadirProductoAlCarrito);
      // Boton de eliminar
      const botonEliminar = document.createElement("button");
      botonEliminar.classList.add("btn-eliminar", "fa-solid", "fa-minus");
      botonEliminar.dataset.item = item;
      botonEliminar.addEventListener("click", eliminarItemCarrito);
      // Boton de borrar
      const miBoton = document.createElement("button");
      miBoton.classList.add("btn-eliminar", "fa-solid", "fa-trash");
      miBoton.dataset.item = item;
      miBoton.addEventListener("click", borrarItemCarrito);
      if (tipoProducto == 4) {
        const imagen = document.createElement("img");
        imagen.setAttribute("src", miItem[0].imagen);
        miNodo.appendChild(imagen);
      }
      // Mezclamos nodos
      miNodo.appendChild(totalItem);
      miNodo.appendChild(botonAgregar);
      miNodo.appendChild(botonEliminar);
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    $("#div").html(divisa);
    DOMtotal.textContent = calcularTotal().toLocaleString("en-IN");
  }

  /**
   * Evento para borrar un elemento del carrito
   */
  function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
  }
  /**
   * Calcula el precio total teniendo en cuenta los productos repetidos
   */
  function calcularTotal() {
    // Recorremos el array del carrito
    return carrito.reduce((total, item) => {
      // De cada elemento obtenemos su precio
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });
      // Los sumamos al total
      var totalCarro =
        Math.round((total + miItem[0].precio * valorDivisa) * 100) / 100;
      return totalCarro;
    }, 0);
  }

  /**
   * Varia el carrito y vuelve a dibujarlo
   */
  function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    // Borra LocalStorage
    localStorage.clear();
  }

  function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem("carrito", JSON.stringify(carrito));
  }

  $(".divisas").on("change", function () {
    var selectedOption = $(this).children("option:selected");
    divisa = selectedOption.text();
    valorDivisa = $(this).val();
    guardarDivisa();
    renderizarCarrito();
    renderizarProductos();
  });

  function guardarDivisa() {
    miLocalStorage.setItem("divisa", JSON.stringify(divisa));
    miLocalStorage.setItem("valorDivisa", JSON.stringify(valorDivisa));
  }

  function cargarDivisa() {
    if (miLocalStorage.getItem("divisa") !== null) {
      // Carga la información
      var divisa = JSON.parse(miLocalStorage.getItem("divisa"));
    } else {
      var divisa = "CLP";
    }
    if (miLocalStorage.getItem("valorDivisa") !== null) {
      // Carga la información
      var valorDivisa = JSON.parse(miLocalStorage.getItem("valorDivisa"));
    } else {
      var valorDivisa = 1;
    }
    return { divisa, valorDivisa };
  }

  function cargarCarritoDeLocalStorage() {
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem("carrito") !== null) {
      // Carga la información
      carrito = JSON.parse(miLocalStorage.getItem("carrito"));
    }
  }

  // Eventos
  DOMbotonVaciar.addEventListener("click", vaciarCarrito);

  // Inicio
  cargarCarritoDeLocalStorage();
  if (tipoProducto != 4) {
    renderizarProductos();
  }
  renderizarCarrito();
});
