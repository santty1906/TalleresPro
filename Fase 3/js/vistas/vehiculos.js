/* Vistas V-05 — Vehículos: lista, formulario y detalle con historial */

/* ---- V-05a Lista de vehículos ---- */
function listaVehiculos(gestiona) {
  function dibujar() {
    const busqueda = $('#q').value.trim().toLowerCase();

    const filas = [];
    for (let i = 0; i < datos.vehiculos.length; i++) {
      const v = datos.vehiculos[i];
      if (busqueda === '' || contieneTexto([v.placa, v.marca, v.modelo, nombreCliente(v.clienteId)], busqueda)) {
        filas.push([
          escapar(v.placa),
          escapar(v.marca + ' ' + v.modelo + ' ' + v.anio),
          escapar(nombreCliente(v.clienteId)),
          '<a class="btn btn-secundario btn-pequeno" href="vehiculo-detalle.html?id=' + v.id + '">Ver<span class="solo-lectores"> vehículo ' + escapar(v.placa) + '</span></a>'
        ]);
      }
    }

    let htmlVacio = '<p>Sin registros.</p>';
    if (gestiona) htmlVacio += '<p class="acciones"><a class="btn btn-primario" href="vehiculo-form.html">Registrar vehículo</a></p>';
    if (busqueda !== '') {
      htmlVacio = '<p>Sin coincidencias para “' + escapar(busqueda) + '”.</p>' +
        '<p class="acciones"><button type="button" class="btn btn-secundario" id="v-limpiar">Limpiar búsqueda</button></p>';
    }

    dibujarTabla('#tabla', 'Lista de vehículos', [
      { titulo: 'Placa', fila: true },
      { titulo: 'Vehículo' },
      { titulo: 'Cliente' },
      COLUMNA_ACCIONES
    ], filas, htmlVacio);
    conectarLimpiar(dibujar);
  }

  conectarBuscador(dibujar);
  dibujar();
}

/* ---- V-05b Formulario de vehículo (registrar o editar) ---- */
function formularioVehiculo() {
  const id = parametro('id');
  const vehiculo = id ? buscar('vehiculos', id) : null;
  if (id && vehiculo === null) {
    location.replace('no-encontrado.html');
    return;
  }

  /* Cliente dueño: el del vehículo si se edita, o el que venga en la dirección */
  const clientePrevio = vehiculo !== null ? vehiculo.clienteId : parametro('cliente');
  const opcionesClientes = [];
  for (let i = 0; i < datos.clientes.length; i++) {
    const c = datos.clientes[i];
    if (c.activo || c.id === clientePrevio) opcionesClientes.push([c.id, c.nombre + ' (' + c.documento + ')']);
  }
  llenarSelect($('#clienteId'), 'Elige un cliente', opcionesClientes, clientePrevio);

  if (vehiculo !== null) {
    $('#titulo-pagina').textContent = 'Editar vehículo';
    $('#miga-actual').textContent = 'Editar';
    $('#placa').value = vehiculo.placa;
    $('#marca').value = vehiculo.marca;
    $('#modelo').value = vehiculo.modelo;
    $('#anio').value = vehiculo.anio;
    $('#color').value = vehiculo.color;
    $('#btn-cancelar').href = 'vehiculo-detalle.html?id=' + vehiculo.id;
  } else if (clientePrevio) {
    $('#btn-cancelar').href = 'cliente-detalle.html?id=' + clientePrevio;
  }

  const reglas = {
    placa: function (valor) {
      for (let i = 0; i < datos.vehiculos.length; i++) {
        const otro = datos.vehiculos[i];
        if (otro.placa.toLowerCase() === valor.trim().toLowerCase() && otro.id !== id) {
          return 'La placa ya está registrada.';
        }
      }
      return '';
    },
    anio: function (valor) {
      if (Number(valor) > new Date().getFullYear() + 1) return 'Escribe un año válido.';
      return '';
    }
  };

  activarFormulario($('#form'), reglas, function () {
    const nuevosDatos = {
      clienteId: $('#clienteId').value,
      placa: $('#placa').value.trim().toUpperCase(),
      marca: $('#marca').value.trim(),
      modelo: $('#modelo').value.trim(),
      anio: Number($('#anio').value),
      color: $('#color').value.trim()
    };

    let idFinal;
    if (vehiculo !== null) {
      Object.assign(vehiculo, nuevosDatos);
      idFinal = vehiculo.id;
    } else {
      idFinal = siguienteId('vehiculos', 'VEH');
      nuevosDatos.id = idFinal;
      datos.vehiculos.push(nuevosDatos);
    }
    guardar();
    avisarDespues('exito', vehiculo !== null ? 'Vehículo actualizado.' : 'Vehículo guardado y asociado al cliente.');
    location.href = 'vehiculo-detalle.html?id=' + idFinal;
  });
}

/* ---- V-05c Detalle del vehículo con su historial de reparaciones ---- */
function detalleVehiculo(rol) {
  const v = buscar('vehiculos', parametro('id'));
  if (v === null) {
    location.replace('no-encontrado.html');
    return;
  }

  $('#det-nombre').textContent = v.marca + ' ' + v.modelo + ' · ' + v.placa;
  document.title = v.placa + ' · TalleresPro';

  /* El nombre del cliente es un enlace solo si este rol puede ver clientes */
  let cliente = escapar(nombreCliente(v.clienteId));
  if (puedeVer('clientes', rol)) cliente = '<a href="cliente-detalle.html?id=' + v.clienteId + '">' + cliente + '</a>';

  $('#datos').innerHTML =
    '<div><dt>Cliente</dt><dd>' + cliente + '</dd></div>' +
    '<div><dt>Placa</dt><dd>' + escapar(v.placa) + '</dd></div>' +
    '<div><dt>Marca y modelo</dt><dd>' + escapar(v.marca + ' ' + v.modelo) + '</dd></div>' +
    '<div><dt>Año</dt><dd>' + v.anio + '</dd></div>' +
    '<div><dt>Color</dt><dd>' + escapar(v.color || '—') + '</dd></div>';

  const botonEditar = $('#btn-editar');
  if (botonEditar) botonEditar.href = 'vehiculo-form.html?id=' + v.id;
  const botonOrden = $('#btn-orden');
  if (botonOrden) botonOrden.href = 'orden-nueva.html?cliente=' + v.clienteId + '&vehiculo=' + v.id;

  /* Historial: las órdenes de este vehículo */
  const filas = [];
  for (let i = 0; i < datos.ordenes.length; i++) {
    const o = datos.ordenes[i];
    if (o.vehiculoId === v.id) {
      let botonVer = '';
      if (puedeVer('orden-detalle', rol)) {
        botonVer = '<a class="btn btn-secundario btn-pequeno" href="orden-detalle.html?id=' + o.id + '">Ver<span class="solo-lectores"> orden ' + o.id + '</span></a>';
      }
      filas.push([escapar(o.id), formatoFecha(o.fecha), escapar(o.problema), insignia(o.estado), botonVer]);
    }
  }
  dibujarTabla('#tabla', 'Reparaciones del vehículo', [
    { titulo: 'Orden', fila: true },
    { titulo: 'Fecha' },
    { titulo: 'Problema' },
    { titulo: 'Estado' },
    COLUMNA_ACCIONES
  ], filas, '<p>Este vehículo aún no tiene reparaciones.</p>');
}

/* ---- Arranque: según la página en la que estamos ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  const vista = document.body.dataset.vista;
  if (vista === 'vehiculos-lista') listaVehiculos(pagina.gestiona);
  if (vista === 'vehiculo-form') formularioVehiculo();
  if (vista === 'vehiculo-detalle') detalleVehiculo(pagina.rol);
}
