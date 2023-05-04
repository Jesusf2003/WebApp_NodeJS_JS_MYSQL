const inputs = document.querySelectorAll('input');
const passwordField = document.getElementById('password');
const showPswdIcon = document.querySelector('i.bi-eye-fill')
const hidePswdIcon = document.querySelector('i.bi-eye-slash-fill');

function toggle() {
  if (passwordField.type == 'text') {
    passwordField.type = 'password';
  } else if (passwordField.type == 'password') {
    passwordField.type = 'text';
  }
}

const patterns = {
  username: /^[a-z\d]{5,12}$/i, // El usuario contiene 5 - 12 caracteres
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/, // El correo es válido
  userpass: /^[\w@_-]{8,30}$/i, // La contraseña tiene 8 - 20 caracteres y alfanuméricos
  phone: /^\d{9}$/, // El teléfono tiene 9 dígitos
};

const validate = (field, regex) => {
  const valid = regex.test(field.value);
  if (valid) {
    field.className = 'form-control is-valid';
  } else {
    field.className = 'form-control is-invalid';
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.attributes.name.value]);
    console.log(""+ e.target)
  });
});

