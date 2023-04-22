const MAIN_PATH = "http://localhost:3000/api/clients";
let results = '';

const formTag = document.querySelector("form");

const namecli = document.getElementById("NAMECLI");
const lnamecli = document.getElementById("LNAMECLI");
const cellcli = document.getElementById("CELLCLI");

var idValue = 1;
var option = '';

btnCrear.addEventListener("click", () => {
  console.log("Acción de listar activada");
  option = 'crear';
});

btnEditar.addEventListener("click", () => {
  console.log("Acción de listar activada");
  option = 'editar';
});

async function showContent() {
  const response = await fetch(MAIN_PATH, {method: 'GET', headers: {'Accept': 'application/json'}});
  const data = await response.json();

  console.log(data);

  const table = document.getElementById("clientList");
  for (let i in data) {
    const newRow = table.insertRow(table.length);

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = data[i].IDCLI;

    const nameCell = newRow.insertCell(1);
    nameCell.innerHTML = data[i].LNAMECLI + ", " + data[i].NAMECLI;

    const cellCell = newRow.insertCell(2);
    cellCell.innerHTML = data[i].CELLCLI;

    const actionsCell = newRow.insertCell(3);
    actionsCell.innerHTML = `
      <a onClick='eliminar(this)'>Eliminar</a>
      <a>Editar</a>
    `;
  }
}

function eliminar(id) {
  // fetch(MAIN_PATH+"/id/"+
  let table = id.parentElement.parentElement;
  let response = [table].map(
    tr => {
      return {
        idcli: tr.children[0].innerText
      };
    }
  )

  let dataSelected = response[0].idcli;
  fetch(MAIN_PATH + "/id/"+ dataSelected, {method: 'DELETE'});
}

showContent();

async function showContentById(id) {
  const response = await fetch(MAIN_PATH + "/id/"+ id, {method: 'GET', headers: {'Content-Type': 'application/json'}});
}

formTag.addEventListener('submit',
  (e) => {
    e.preventDefault();
    if (option == 'crear') {
      if (namecli.value == "" || lnamecli.value == "" || cellcli.value == "") {
        alert("Asegúrese de que todos los campos estén completos");
        return false;
      } else {
        console.log("Todos los campos fueron llenados");
        fetch(MAIN_PATH, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            NAMECLI: namecli.value,
            LNAMECLI: lnamecli.value,
            CELLCLI: cellcli.value
          })
        })
        .then(
          response => response.json()
        )
        .then(
          response => location.reload()
        );
      }
    } else if(option == 'editar') {
      console.log("Escogió editar");
      fetch(MAIN_PATH + '/id/'+ idValue, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          NAMECLI: namecli.value,
          LNAMECLI: lnamecli.value,
          CELLCLI: cellcli.value
        })
      })
      .then(
        response => response.json()
      )
      .then(
        response => location.reload()
      );
    }
  }
);
