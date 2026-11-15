/* Vistas V-08 — Órdenes: lista, creación y detalle */

/* ---- V-08a Lista de órdenes ---- */
function listaOrdenes(rol, sesion, gestiona) {
  const puedeVerDetalle = puedeVer('orden-detalle', rol);
  if (rol === 'tec') $('#sub-ordenes').textContent = 'Se muestran las órdenes asignadas a ti.';

  function dibujar() {
    const busqueda = $('#q').value.trim().toLowerCase();
    const estado = $('#estado').value;

    const ordenes = [];
    for (let i = 0; i < datos.ordenes.length; i++) {
      const o = datos.ordenes[i];
      /* El técnico solo ve las órdenes que tiene asignadas */
      if (rol === 'tec' && o.tecnicoId && o.tecnicoId !== sesion.id) continue;
      if (estado !== '' && o.estado !== estado) continue;
      if (busqueda !== '' && !contieneTexto([o.id, nombreCliente(o.clienteId), rotuloVehiculo(o.vehiculoId)], busqueda)) continue;
      ordenes.push(o);
    }
    /* Las más nuevas primero */
    ordenes.sort(function (a, b) {
      return b.id.localeCompare(a.id);
    });

    const filas = [];
    for (let i = 0; i < ordenes.length; i++) {
      const o = ordenes[i];
      let botonVer = '';
      if (puedeVerDetalle) {
        botonVer = '<a class="btn btn-secundario btn-pequeno" href="orden-detalle.html?id=' + o.id + '">Ver<span class="solo-lectores"> orden ' + o.id + '</span></a>';
      }
      filas.push([
        escapar(o.id),
        formatoFecha(o.fecha),
        escapar(nombreCliente(o.clienteId)),
        escapar(rotuloVehiculo(o.vehiculoId)),
        insignia(o.estado),
        formatoMoneda(saldo(o)),
        botonVer
      ]);
    }

    let htmlVacio = '<p>Sin registros.</p>';
    if (gestiona) htmlVacio += '<p class="acciones"><a class="btn btn-primario" href="orden-nueva.html">Crear orden</a></p>';
    if (busqueda !== '' || estado !== '') {
      htmlVacio = '<p>Sin coincidencias con los filtros elegidos.</p>' +
        '<p class="acciones"><button type="button" class="btn btn-secundario" id="v-limpiar">Limpiar filtros</button></p>';
    }

    dibujarTabla('#tabla', 'Lista de órdenes', [
      { titulo: 'Orden', fila: true },
      { titulo: 'Fecha' },
      { titulo: 'Cliente' },
      { titulo: 'Vehículo' },
      { titulo: 'Estado' },
      { titulo: 'Saldo', clase: 'numero' },
      COLUMNA_ACCIONES
    ], filas, htmlVacio);
    conectarLimpiar(dibujar);
  }

  conectarBuscador(dibujar);
  $('#estado').addEventListener('change', dibujar);
  dibujar();
}

/* ---- V-08b Crear orden ---- */
function crearOrden() {
  /* Si viene desde una cita o un vehículo, se precargan los datos */
  const cita = parametro('cita') ? buscar('citas', parametro('cita')) : null;
  let clientePrevio = parametro('cliente');
  let vehiculoPrevio = parametro('vehiculo');
  let servicioPrevio = '';
  if (cita !== null) {
    clientePrevio = cita.clienteId;
    vehiculoPrevio = cita.vehiculoId;
    servicioPrevio = cita.servicioId;
  }

  function mostrarOrigen(texto) {
    const aviso = $('#origen');
    aviso.innerHTML = '<span aria-hidden="true">ℹ</span><span class="aviso-texto">' + escapar(texto) + '</span>';
    aviso.hidden = false;
  }
  if (cita !== null) {
    mostrarOrigen('Datos precargados desde la cita ' + cita.id + ' (' + formatoFecha(cita.fecha) + ', ' + cita.hora + '). Puedes cambiarlos antes de guardar.');
  } else if (vehiculoPrevio) {
    const v = buscar('vehiculos', vehiculoPrevio);
    if (v !== null) mostrarOrigen('Datos precargados desde el vehículo ' + v.placa + '. Puedes cambiarlos antes de guardar.');
  }

  /* Lista de clientes */
  const opcionesClientes = [];
  for (let i = 0; i < datos.clientes.length; i++) {
    const c = datos.clientes[i];
    if (c.activo || c.id === clientePrevio) opcionesClientes.push([c.id, c.nombre]);
  }
  llenarSelect($('#clienteId'), 'Elige un cliente', opcionesClientes, clientePrevio);

  /* Lista de vehículos del cliente elegido */
  function llenarVehiculos(clienteId, seleccionado) {
    const opciones = [];
    for (let i = 0; i < datos.vehiculos.length; i++) {
      const v = datos.vehiculos[i];
      if (v.clienteId === clienteId) opciones.push([v.id, rotuloVehiculo(v.id)]);
    }
    let textoVacio = 'Primero elige un cliente';
    if (clienteId) textoVacio = opciones.length > 0 ? 'Elige un vehículo' : 'Este cliente no tiene vehículos';
    llenarSelect($('#vehiculoId'), textoVacio, opciones, seleccionado);
  }
  llenarVehiculos(clientePrevio, vehiculoPrevio);
  $('#clienteId').addEventListener('change', function () {
    llenarVehiculos($('#clienteId').value, '');
  });

  /* Lista de técnicos (opcional) */
  const opcionesTecnicos = [];
  for (let i = 0; i < datos.usuarios.length; i++) {
    const u = datos.usuarios[i];
    if (u.rol === 'tec' && u.activo) opcionesTecnicos.push([u.id, u.nombre]);
  }
  llenarSelect($('#tecnicoId'), 'Sin asignar', opcionesTecnicos, '');

  /* Casillas de servicios */
  let htmlServicios = '';
  for (let i = 0; i < datos.servicios.length; i++) {
    const s = datos.servicios[i];
    const marcado = s.id === servicioPrevio ? ' checked' : '';
    htmlServicios +=
      '<li><label class="opcion"><input type="checkbox" name="servicio" value="' + s.id + '"' + marcado + '>' +
      '<span>' + escapar(s.nombre) + '</span><span class="opcion-precio">' + formatoMoneda(s.precio) + '</span></label></li>';
  }
  $('#lista-servicios').innerHTML = htmlServicios;

  /* Servicios que están marcados (devuelve sus ids) */
  function serviciosMarcados() {
    const ids = [];
    const casillas = $$('#lista-servicios input:checked');
    for (let i = 0; i < casillas.length; i++) ids.push(casillas[i].value);
    return ids;
  }

  function mostrarTotal() {
    const ids = serviciosMarcados();
    let total = 0;
    for (let i = 0; i < ids.length; i++) total = total + buscar('servicios', ids[i]).precio;
    $('#total').textContent = formatoMoneda(total);
  }
  $('#lista-servicios').addEventListener('change', mostrarTotal);
  mostrarTotal();

  activarFormulario($('#form'), {}, function () {
    const id = siguienteId('ordenes', 'ORD');
    datos.ordenes.push({
      id: id,
      fecha: HOY,
      clienteId: $('#clienteId').value,
      vehiculoId: $('#vehiculoId').value,
      estado: 'Recibido',
      problema: $('#problema').value.trim(),
      serviciosIds: serviciosMarcados(),
      tecnicoId: $('#tecnicoId').value,
      diagnostico: '',
      tareas: []
    });
    guardar();
    avisarDespues('exito', 'Orden ' + id + ' creada en estado Recibido.');
    if (puedeVer('orden-detalle', obtenerSesion().rol)) {
      location.href = 'orden-detalle.html?id=' + id;
    } else {
      location.href = 'ordenes.html';
    }
  });
}

/* ---- V-08c Detalle de la orden ---- */
function detalleOrden(rol, gestiona) {
  const orden = buscar('ordenes', parametro('id'));
  if (orden === null) {
    location.replace('no-encontrado.html');
    return;
  }

  $('#det-nombre').textContent = 'Orden ' + orden.id;
  $('#det-fecha').textContent = 'Creada el ' + formatoFecha(orden.fecha);
  document.title = orden.id + ' · TalleresPro';

  /* Datos generales */
  let cliente = escapar(nombreCliente(orden.clienteId));
  if (puedeVer('clientes', rol)) cliente = '<a href="cliente-detalle.html?id=' + orden.clienteId + '">' + cliente + '</a>';
  const tecnico = buscar('usuarios', orden.tecnicoId);
  $('#datos').innerHTML =
    '<div><dt>Cliente</dt><dd>' + cliente + '</dd></div>' +
    '<div><dt>Vehículo</dt><dd>' + escapar(rotuloVehiculo(orden.vehiculoId)) + '</dd></div>' +
    '<div><dt>Técnico asignado</dt><dd>' + escapar(tecnico ? tecnico.nombre : 'Sin asignar') + '</dd></div>' +
    '<div><dt>Problema informado</dt><dd>' + escapar(orden.problema) + '</dd></div>';

  /* Servicios de la orden */
  const filasServicios = [];
  for (let i = 0; i < orden.serviciosIds.length; i++) {
    const s = buscar('servicios', orden.serviciosIds[i]);
    if (s !== null) filasServicios.push([escapar(s.nombre), formatoMoneda(s.precio)]);
  }
  dibujarTabla('#tabla-serv', 'Servicios de la orden', [
    { titulo: 'Servicio', fila: true },
    { titulo: 'Precio', clase: 'numero' }
  ], filasServicios, '<p>Esta orden no tiene servicios asociados.</p>');

  /* Total, cobrado y saldo */
  $('#importes').innerHTML =
    '<div><dt>Total</dt><dd>' + formatoMoneda(totalOrden(orden)) + '</dd></div>' +
    '<div><dt>Cobrado</dt><dd>' + formatoMoneda(cobrado(orden.id)) + '</dd></div>' +
    '<div class="destacado"><dt>Saldo pendiente</dt><dd>' + formatoMoneda(saldo(orden)) + '</dd></div>';

  /* Estado, diagnóstico y tareas: solo el técnico los puede cambiar */
  const selectEstado = $('#estado');
  const diagnostico = $('#diagnostico');
  const listaTareas = $('#tareas');
  /* Copia de las tareas: solo se guarda en la orden al pulsar "Guardar cambios" */
  const tareas = [];
  for (let i = 0; i < orden.tareas.length; i++) {
    tareas.push({ texto: orden.tareas[i].texto, hecha: orden.tareas[i].hecha });
  }

  /* El estado solo puede cambiar a los que permite la lista de transiciones */
  const opcionesEstado = [[orden.estado, orden.estado]];
  const siguientes = transiciones[orden.estado];
  for (let i = 0; i < siguientes.length; i++) opcionesEstado.push([siguientes[i], siguientes[i]]);
  llenarSelect(selectEstado, null, opcionesEstado, orden.estado);
  diagnostico.value = orden.diagnostico;

  if (siguientes.length === 0) {
    selectEstado.disabled = true;
    const ayuda = document.createElement('span');
    ayuda.className = 'campo-ayuda';
    ayuda.id = 'ayuda-estado';
    ayuda.textContent = 'Una orden ' + (orden.estado === 'Cancelada' ? 'cancelada' : 'entregada') + ' ya no cambia de estado.';
    selectEstado.setAttribute('aria-describedby', 'ayuda-estado');
    selectEstado.insertAdjacentElement('afterend', ayuda);
  }

  function dibujarTareas() {
    if (tareas.length === 0) {
      listaTareas.innerHTML = '<li class="texto-suave" style="border:0;background:none">Aún no hay tareas registradas.</li>';
      return;
    }
    let html = '';
    for (let i = 0; i < tareas.length; i++) {
      const t = tareas[i];
      const clase = t.hecha ? 'hecha' : '';
      if (gestiona) {
        html += '<li class="' + clase + '"><label class="opcion"><input type="checkbox" data-i="' + i + '"' + (t.hecha ? ' checked' : '') + '><span>' + escapar(t.texto) + '</span></label></li>';
      } else {
        html += '<li class="' + clase + '"><span>' + (t.hecha ? '✔ ' : '○ ') + escapar(t.texto) + '</span><span class="solo-lectores">' + (t.hecha ? ' (hecha)' : ' (pendiente)') + '</span></li>';
      }
    }
    listaTareas.innerHTML = html;
  }
  dibujarTareas();

  if (!gestiona) {
    /* Los demás roles ven el estado y el diagnóstico como texto */
    $('#bloque-estado').innerHTML = '<span class="etiqueta">Estado</span><span>' + insignia(orden.estado) + '</span>';
    const textoDiag = orden.diagnostico ? escapar(orden.diagnostico) : '<span class="texto-suave">Aún no hay diagnóstico registrado.</span>';
    $('#bloque-diag').innerHTML = '<span class="etiqueta">Diagnóstico</span><span>' + textoDiag + '</span>';
  } else {
    /* Marcar o desmarcar una tarea */
    listaTareas.addEventListener('change', function (e) {
      const i = e.target.dataset.i;
      if (i !== undefined) {
        tareas[i].hecha = e.target.checked;
        dibujarTareas();
        listaTareas.querySelector('[data-i="' + i + '"]').focus();
      }
    });

    /* Agregar una tarea nueva */
    function agregarTarea() {
      const campo = $('#nueva-tarea');
      if (campo.value.trim() !== '') {
        tareas.push({ texto: campo.value.trim(), hecha: false });
        campo.value = '';
        dibujarTareas();
      }
      campo.focus();
    }
    $('#btn-agregar').addEventListener('click', agregarTarea);
    $('#nueva-tarea').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        agregarTarea();
      }
    });

    const reglas = {
      diagnostico: function (valor) {
        if (selectEstado.value === 'Listo' && valor.trim() === '') {
          return 'Escribe el diagnóstico antes de marcar la orden como Listo.';
        }
        return '';
      }
    };
    activarFormulario($('#form'), reglas, function () {
      orden.estado = selectEstado.value;
      orden.diagnostico = diagnostico.value.trim();
      orden.tareas = tareas;
      guardar();
      mostrarAviso('exito', 'Orden actualizada.');
      window.scrollTo(0, 0);
    });
  }

  /* Enlaces a cobro y factura */
  const id = encodeURIComponent(orden.id);
  const enlaces = [['#btn-cobrar', 'cobro'], ['#btn-cobros-ver', 'cobro'], ['#btn-facturar', 'factura'], ['#btn-factura-ver', 'factura']];
  for (let i = 0; i < enlaces.length; i++) {
    const enlace = $(enlaces[i][0]);
    if (enlace) enlace.href = enlaces[i][1] + '.html?orden=' + id;
  }
  /* Si este rol no tiene ningún enlace relacionado, se quita la sección */
  if (!$('.relacionados a')) $('#h-rel').closest('section').remove();
}

/* ---- Arranque: según la página en la que estamos ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  const vista = document.body.dataset.vista;
  if (vista === 'ordenes-lista') listaOrdenes(pagina.rol, pagina.sesion, pagina.gestiona);
  if (vista === 'orden-nueva') crearOrden();
  if (vista === 'orden-detalle') detalleOrden(pagina.rol, pagina.gestiona);
}
