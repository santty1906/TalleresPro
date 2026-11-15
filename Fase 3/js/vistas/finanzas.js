s/vistas//* Vistas V-10 — Finanzas: ingresos y gastos, cobro de órdenes y factura interna */

/* Suma el campo "monto" de una lista de registros */
function sumarMontos(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) total = total + lista[i].monto;
  return total;
}

/* Devuelve solo los registros de finanzas de un tipo ('Ingreso' o 'Gasto') */
function finanzasDeTipo(tipo) {
  const resultado = [];
  for (let i = 0; i < datos.finanzas.length; i++) {
    if (datos.finanzas[i].tipo === tipo) resultado.push(datos.finanzas[i]);
  }
  return resultado;
}

/* Total, cobrado y saldo de una orden */
function htmlImportes(orden) {
  return '<div><dt>Total</dt><dd>' + formatoMoneda(totalOrden(orden)) + '</dd></div>' +
    '<div><dt>Cobrado</dt><dd>' + formatoMoneda(cobrado(orden.id)) + '</dd></div>' +
    '<div class="destacado"><dt>Saldo pendiente</dt><dd>' + formatoMoneda(saldo(orden)) + '</dd></div>';
}

/* ---- V-10b Ingresos y gastos ---- */
function listaFinanzas(gestiona) {
  let tipoMostrado = 'Ingreso';

  function dibujarTotales() {
    $('#totales').innerHTML =
      '<div><dt>Cobros de órdenes</dt><dd>' + formatoMoneda(sumarMontos(datos.pagos)) + '</dd></div>' +
      '<div><dt>Otros ingresos</dt><dd>' + formatoMoneda(sumarMontos(finanzasDeTipo('Ingreso'))) + '</dd></div>' +
      '<div><dt>Gastos del taller</dt><dd>' + formatoMoneda(sumarMontos(finanzasDeTipo('Gasto'))) + '</dd></div>';
  }

  function dibujar() {
    const registros = finanzasDeTipo(tipoMostrado);
    /* Los más recientes primero */
    registros.sort(function (a, b) {
      return b.fecha.localeCompare(a.fecha);
    });

    const filas = [];
    for (let i = 0; i < registros.length; i++) {
      const f = registros[i];
      filas.push([formatoFecha(f.fecha), escapar(f.concepto), formatoMoneda(f.monto)]);
    }
    const nombreTipo = tipoMostrado === 'Ingreso' ? 'ingresos' : 'gastos';
    dibujarTabla('#tabla', tipoMostrado === 'Ingreso' ? 'Otros ingresos' : 'Gastos del taller', [
      { titulo: 'Fecha' },
      { titulo: 'Concepto', fila: true },
      { titulo: 'Monto', clase: 'numero' }
    ], filas, '<p>Sin registros de ' + nombreTipo + '.</p>');
  }

  /* Pestañas "Ingresos" y "Gastos" */
  const pestanas = $$('[role="tab"]');

  function activarPestana(pestana) {
    for (let i = 0; i < pestanas.length; i++) {
      const activa = (pestanas[i] === pestana);
      pestanas[i].setAttribute('aria-selected', String(activa));
      pestanas[i].tabIndex = activa ? 0 : -1;
    }
    $('#panel').setAttribute('aria-labelledby', pestana.id);
    tipoMostrado = pestana.dataset.tipo;
    dibujar();
  }

  for (let i = 0; i < pestanas.length; i++) {
    pestanas[i].addEventListener('click', function () {
      activarPestana(pestanas[i]);
    });
    /* Con las flechas del teclado se cambia de pestaña */
    pestanas[i].addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const otra = pestanas[(i + 1) % pestanas.length];
        activarPestana(otra);
        otra.focus();
      }
    });
  }

  dibujarTotales();
  dibujar();

  /* Formulario para registrar un ingreso o un gasto (solo quien gestiona finanzas) */
  if (gestiona) {
    $('#fecha').value = HOY;
    const reglas = {
      monto: function (valor) {
        if (valor !== '' && Number(valor) <= 0) return 'El monto debe ser mayor que 0.';
        return '';
      }
    };
    activarFormulario($('#form'), reglas, function () {
      const tipo = $('#tipo').value;
      datos.finanzas.push({
        id: siguienteId('finanzas', 'FIN'),
        tipo: tipo,
        fecha: $('#fecha').value,
        concepto: $('#concepto').value.trim(),
        monto: Number($('#monto').value)
      });
      guardar();
      $('#form').reset();
      $('#fecha').value = HOY;
      dibujarTotales();
      activarPestana($('[data-tipo="' + tipo + '"]'));
      mostrarAviso('exito', tipo === 'Ingreso' ? 'Ingreso registrado.' : 'Gasto registrado.');
    });
  }
}

/* Busca la orden indicada en la dirección. Si no existe, va a la página "no encontrado". */
function ordenDeLaDireccion() {
  const orden = buscar('ordenes', parametro('orden'));
  if (orden === null) location.replace('no-encontrado.html');
  return orden;
}

/* ---- V-10a Cobrar una orden ---- */
function cobroOrden(rol, gestiona) {
  const orden = ordenDeLaDireccion();
  if (orden === null) return;

  /* Los botones "Volver" regresan a la orden (o a la lista si el rol no ve el detalle) */
  const destinoVolver = puedeVer('orden-detalle', rol) ? 'orden-detalle.html?id=' + orden.id : 'ordenes.html';
  const idsVolver = ['btn-volver', 'btn-volver2'];
  for (let i = 0; i < idsVolver.length; i++) {
    const boton = document.getElementById(idsVolver[i]);
    if (boton) boton.href = destinoVolver;
  }
  $('#btn-factura').href = 'factura.html?orden=' + orden.id;
  $('#det-nombre').textContent = 'Cobro de la orden ' + orden.id;
  document.title = 'Cobro ' + orden.id + ' · TalleresPro';

  function dibujar() {
    $('#importes').innerHTML = htmlImportes(orden);

    const filas = [];
    for (let i = 0; i < datos.pagos.length; i++) {
      const p = datos.pagos[i];
      if (p.ordenId === orden.id) filas.push([formatoFecha(p.fecha), escapar(p.metodo), formatoMoneda(p.monto)]);
    }
    dibujarTabla('#tabla', 'Pagos de la orden', [
      { titulo: 'Fecha' },
      { titulo: 'Método', fila: true },
      { titulo: 'Monto', clase: 'numero' }
    ], filas, '<p>Esta orden aún no tiene pagos registrados.</p>');

    /* Si ya no hay saldo, no se muestra el formulario de cobro */
    const bloqueFormulario = $('#bloque-form');
    if (bloqueFormulario && saldo(orden) <= 0) {
      bloqueFormulario.innerHTML = '<h2 id="h-reg">Registrar cobro</h2><p>La orden está pagada por completo. No hay saldo pendiente.</p>';
    }
  }
  dibujar();

  if (gestiona) {
    const reglas = {
      monto: function (valor) {
        if (valor === '') return '';
        const monto = Number(valor);
        if (monto <= 0) return 'El monto debe ser mayor que 0.';
        /* Sobrepago: no se acepta más que el saldo pendiente */
        if (monto > saldo(orden) + 0.000000001) {
          return 'El monto supera el saldo (' + formatoMoneda(saldo(orden)) + '). Ajusta el monto.';
        }
        return '';
      }
    };
    activarFormulario($('#form'), reglas, function () {
      datos.pagos.push({
        id: siguienteId('pagos', 'PAG'),
        fecha: HOY,
        ordenId: orden.id,
        monto: Number($('#monto').value),
        metodo: $('#metodo').value
      });
      guardar();
      avisarDespues('exito', 'Pago registrado. Saldo pendiente: ' + formatoMoneda(saldo(orden)) + '.');
      location.href = destinoVolver;
    });
  }
}

/* ---- V-10c Factura interna ---- */
function facturaOrden(gestiona) {
  const orden = ordenDeLaDireccion();
  if (orden === null) return;
  const contenido = $('#contenido-factura');

  function dibujar() {
    /* ¿Ya existe la factura de esta orden? */
    let factura = null;
    for (let i = 0; i < datos.facturas.length; i++) {
      if (datos.facturas[i].ordenId === orden.id) factura = datos.facturas[i];
    }

    /* Caso 1: todavía no hay factura */
    if (factura === null) {
      $('#btn-imprimir').hidden = true;

      if (cobrado(orden.id) === 0) {
        /* No se puede facturar sin ningún cobro */
        contenido.innerHTML =
          '<p class="aviso aviso-aviso"><span aria-hidden="true">⚠</span><span class="aviso-texto">' +
          '<strong>Aún no se puede generar la factura</strong>Registra un cobro antes de generar la factura. ' +
          '<a href="cobro.html?orden=' + orden.id + '">Ir a cobros</a></span></p>';
        return;
      }

      const botonGenerar = gestiona
        ? '<button type="button" class="btn btn-primario" id="btn-generar">Generar factura interna</button>'
        : '<p class="texto-suave">Esta orden todavía no tiene factura.</p>';
      contenido.innerHTML =
        '<section class="tarjeta contenido-estrecho"><h2>Orden ' + orden.id + '</h2>' +
        '<p style="margin:.5rem 0 1rem">Cobrado hasta ahora: <strong>' + formatoMoneda(cobrado(orden.id)) + '</strong> de ' + formatoMoneda(totalOrden(orden)) + '.</p>' +
        botonGenerar + '</section>';

      const boton = $('#btn-generar');
      if (boton) {
        boton.addEventListener('click', function () {
          datos.facturas.push({ id: siguienteId('facturas', 'FAC', 4), fecha: HOY, ordenId: orden.id });
          guardar();
          dibujar();
          mostrarAviso('exito', 'Factura interna generada.');
        });
      }
      return;
    }

    /* Caso 2: la factura existe, se muestra completa */
    let filasServicios = '';
    for (let i = 0; i < orden.serviciosIds.length; i++) {
      const s = buscar('servicios', orden.serviciosIds[i]);
      if (s !== null) {
        filasServicios += '<tr><th scope="row" data-label="Servicio">' + escapar(s.nombre) + '</th>' +
          '<td class="texto-derecha numero" data-label="Precio">' + formatoMoneda(s.precio) + '</td></tr>';
      }
    }

    contenido.innerHTML =
      '<article class="factura" aria-labelledby="fac-num">' +
      '<header class="factura-cabecera">' +
      '<hgroup><h2>TalleresPro</h2><p>Factura interna</p></hgroup>' +
      '<p class="texto-derecha"><strong class="factura-numero" id="fac-num">' + factura.id + '</strong><br>' +
      '<span class="texto-suave">Fecha: ' + formatoFecha(factura.fecha) + '</span></p></header>' +
      '<dl class="datos" style="margin-bottom:1rem">' +
      '<div><dt>Cliente</dt><dd>' + escapar(nombreCliente(orden.clienteId)) + '</dd></div>' +
      '<div><dt>Vehículo</dt><dd>' + escapar(rotuloVehiculo(orden.vehiculoId)) + '</dd></div>' +
      '<div><dt>Orden</dt><dd>' + orden.id + '</dd></div></dl>' +
      '<div class="tabla-contenedor" style="box-shadow:none"><table>' +
      '<caption class="solo-lectores">Detalle de la factura</caption>' +
      '<thead><tr><th scope="col">Servicio</th><th scope="col" class="texto-derecha">Precio</th></tr></thead>' +
      '<tbody>' + filasServicios + '</tbody>' +
      '<tfoot>' +
      '<tr><th scope="row" data-label="Total">Total</th><td class="texto-derecha numero" data-label="Importe">' + formatoMoneda(totalOrden(orden)) + '</td></tr>' +
      '<tr><th scope="row" data-label="Cobrado">Cobrado</th><td class="texto-derecha numero" data-label="Importe">' + formatoMoneda(cobrado(orden.id)) + '</td></tr>' +
      '<tr><th scope="row" data-label="Saldo pendiente">Saldo pendiente</th><td class="texto-derecha numero" data-label="Importe">' + formatoMoneda(saldo(orden)) + '</td></tr>' +
      '</tfoot></table></div></article>';

    const botonImprimir = $('#btn-imprimir');
    botonImprimir.hidden = false;
    botonImprimir.onclick = function () {
      window.print();
    };
  }

  dibujar();
}

/* ---- Arranque: según la página en la que estamos ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  const vista = document.body.dataset.vista;
  if (vista === 'finanzas-lista') listaFinanzas(pagina.gestiona);
  if (vista === 'cobro') cobroOrden(pagina.rol, pagina.gestiona);
  if (vista === 'factura') facturaOrden(pagina.gestiona);
}
