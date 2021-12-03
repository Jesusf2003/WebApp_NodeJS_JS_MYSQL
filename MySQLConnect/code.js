//Definición de variables
const url = "http://localhost:3000/api/articulos/";
const contenedor = document.querySelector("tbody");
let resultados = "";

const modalArticulo = new bootstrap.Modal(
    document.getElementById("modalArticulo")
);
const formArticulo = document.querySelector("form");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");
const estado = document.getElementById("estado");
var opcion = "";

function NumFormatter (data) {
	return parseFloat(data).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
};

btnCrear.addEventListener("click", () => {
    descripcion.value = "";
    precio.value = "";
    stock.value = "";
    modalArticulo.show();
    opcion = "crear";
});

function NumFormatter (data) {
	return parseFloat(data).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
};

//funcion para mostrar los resultados
const mostrar = (articulos) => {
    articulos.forEach((articulo) => {
        resultados += `<tr>
                            <td style="text-align:center;">${articulo.id}</td>
                            <td>${articulo.descripcion}</td>
                            <td style="text-align:center;">${articulo.precio}</td>
                            <td style="text-align:center;">${articulo.stock}</td>
                            <td class="text-center">
                                <i style="margin-right: 0.5em" class="btnEditar bi bi-pencil-square"></i>
                                <i style="margin-left: 0.5em" class="btnBorrar bi bi-trash"></i>
                       </tr>
                    `;
    });
    contenedor.innerHTML = resultados;
};

//Procedimiento Mostrar
fetch(url)
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .catch((error) => console.log(error));

const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

// Procedimiento para eliminar de la base de datos
/* on(document, "click", ".btnBorrar", e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    alertify.confirm("This is a confirm dialog.",
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(
                    res => res.json()
                )
                .then(
                    () => location.reload()
                );
            alertify.success('Registro borrado');
        },
        function () {
            alertify.error('Eliminación candelada');
        });
}); */

on(document, "click", ".btnBorrar",
    e => {
        const fila = e.target.parentNode.parentNode;
        const id = fila.firstElementChild.innerHTML;
        alertify.confirm('¿Está seguro de eliminar este producto?',
            function () {
                fetch(url + "eliminar/" + id, {
                    method: 'PUT'
                })
                    .then(
                        res => res.json()
                    )
                    .then(
                        () => location.reload()
                    );
                alertify.success('Registro eliminado');
            },
            function () {
                alertify.error('Eliminación cancelada');
            }
        );
    }
);

// Procedimiento de editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const descripcionForm = fila.children[1].innerHTML;
    const precioForm = fila.children[2].innerHTML;
    const stockForm = fila.children[3].innerHTML;
    console.log(`
        ID: ${idForm},
        DESCRIPCION: ${descripcionForm},
        PRECIO: ${precioForm},
        STOCK: ${stockForm}
    `);
    descripcion.value = descripcionForm;
    precio.value = precioForm;
    stock.value = stockForm;
    opcion = 'editar';
    modalArticulo.show();
});

// Procedimiento para crear y editar
formArticulo.addEventListener(
    'submit',
    (e) => {
        e.preventDefault();
        if (opcion == 'crear') {
            // console.log('Registrar');
            fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        descripcion: descripcion.value,
                        precio: precio.value,
                        stock: stock.value
                    })
                }
            )
                .then(
                    response => response.json()
                )
                .then(
                    data => {
                        const nuevoArticulo = [];
                        nuevoArticulo.push(data);
                        mostrar(nuevoArticulo);
                    }
                );
        }
        if (opcion == 'editar') {
            fetch(
                url + idForm,
                {
                    method: 'PUT',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        descripcion: descripcion.value,
                        precio: precio.value,
                        stock: stock.value
                    })
                }
            )
                .then(
                    response => response.json()
                )
                .then(
                    response => location.reload()
                );
            modalArticulo.hide();
        }
        modalArticulo.hide();
    }
);
