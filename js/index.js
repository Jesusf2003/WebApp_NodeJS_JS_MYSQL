const MAIN_PATH = "http://localhost:3000/api/";
let results = '';
const date = new Date();
let currentDate = date.getFullYear()+ "-"+ (date.getMonth() + 1)+ "-"+ date.getDate()
let currentDateFormatted = date.getDate()+ "/"+ (date.getMonth() + 1)+ "/"+ date.getFullYear();

const formTag = document.querySelector("form");

const namecli = document.getElementById("NAMECLI");
const lnamecli = document.getElementById("LNAMECLI");
const cellcli = document.getElementById("CELLCLI");

const getModal = document.getElementById("exampleModal");

var idValue;
var option = '';
var body = document.getElementById("form-client");

async function showContent() {
  const response = await fetch(MAIN_PATH + 'clients', {method: 'GET', headers: {'Accept': 'application/json'}});
  const data = await response.json();

  console.log(data);

  const table = document.getElementById("clientList");
  for (let i in data) {
    const newRow = table.insertRow(table.length);

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = data[i].IDCLI;

    const nameCell = newRow.insertCell(1);
    nameCell.innerHTML = data[i].NAMECLI;

    const lnameCell = newRow.insertCell(2);
    lnameCell.innerHTML = data[i].LNAMECLI;

    const cellCell = newRow.insertCell(3);
    cellCell.innerHTML = data[i].CELLCLI;

    const actionsCell = newRow.insertCell(4);

    actionsCell.innerHTML = `
      <a class="btn btn-danger" onClick='eliminar(this)'>
        <i class="bi bi-trash"></i>
      </a>
      <a class="btn btn-warning" onClick='passData(this)' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <i class="bi bi-pencil-fill"></i>
      </a>
    `;
  }
}

function resetForm() {
  body.innerHTML = `
    <input type="text" placeholder="Nombres" id="NAMECLI" class="form-control">
    <input type="text" placeholder="Apellidos" id="LNAMECLI" class="form-control">
    <input type="tel" placeholder="Celular" maxlength="9" id="CELLCLI" class="form-control">  
    <button id="btnCrear" type="submit" class="btn btn-primary">Crear</button>
  `;
  document.getElementById("NAMECLI").value = "";
  document.getElementById("LNAMECLI").value = "";
  document.getElementById("CELLCLI").value = "";
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
  fetch(MAIN_PATH + 'clients' + "/id/"+ dataSelected, {method: 'DELETE'});
}

let dates = fetch(
  MAIN_PATH + "dates/2020-01-01"
).then(
  res => res.json()
).then(
  data => {
    console.log("Mostrando data: " +data)
    if (data != null) {
      document.getElementById("showDate").innerHTML = `<p>Hoy es ${data.DATECAL} - ${data.NAMECAL}</p>`
    } else {
      document.getElementById("showDate").innerHTML = `<p>Hoy es ${currentDateFormatted}</p>`
    }
  }
);

function passData(id) {
  let table = id.parentElement.parentElement;
  let response = [table].map(
    tr => {
      return {
        idcli: tr.children[0].innerText,
        namecli: tr.children[1].innerText,
        lnamecli: tr.children[2].innerText,
        cellcli: tr.children[3].innerText
      };
    }
  );
  console.log(response);

  body.innerHTML = `
    <input type="text" placeholder="Nombres" id="NAMECLI" class="form-control">
    <input type="text" placeholder="Apellidos" id="LNAMECLI" class="form-control">
    <input type="tel" placeholder="Celular" maxlength="9" id="CELLCLI" class="form-control">
    <button id="btnEditar" type="submit" class="btn btn-warning" onclick=' option = "editar";'>Editar</button>
  `;
  this.idValue = response[0].idcli;
  document.getElementById("NAMECLI").value = response[0].namecli;
  document.getElementById("LNAMECLI").value = response[0].lnamecli;
  document.getElementById("CELLCLI").value = response[0].cellcli;
}

showContent();

formTag.addEventListener('submit',
  (e) => {
    e.preventDefault();
    if (option == 'crear') {
      if (namecli.value == "" && lnamecli.value == "" && cellcli.value == "") {
        alert("Asegúrese de que todos los campos estén completos");
        return false;
      } else {
        console.log("Todos los campos fueron llenados");
        let data = {
          NAMECLI: namecli.value,
          LNAMECLI: lnamecli.value,
          CELLCLI: cellcli.value
        }
        fetch(MAIN_PATH + 'clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
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
      if (namecli.value == "" || lnamecli.value == "" || cellcli.value == "") {
        alert("Asegúrese de que todos los campos estén completos");
        return false;
      } else {
        let data = {
          NAMECLI: namecli.value,
          LNAMECLI: lnamecli.value,
          CELLCLI: cellcli.value
        }
        console.log(data);
        fetch(MAIN_PATH + 'clients' + '/id/'+ idValue, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(
          response => response.json()
        )
        .then(
          response => location.reload()
        );
      }
    }
  }
);
