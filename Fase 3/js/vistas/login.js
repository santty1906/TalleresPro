/* Vista V-01 — Inicio de sesión */

/* Si ya hay una sesión, se va directo a la página de inicio de su rol */
const sesionPrevia = obtenerSesion();
if (sesionPrevia !== null) {
  location.replace(INICIO[sesionPrevia.rol]);
} else {
  mostrarAvisoPendiente();
  activarLogin();
}

function activarLogin() {
  const formulario = $('#form-login');
  const error = $('#error-login');
  const clave = $('#clave');
  const botonVer = $('#btn-ver');

  /* Botón "Ver / Ocultar" de la contraseña */
  botonVer.addEventListener('click', function () {
    const esVisible = clave.type === 'text';
    clave.type = esVisible ? 'password' : 'text';
    botonVer.textContent = esVisible ? 'Ver' : 'Ocultar';
    botonVer.setAttribute('aria-pressed', String(!esVisible));
  });

  function mostrarError(texto) {
    error.textContent = texto;
    error.hidden = false;
    error.focus();
  }

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    error.hidden = true;
    const correo = $('#correo').value;

    if (correo.trim() === '' || clave.value === '') {
      mostrarError('Indica correo y contraseña.');
      return;
    }

    const motivo = iniciarSesion(correo, clave.value);
    if (motivo === 'desactivada') {
      mostrarError('Cuenta desactivada. Contacta al administrador.');
    } else if (motivo === 'credenciales') {
      mostrarError('Correo o contraseña incorrectos.');
    } else {
      location.href = INICIO[obtenerSesion().rol];
    }
  });
}
