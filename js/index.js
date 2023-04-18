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

function eliminar(id) {
  fetch(MAIN_PATH+"/id/"+id, {method: 'DELETE'});
}

async function showContent() {
  const response = await fetch(MAIN_PATH, {method: 'GET', headers: {'Accept': 'application/json'}});
  const btnEliminar = "";
  const data = await response.json();

  console.log(data);

  let iterator = "<tr>";

  for (let i in data) {
    iterator += `
        <td id="idclic-${data[i].IDCLI}">${data[i].IDCLI}</td>
        <td>${data[i].NAMECLI}</td>
        <td>${data[i].CELLCLI}</td>
        <td>
          <button>Eliminar</button>
        </td>
      </tr>
    `
  }
  document.getElementById("dataset").innerHTML = iterator;
}

showContent();

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
