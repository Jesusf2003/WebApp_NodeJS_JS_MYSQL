const MAIN_PATH = "http://localhost:3000/api/clients";
const user = document.getElementById("userControlInput");
const password = document.getElementById("passwordControlInput");

async function go() {
  let credentials = {
    'NAMECLI': user.value,
    'CELLCLI': password.value
  }
  const result = await fetch(MAIN_PATH + "/auth", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(
    response => {return response.json()}
  );

  if(result.success == true) {
    alert("Usuario válido")
  } else if(result.success == false) {
    alert("Usuario inválido")
  }
}

function closeSession() {
  alert("Usted ha cerrado sesión");
  window.location.href = "./../index.html";
}
