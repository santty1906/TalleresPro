/* Vistas V-04 — Clientes: lista, formulario y detalle */

/* ---- V-04a Lista de clientes ---- */
function listaClientes(gestiona) {
  const botonRegistrar = gestiona ? '<a class="btn btn-primario" href="cliente-form.html">Registrar cliente</a>' : '';

  function dibujar() {
    const busqueda = $('#q').value.trim().toLowerCase();

    /* Se queda con los clientes que coinciden con la búsqueda */
    const filas = [];
    for (let i = 0; i < datos.clientes.length; i++) {
      const c = datos.clientes[i];
      if (busqueda === '' || contieneTexto([c.nombre, c.documento, c.telefono, c.correo], busqueda)) {
        filas.push([
          escapar(c.nombre),
          escapar(c.documento),
          escapar(c.telefono || '—'),
          insignia(c.activo ? 'Activo' : 'Inactivo'),
          '<a class="btn btn-secundario btn-pequeno" href="cliente-detalle.html?id=' + c.id + '">Ver<span class="solo-lectores"> a ' + escapar(c.nombre) + '</span></a>'
        ]);
      }
    }

    let htmlVacio = '<p>Sin registros.</p><p class="acciones">' + botonRegistrar + '</p>';
    if (busqueda !== '') {
      htmlVacio = '<p>Sin coincidencias para “' + escapar(busqueda) + '”.</p>' +
        '<p class="acciones"><button type="button" class="btn btn-secundario" id="v-limpiar">Limpiar búsqueda</button>' + botonRegistrar + '</p>';
    }

    dibujarTabla('#tabla', 'Lista de clientes', [
      { titulo: 'Nombre', fila: true },
      { titulo: 'Documento' },
      { titulo: 'Teléfono' },
      { titulo: 'Estado' },
      COLUMNA_ACCIONES
    ], filas, htmlVacio);
    conectarLimpiar(dibujar);
  }

  conectarBuscador(dibujar);
  dibujar();
}

/* ---- V-04b Formulario de cliente (registrar o editar) ---- */
function formularioCliente() {
  const id = parametro('id');
  const cliente = id ? buscar('clientes', id) : null;
  if (id && cliente === null) {
    location.replace('no-encontrado.html');
    return;
  }

  /* Si se está editando, se llenan los campos con los datos actuales */
  if (cliente !== null) {
    $('#titulo-pagina').textContent = 'Editar cliente';
    $('#miga-actual').textContent = 'Editar';
    $('#nombre').value = cliente.nombre;
    $('#documento').value = cliente.documento;
    $('#telefono').value = cliente.telefono;
    $('#correo').value = cliente.correo;
    $('#btn-cancelar').href = 'cliente-detalle.html?id=' + cliente.id;
  }

  const reglas = {
    documento: function (valor) {
      for (let i = 0; i < datos.clientes.length; i++) {
        const otro = datos.clientes[i];
        if (otro.documento.toLowerCase() === valor.trim().toLowerCase() && otro.id !== id) {
          return 'Ya existe un cliente con ese documento.';
        }
      }
      return '';
    }
  };

  activarFormulario($('#form'), reglas, function () {
    const nuevosDatos = {
      nombre: $('#nombre').value.trim(),
      documento: $('#documento').value.trim(),
      telefono: $('#telefono').value.trim(),
      correo: $('#correo').value.trim()
    };

    let idFinal;
    if (cliente !== null) {
      Object.assign(cliente, nuevosDatos);
      idFinal = cliente.id;
    } else {
      idFinal = siguienteId('clientes', 'CLI');
      nuevosDatos.id = idFinal;
      nuevosDatos.activo = true;
      datos.clientes.push(nuevosDatos);
    }
    guardar();
    avisarDespues('exito', cliente !== null ? 'Cliente actualizado.' : 'Cliente guardado.');
    location.href = 'cliente-detalle.html?id=' + idFinal;
  });
}

/* ---- V-04c Detalle del cliente ---- */
function detalleCliente(rol) {
  const c = buscar('clientes', parametro('id'));
  if (c === null) {
    location.replace('no-encontrado.html');
    return;
  }

  $('#det-nombre').textContent = c.nombre;
  document.title = c.nombre + ' · TalleresPro';
  $('#datos').innerHTML =
    '<div><dt>Documento</dt><dd>' + escapar(c.documento) + '</dd></div>' +
    '<div><dt>Teléfono</dt><dd>' + escapar(c.telefono || '—') + '</dd></div>' +
    '<div><dt>Correo</dt><dd>' + escapar(c.correo || '—') + '</dd></div>' +
    '<div><dt>Estado</dt><dd>' + insignia(c.activo ? 'Activo' : 'Inactivo') + '</dd></div>';

  const botonEditar = $('#btn-editar');
  if (botonEditar) botonEditar.href = 'cliente-form.html?id=' + c.id;
  const botonAgregar = $('#btn-agregar-veh');
  if (botonAgregar) botonAgregar.href = 'vehiculo-form.html?cliente=' + c.id;

  /* Tabla de vehículos del cliente */
  const filas = [];
  for (let i = 0; i < datos.vehiculos.length; i++) {
    const v = datos.vehiculos[i];
    if (v.clienteId === c.id) {
      let botonVer = '';
      if (puedeVer('vehiculos', rol)) {
        botonVer = '<a class="btn btn-secundario btn-pequeno" href="vehiculo-detalle.html?id=' + v.id + '">Ver<span class="solo-lectores"> vehículo ' + escapar(v.placa) + '</span></a>';
      }
      filas.push([escapar(v.placa), escapar(v.marca + ' ' + v.modelo + ' ' + v.anio), botonVer]);
    }
  }
  dibujarTabla('#tabla', 'Vehículos del cliente', [
    { titulo: 'Placa', fila: true },
    { titulo: 'Vehículo' },
    COLUMNA_ACCIONES
  ], filas, '<p>Este cliente aún no tiene vehículos registrados.</p>');

  /* Botón Desactivar: solo se muestra si el cliente está activo */
  const botonDesactivar = $('#btn-desactivar');
  if (botonDesactivar) {
    if (c.activo) {
      botonDesactivar.addEventListener('click', function () {
        let ordenesActivas = 0;
        for (let i = 0; i < datos.ordenes.length; i++) {
          if (datos.ordenes[i].clienteId === c.id && ordenActiva(datos.ordenes[i])) ordenesActivas++;
        }
        let aviso = '';
        if (ordenesActivas > 0) {
          aviso = ' Tiene ' + ordenesActivas + (ordenesActivas === 1 ? ' orden activa.' : ' órdenes activas.');
        }
        confirmar(
          '¿Desactivar cliente?',
          c.nombre + ' dejará de aparecer como activo. No se borra: sus datos y su historial se conservan.' + aviso,
          'Desactivar',
          true,
          function () {
            c.activo = false;
            guardar();
            avisarDespues('exito', 'Cliente desactivado.');
            location.href = 'clientes.html';
          }
        );
      });
    } else {
      botonDesactivar.remove();
    }
  }

  /* Botón Reactivar: solo se muestra si el cliente está inactivo */
  const botonReactivar = $('#btn-reactivar');
  if (botonReactivar) {
    if (!c.activo) {
      botonReactivar.addEventListener('click', function () {
        confirmar(
          '¿Reactivar cliente?',
          c.nombre + ' volverá a aparecer como activo. Sus datos y su historial se conservan.',
          'Reactivar',
          false,
          function () {
            c.activo = true;
            guardar();
            avisarDespues('exito', 'Cliente reactivado.');
            location.reload();
          }
        );
      });
    } else {
      botonReactivar.remove();
    }
  }
}

/* ---- Arranque: según la página en la que estamos ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  const vista = document.body.dataset.vista;
  if (vista === 'clientes-lista') listaClientes(pagina.gestiona);
  if (vista === 'cliente-form') formularioCliente();
  if (vista === 'cliente-detalle') detalleCliente(pagina.rol);
}
