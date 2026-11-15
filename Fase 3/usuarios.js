/* Vistas V-03 — Usuarios y roles */

/* ---- V-03a Lista de usuarios ---- */
function listaUsuarios() {
  function dibujar() {
    const busqueda = $('#q').value.trim().toLowerCase();

    const filas = [];
    for (let i = 0; i < datos.usuarios.length; i++) {
      const u = datos.usuarios[i];
      if (busqueda === '' || contieneTexto([u.nombre, u.correo, ROLES[u.rol]], busqueda)) {
        filas.push([
          escapar(u.nombre),
          escapar(u.correo),
          escapar(ROLES[u.rol]),
          insignia(u.activo ? 'Activo' : 'Inactivo'),
          '<a class="btn btn-secundario btn-pequeno" href="usuario-form.html?id=' + u.id + '">Editar<span class="solo-lectores"> a ' + escapar(u.nombre) + '</span></a>'
        ]);
      }
    }

    let htmlVacio = '<p>Sin registros.</p><p class="acciones"><a class="btn btn-primario" href="usuario-form.html">Registrar usuario</a></p>';
    if (busqueda !== '') {
      htmlVacio = '<p>Sin coincidencias para “' + escapar(busqueda) + '”.</p>' +
        '<p class="acciones"><button type="button" class="btn btn-secundario" id="v-limpiar">Limpiar búsqueda</button></p>';
    }

    dibujarTabla('#tabla', 'Usuarios del sistema', [
      { titulo: 'Nombre', fila: true },
      { titulo: 'Correo' },
      { titulo: 'Rol' },
      { titulo: 'Estado' },
      COLUMNA_ACCIONES
    ], filas, htmlVacio);
    conectarLimpiar(dibujar);
  }

  conectarBuscador(dibujar);
  dibujar();
}

/* ---- V-03b Formulario de usuario (registrar o editar) ---- */
function formularioUsuario(sesion) {
  const id = parametro('id');
  const usuario = id ? buscar('usuarios', id) : null;
  if (id && usuario === null) {
    location.replace('no-encontrado.html');
    return;
  }

  if (usuario !== null) {
    $('#titulo-pagina').textContent = 'Editar usuario';
    $('#miga-actual').textContent = 'Editar';
    $('#nombre').value = usuario.nombre;
    $('#correo').value = usuario.correo;
    $('#rol').value = usuario.rol;
    $('#activo').checked = usuario.activo;
    $('#bloque-activo').hidden = false;
    /* Al editar, la contraseña es opcional */
    $('#clave').removeAttribute('required');
    $('label[for="clave"]').innerHTML = 'Contraseña nueva';
    $('#clave-ayuda').textContent = 'Déjala vacía para conservar la actual. Si la cambias, mínimo 8 caracteres.';
  }

  const reglas = {
    correo: function (valor) {
      for (let i = 0; i < datos.usuarios.length; i++) {
        const otro = datos.usuarios[i];
        if (otro.correo.toLowerCase() === valor.trim().toLowerCase() && otro.id !== id) {
          return 'Ya existe un usuario con ese correo.';
        }
      }
      return '';
    },
    clave: function (valor) {
      if (valor !== '' && valor.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
      return '';
    }
  };

  activarFormulario($('#form'), reglas, function () {
    const activo = usuario !== null ? $('#activo').checked : true;

    /* Nadie puede desactivar su propia cuenta mientras está conectado */
    if (usuario !== null && !activo && usuario.id === sesion.id) {
      mostrarAviso('error', 'No puedes desactivar tu propia cuenta mientras estás conectado.');
      return;
    }

    const nuevosDatos = {
      nombre: $('#nombre').value.trim(),
      correo: $('#correo').value.trim(),
      rol: $('#rol').value,
      activo: activo
    };

    if (usuario !== null) {
      Object.assign(usuario, nuevosDatos);
      if ($('#clave').value !== '') usuario.clave = $('#clave').value;
    } else {
      nuevosDatos.id = siguienteId('usuarios', 'USR');
      nuevosDatos.clave = $('#clave').value;
      datos.usuarios.push(nuevosDatos);
    }
    guardar();
    avisarDespues('exito', usuario !== null ? 'Usuario actualizado.' : 'Usuario guardado.');
    location.href = 'usuarios.html';
  });
}

/* ---- Arranque: según la página en la que estamos ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  const vista = document.body.dataset.vista;
  if (vista === 'usuarios-lista') listaUsuarios();
  if (vista === 'usuario-form') formularioUsuario(pagina.sesion);
}
