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
  console.log("Acción de listar activda");
  option = 'editar';
});

fetch(MAIN_PATH
).then(response => {
  if (response.ok) {
    return response.json();
  }
}).then(data => {
  if (data) {
    console.log(data);
  }
});

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
