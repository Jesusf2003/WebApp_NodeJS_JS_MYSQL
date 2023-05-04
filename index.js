// Obtiene todos los tags <input> del documento
const inputs = document.querySelectorAll('input');

// Obtiene el tag cuyo Id sea password
const passwordField = document.getElementById('password');

// Obtiene el tag cuya propiedad sea X
const showPswdIcon = document.querySelector('i.bi-eye-fill');
const hidePswdIcon = document.querySelector('i.bi-eye-slash-fill');

// Revela o esconde la contraseña en el campo contraseña
function toggle() {
  // Si el campo password es de tipo 'text'
  if (passwordField.type == 'text') {
    // Cambiar a 'password' / Ocultar
    passwordField.type = 'password';
  // Si el campo password es de tipo 'password'
  } else if (passwordField.type == 'password') {
    // Cambiar a 'text' / Mostrar
    passwordField.type = 'text';
  }
}

// Patrones RegEx  para validación
const patterns = {
  username: /^[a-z\d]{5,12}$/i, // El usuario contiene 5 - 12 caracteres
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/, // El correo es válido
  userpass: /^[\w@_-]{8,30}$/i, // La contraseña tiene 8 - 20 caracteres y alfanuméricos
  phone: /^\d{9}$/, // El teléfono tiene 9 dígitos
};

// Función que realizará validación y responderá de la siguiente forma
const validate = (field, regex) => {
  const valid = regex.test(field.value);
  if (valid) {
    // Añade un marco verde cuando es válido
    field.className = 'form-control is-valid';
  } else {
    // Añade un marco rojo cuando no es válido
    field.className = 'form-control is-invalid';
  }
};

inputs.forEach((input) => {
  // Asignando un evento cuando el usuario escriba dentro de un input
  input.addEventListener('keyup', (e) => {
    // Hace la validación
    validate(e.target, patterns[e.target.attributes.name.value]);
  });
});

