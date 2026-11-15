/* Vistas V-06 — Catálogo de servicios */

/* ---- V-06a Lista de servicios ---- */
function listaServicios(gestiona) {
  function dibujar() {
    const busqueda = $('#q').value.trim().toLowerCase();

    const filas = [];
    for (let i = 0; i < datos.servicios.length; i++) {
      const s = datos.servicios[i];
      if (busqueda === '' || contieneTexto([s.nombre, s.descripcion], busqueda)) {
        const fila = [escapar(s.nombre), escapar(s.descripcion || '—'), formatoMoneda(s.precio)];
        if (gestiona) {
          fila.push('<a class="btn btn-secundario btn-pequeno" href="servicio-form.html?id=' + s.id + '">Editar<span class="solo-lectores"> ' + escapar(s.nombre) + '</span></a>');
        }
        filas.push(fila);
      }
    }

    const columnas = [
      { titulo: 'Servicio', fila: true },
      { titulo: 'Descripción' },
      { titulo: 'Precio', clase: 'numero' }
    ];
    if (gestiona) columnas.push(COLUMNA_ACCIONES);

    let htmlVacio = '<p>Sin registros.</p>';
    if (gestiona) htmlVacio += '<p class="acciones"><a class="btn btn-primario" href="servicio-form.html">Registrar servicio</a></p>';
    if (busqueda !== '') {
      htmlVacio = '<p>Sin coincidencias para “' + escapar(busqueda) + '”.</p>' +
        '<p class="acciones"><button type="button" class="btn btn-secundario" id="v-limpiar">Limpiar búsqueda</button></p>';
    }

    dibujarTabla('#tabla', 'Catálogo de servicios', columnas, filas, htmlVacio);
    conectarLimpiar(dibujar);
  }

  conectarBuscador(dibujar);
  dibujar();
}

/* ---- V-06b Formulario de servicio (registrar o editar) ---- */
function formularioServicio() {
  const id = parametro('id');
  const servicio = id ? buscar('servicios', id) : null;
  if (id && servicio === null) {
    location.replace('no-encontrado.html');
    return;
  }

  if (servicio !== null) {
    $('#titulo-pagina').textContent = 'Editar servicio';
    $('#miga-actual').textContent = 'Editar';
    $('#nombre').value = servicio.nombre;
    $('#descripcion').value = servicio.descripcion;
    $('#precio').value = servicio.precio;
  }

  const reglas = {
    nombre: function (valor) {
      for (let i = 0; i < datos.servicios.length; i++) {
        const otro = datos.servicios[i];
        if (otro.nombre.toLowerCase() === valor.trim().toLowerCase() && otro.id !== id) {
          return 'Ya existe un servicio con ese nombre.';
        }
      }
      return '';
    },
    precio: function (valor) {
      if (Number(valor) <= 0) return 'El precio debe ser mayor que 0.';
      return '';
    }
  };

  activarFormulario($('#form'), reglas, function () {
    const nuevosDatos = {
      nombre: $('#nombre').value.trim(),
      descripcion: $('#descripcion').value.trim(),
      precio: Number($('#precio').value)
    };

    if (servicio !== null) {
      Object.assign(servicio, nuevosDatos);
    } else {
      nuevosDatos.id = siguienteId('servicios', 'SRV');
      datos.servicios.push(nuevosDatos);
    }
    guardar();
    avisarDespues('exito', servicio !== null ? 'Servicio actualizado.' : 'Servicio guardado.');
    location.href = 'servicios.html';
  });
}

/* ---- Arranque: según la página en la que estamos ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  const vista = document.body.dataset.vista;
  if (vista === 'servicios-lista') listaServicios(pagina.gestiona);
  if (vista === 'servicio-form') formularioServicio();
}
