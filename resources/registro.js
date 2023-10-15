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
				console.log("Todos los campos están completos");
				fetch(
					url,
					{
						method: 'POST',
						headers: {
							'content-Type': 'application/json'
						},
						body: JSON.stringify(
							{
								USERPED: USERPED.value,
								EMAUSPED: EMAUSPED.value,
								CELUSPED: CELUSPED.value,
								FOODPED: FOODPED.value,
								MSGPED: MSGPED.value
							}
						)
					}
				)
					.then(
						response => response.json()
					)
					.then(
						response => location.reload()
					);
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

function getData() {
	fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
		.then(res => res.json())
		.then(data => {
			buildTable(data)
		})
}

function buildTable(data) {
	if (data.length > 0) {
		let s = "";
		data.forEach((data) => {
			console.log(data);
			s += `
			<tr>
				<td>${data.IDPED}</td>
				<td>${data.USERPED}</td>
				<td>${data.MSGPED}</td>
			</tr>`
			tableBody.innerHTML = s;
		})
	}
}

init();