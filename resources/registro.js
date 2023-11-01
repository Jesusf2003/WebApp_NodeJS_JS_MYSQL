const url = "http://localhost:3000/api/pedido";
let resultados = '';

const formArticulo = document.querySelector("form");
const tableBody = document.querySelector("tbody#data");

const userped = document.getElementById("USERPED");
const emausped = document.getElementById("EMAUSPED");
const celusped = document.getElementById("CELUSPED");
const fooped = document.getElementById("FOODPED");
const msgped = document.getElementById("MSGPED");
var opcion = '';

btnCrear.addEventListener('click', () => {
	console.log("Acción de listar activada");
	opcion = 'crear';
});

formArticulo.addEventListener('submit',
	(e) => {
		e.preventDefault();
		if (opcion == 'crear') {
			if (USERPED.value == "" || EMAUSPED.value == "" || CELUSPED.value == "" || FOODPED.value == "" || MSGPED.value == "") {
				alert("Asegúrese de que todos los campos estén completos");
				return false;
			} else {
				insertData({
					USERPED: USERPED.value,
					EMAUSPED: EMAUSPED.value,
					CELUSPED: CELUSPED.value,
					FOODPED: FOODPED.value,
					MSGPED: MSGPED.value
				});
			}
		} else if (opcion == 'editar') {
			console.log("Activado el ");
		}
	}
);

function init() {
	getData();
}

tableBody.innerHTML = '';

function insertData(data) {
	fetch(url,
		{
			method: 'POST',
			headers: {
				'content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
	)
		.then(
			response => response.json()
		)
		.then(
			response => location.reload()
		);
}

function deleteDataById(id) {
	fetch(url + "/" + id, { method: 'DELETE' })
		.then(res => res.text())
		.then(res => console.log(res));
}

function getData() {
	fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
		.then(res => res.json())
		.then(data => {
			buildTable(data)
		})
}

function buildTable(data) {
	if (data.length > 0) {
		data.forEach((data) => {
			tableBody.innerHTML += `
			<tr>
				<td>${data['IDPED']}</td>
				<td>${data['USERPED']}</td>
				<td>${data['MSGPED']}</td>
				<td class="text-center">
					<button type="button" class="btn btn-warning">
						Editar
					</button>
					<button type="button" onClick='onDelete(this)' class="btn btn-danger">
						Eliminar
					</button>
				</td>
			</tr>`;
		})
	}
}

function onDelete(parent) {
	var cell = document.getElementById("data").rows[0].cells.length;
	console.log(cell);
}

init();