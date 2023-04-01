document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Marraqueta',
            precio: 3000,
            imagen: "img\\pan\\marraqueta.jpg",
            categoria: 1
        },
        {
            id: 2,
            nombre: 'Hallulla',
            precio: 1.2,
            imagen: "img\\pan\\hallulla.jpg",
            categoria: 1
        },
        {
            id: 3,
            nombre: 'Dobladitas',
            precio: 2.1,
            imagen: "img\\pan\\dobladitas.jpg",
            categoria: 1
        },
        {
            id: 4,
            nombre: 'Ciabatta',
            precio: 0.6,
            imagen: "img\\pan\\ciabatta.jpg",
            categoria: 1
        },
        {
            id: 5,
            nombre: 'Baguette',
            precio: 0.6,
            imagen: "img\\pan\\baguette.jpg",
            categoria: 1
        },
        {    id: 6,
            nombre: 'Pan Masa Madre',
            precio: 3000,
            imagen: "img\\pan\\masamadre.jpg",
            categoria: 1
        },
        {    id: 7,
            nombre: 'Pino de Horno',
            precio: 3000,
            imagen: 'img/empanadas/pinohorno.jpg',
            categoria: 2
        },
        {    id: 8,
            nombre: 'Queso de Horno',
            precio: 3000,
            imagen: 'img/empanadas/quesohorno.jfif',
            categoria: 2
        },
        {    id: 9,
            nombre: 'Queso Frita',
            precio: 3000,
            imagen: '',
            categoria: 2
        },
        {    id: 10,
            nombre: 'Camaron Queso Frita',
            precio: 3000,
            imagen: '',
            categoria: 2
        },
        {    id: 11,
            nombre: 'Champiñon Queso Frita',
            precio: 3000,
            imagen: '',
            categoria: 2
        },
        {    id: 12,
            nombre: 'Ostión Queso Frita',
            precio: 3000,
            imagen: '',
            categoria: 2
        },
        {    id: 13,
            nombre: 'Churros',
            precio: 3000,
            imagen: '',
            categoria: 3
        },
        {    id: 14,
            nombre: 'Tartaleta de Manzana',
            precio: 3000,
            imagen: '',
            categoria: 3
        },
        {    id: 15,
            nombre: 'Cupcake Vainilla',
            precio: 3000,
            imagen: '',
            categoria: 3
        },
        {    id: 16,
            nombre: 'Cupcake Chocolate',
            precio: 3000,
            imagen: '',
            categoria: 3
        },
        {    id: 17,
            nombre: 'Torta Mil Hojas',
            precio: 3000,
            imagen: '',
            categoria: 3
        },
        {    id: 18,
            nombre: 'Torta Selva Negra',
            precio: 3000,
            imagen: '',
            categoria: 3
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;
    if (currentPage == 'pan.html'){
        tipoProducto = 1;
    }
    else if (currentPage == 'empanadas.html'){
        tipoProducto = 2;
    }
    else if (currentPage == 'reposteria.html'){
        tipoProducto = 3;
    }

    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    dropdown.querySelector('.dropdown-menu').classList.toggle('show');
  });
});

    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.classList.add('img-card');
            miNodoImagen.setAttribute("src", info.imagen);
        
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            if (info.categoria == tipoProducto) {

                miNodoCardBody.appendChild(miNodoImagen);
                miNodoCardBody.appendChild(miNodoTitle);
                miNodoCardBody.appendChild(miNodoPrecio);
                miNodoCardBody.appendChild(miNodoBoton);
                miNodo.appendChild(miNodoCardBody);
                DOMitems.appendChild(miNodo);
            }
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
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
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
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
            return total + miItem[0].precio;
        }, 0).toFixed(2);
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

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});
