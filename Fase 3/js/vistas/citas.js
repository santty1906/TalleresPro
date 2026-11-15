/* Vistas V-07 — Citas: agenda y formulario */

/* ---- V-07a Agenda de citas ---- */
function agendaCitas() {
  $('#fecha').value = parametro('fecha') || HOY;

  function dibujar() {
    const fecha = $('#fecha').value;
    const estado = $('#estado').value;

    /* Citas que cumplen los filtros */
    const citas = [];
    for (let i = 0; i < datos.citas.length; i++) {
      const c = datos.citas[i];
      if ((fecha === '' || c.fecha === fecha) && (estado === '' || c.estado === estado)) citas.push(c);
    }
    /* Ordenadas por fecha y hora */
    citas.sort(function (a, b) {
      return (a.fecha + a.hora).localeCompare(b.fecha + b.hora);
    });

    const filas = [];
    for (let i = 0; i < citas.length; i++) {
      const c = citas[i];
      const servicio = buscar('servicios', c.servicioId);
      let botones = '';
      if (c.estado === 'Agendada') {
        botones =
          '<a class="btn btn-secundario btn-pequeno" href="orden-nueva.html?cita=' + c.id + '">Crear orden</a> ' +
          '<a class="btn btn-secundario btn-pequeno" href="cita-form.html?id=' + c.id + '">Editar</a> ' +
          '<button type="button" class="btn btn-peligro btn-pequeno" data-cancelar="' + c.id + '">Cancelar cita</button>';
      }
      filas.push([
        formatoFecha(c.fecha),
        c.hora,
        escapar(nombreCliente(c.clienteId)),
        escapar(rotuloVehiculo(c.vehiculoId)),
        escapar(servicio ? servicio.nombre : 'Sin definir'),
        insignia(c.estado),
        botones
      ]);
    }

    dibujarTabla('#tabla', fecha ? 'Citas del ' + formatoFecha(fecha) : 'Todas las citas', [
      { titulo: 'Fecha' },
      { titulo: 'Hora', fila: true },
      { titulo: 'Cliente' },
      { titulo: 'Vehículo' },
      { titulo: 'Servicio' },
      { titulo: 'Estado' },
      COLUMNA_ACCIONES
    ], filas, '<p>Sin registros para estos filtros.</p><p class="acciones"><a class="btn btn-primario" href="cita-form.html">Agendar cita</a></p>');
  }

  $('#form-buscar').addEventListener('submit', function (e) {
    e.preventDefault();
    dibujar();
  });
  $('#btn-limpiar').addEventListener('click', function () {
    $('#fecha').value = '';
    $('#estado').value = '';
    dibujar();
  });

  /* Clic en "Cancelar cita" (los botones se crean al dibujar la tabla) */
  $('#tabla').addEventListener('click', function (e) {
    const id = e.target.dataset.cancelar;
    if (!id) return;
    const cita = buscar('citas', id);
    confirmar(
      '¿Cancelar cita?',
      'Se cancelará la cita de ' + nombreCliente(cita.clienteId) + ' del ' + formatoFecha(cita.fecha) + ' a las ' + cita.hora + '.',
      'Cancelar cita',
      true,
      function () {
        cita.estado = 'Cancelada';
        guardar();
        dibujar();
        mostrarAviso('exito', 'Cita cancelada.');
      },
      'Volver'
    );
  });

  dibujar();
}

/* Llena la lista de vehículos con los del cliente elegido */
function llenarVehiculosDe(clienteId, seleccionado) {
  const opciones = [];
  for (let i = 0; i < datos.vehiculos.length; i++) {
    const v = datos.vehiculos[i];
    if (v.clienteId === clienteId) opciones.push([v.id, rotuloVehiculo(v.id)]);
  }
  let textoVacio = 'Primero elige un cliente';
  if (clienteId) textoVacio = opciones.length > 0 ? 'Elige un vehículo' : 'Este cliente no tiene vehículos';
  llenarSelect($('#vehiculoId'), textoVacio, opciones, seleccionado);
}

/* ---- V-07b Formulario de cita (agendar o editar) ---- */
function formularioCita() {
  const id = parametro('id');
  const cita = id ? buscar('citas', id) : null;
  if (id && cita === null) {
    location.replace('no-encontrado.html');
    return;
  }

  const clientePrevio = cita !== null ? cita.clienteId : '';
  const opcionesClientes = [];
  for (let i = 0; i < datos.clientes.length; i++) {
    const c = datos.clientes[i];
    if (c.activo || c.id === clientePrevio) opcionesClientes.push([c.id, c.nombre]);
  }
  llenarSelect($('#clienteId'), 'Elige un cliente', opcionesClientes, clientePrevio);

  const opcionesServicios = [];
  for (let i = 0; i < datos.servicios.length; i++) {
    const s = datos.servicios[i];
    opcionesServicios.push([s.id, s.nombre + ' — ' + formatoMoneda(s.precio)]);
  }
  llenarSelect($('#servicioId'), 'Sin servicio definido', opcionesServicios, cita !== null ? cita.servicioId : '');

  llenarVehiculosDe(clientePrevio, cita !== null ? cita.vehiculoId : '');
  $('#clienteId').addEventListener('change', function () {
    llenarVehiculosDe($('#clienteId').value, '');
  });

  if (cita !== null) {
    $('#titulo-pagina').textContent = 'Editar cita';
    $('#miga-actual').textContent = 'Editar';
    $('#fecha').value = cita.fecha;
    $('#hora').value = cita.hora;
  } else {
    $('#fecha').value = parametro('fecha') || HOY;
  }

  activarFormulario($('#form'), {}, function () {
    const nuevosDatos = {
      clienteId: $('#clienteId').value,
      vehiculoId: $('#vehiculoId').value,
      servicioId: $('#servicioId').value,
      fecha: $('#fecha').value,
      hora: $('#hora').value
    };

    if (cita !== null) {
      Object.assign(cita, nuevosDatos);
    } else {
      nuevosDatos.id = siguienteId('citas', 'CIT');
      nuevosDatos.estado = 'Agendada';
      datos.citas.push(nuevosDatos);
    }
    guardar();
    avisarDespues('exito', cita !== null ? 'Cita actualizada.' : 'Cita agendada.');
    location.href = 'citas.html?fecha=' + nuevosDatos.fecha;
  });
}

/* ---- Arranque: según la página en la que estamos ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  const vista = document.body.dataset.vista;
  if (vista === 'citas-lista') agendaCitas();
  if (vista === 'cita-form') formularioCita();
}
