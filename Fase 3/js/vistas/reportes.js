/* Vistas V-11 — Reportes: selector y resultado */

/* ---- V-11a Selector de reporte ---- */
function selectorReporte() {
  /* Por defecto: del primer día del mes de hoy hasta hoy */
  $('#hasta').value = HOY;
  $('#desde').value = HOY.slice(0, 8) + '01';

  const formulario = $('#form');
  const reglas = {
    hasta: function (valor) {
      const desde = $('#desde').value;
      if (desde !== '' && valor !== '' && valor < desde) return 'La fecha final no puede ser anterior a la inicial.';
      return '';
    }
  };
  /* El formulario se envía a la página de resultado; aquí solo se revisa antes */
  activarFormulario(formulario, reglas, function () {
    formulario.submit();
  });
}

/* ---- V-11b Resultado del reporte ---- */
function resultadoReporte() {
  const tipo = parametro('tipo');
  const desde = parametro('desde');
  const hasta = parametro('hasta');
  if (tipo !== 'reparaciones' && tipo !== 'inventario' && tipo !== 'financiero') {
    location.replace('reportes.html');
    return;
  }

  /* Dice si una fecha está dentro del período elegido */
  function enPeriodo(fecha) {
    return (desde === '' || fecha >= desde) && (hasta === '' || fecha <= hasta);
  }

  const titulos = {
    reparaciones: 'Reporte de reparaciones',
    inventario: 'Reporte de inventario',
    financiero: 'Reporte financiero'
  };
  $('#rep-titulo').textContent = titulos[tipo];
  $('#rep-criterios').textContent = 'Del ' + formatoFecha(desde) + ' al ' + formatoFecha(hasta);
  document.title = titulos[tipo] + ' · TalleresPro';

  const htmlVacio = '<p>Sin datos para estos filtros.</p><p class="acciones"><a class="btn btn-secundario" href="reportes.html">Ajustar filtros</a></p>';

  if (tipo === 'reparaciones') {
    const filas = [];
    for (let i = 0; i < datos.ordenes.length; i++) {
      const o = datos.ordenes[i];
      if (enPeriodo(o.fecha)) {
        filas.push([o.id, formatoFecha(o.fecha), escapar(nombreCliente(o.clienteId)), escapar(rotuloVehiculo(o.vehiculoId)), insignia(o.estado), formatoMoneda(totalOrden(o))]);
      }
    }
    dibujarTabla('#tabla', 'Órdenes del período', [
      { titulo: 'Orden', fila: true },
      { titulo: 'Fecha' },
      { titulo: 'Cliente' },
      { titulo: 'Vehículo' },
      { titulo: 'Estado' },
      { titulo: 'Total', clase: 'numero' }
    ], filas, htmlVacio);
  }

  if (tipo === 'inventario') {
    /* Suma las cantidades de un producto en el período, según sea Entrada o Salida */
    function sumarMovimientos(productoId, tipoMovimiento) {
      let total = 0;
      for (let i = 0; i < datos.movimientos.length; i++) {
        const m = datos.movimientos[i];
        if (m.productoId === productoId && m.tipo === tipoMovimiento && enPeriodo(m.fecha)) total = total + m.cantidad;
      }
      return total;
    }

    const filas = [];
    for (let i = 0; i < datos.productos.length; i++) {
      const p = datos.productos[i];
      filas.push([
        escapar(p.nombre),
        sumarMovimientos(p.id, 'Entrada'),
        sumarMovimientos(p.id, 'Salida'),
        stockBajo(p) ? '<span class="bajo-stock">' + p.stock + '</span>' : p.stock,
        p.minimo,
        stockBajo(p)
          ? '<span class="insignia insignia-error">⚠ Bajo stock</span>'
          : '<span class="insignia insignia-ok">Stock normal</span>'
      ]);
    }
    dibujarTabla('#tabla', 'Estado del inventario y movimientos del período', [
      { titulo: 'Producto', fila: true },
      { titulo: 'Entradas', clase: 'numero' },
      { titulo: 'Salidas', clase: 'numero' },
      { titulo: 'Stock actual', clase: 'numero' },
      { titulo: 'Mínimo', clase: 'numero' },
      { titulo: 'Estado' }
    ], filas, htmlVacio);
  }

  if (tipo === 'financiero') {
    /* Se juntan los cobros de las órdenes y los ingresos/gastos en una sola lista */
    const registros = [];
    for (let i = 0; i < datos.pagos.length; i++) {
      const p = datos.pagos[i];
      if (enPeriodo(p.fecha)) {
        registros.push({ fecha: p.fecha, tipo: 'Cobro', concepto: 'Orden ' + p.ordenId + ' (' + p.metodo + ')', monto: p.monto });
      }
    }
    for (let i = 0; i < datos.finanzas.length; i++) {
      const f = datos.finanzas[i];
      if (enPeriodo(f.fecha)) {
        registros.push({ fecha: f.fecha, tipo: f.tipo, concepto: f.concepto, monto: f.monto });
      }
    }
    registros.sort(function (a, b) {
      return a.fecha.localeCompare(b.fecha);
    });

    const filas = [];
    let entradas = 0;
    let gastos = 0;
    for (let i = 0; i < registros.length; i++) {
      const r = registros[i];
      if (r.tipo === 'Gasto') {
        gastos = gastos + r.monto;
        filas.push([formatoFecha(r.fecha), '<span class="insignia insignia-aviso">Gasto</span>', escapar(r.concepto), '−' + formatoMoneda(r.monto)]);
      } else {
        entradas = entradas + r.monto;
        filas.push([formatoFecha(r.fecha), '<span class="insignia insignia-ok">' + r.tipo + '</span>', escapar(r.concepto), formatoMoneda(r.monto)]);
      }
    }
    dibujarTabla('#tabla', 'Pagos, ingresos y gastos del período', [
      { titulo: 'Fecha' },
      { titulo: 'Tipo' },
      { titulo: 'Concepto', fila: true },
      { titulo: 'Monto', clase: 'numero' }
    ], filas, htmlVacio);

    /* Resumen debajo de la tabla */
    if (filas.length > 0) {
      $('#tabla').insertAdjacentHTML('afterend',
        '<dl class="importes" style="margin-top:1rem">' +
        '<div><dt>Entradas de dinero</dt><dd>' + formatoMoneda(entradas) + '</dd></div>' +
        '<div><dt>Gastos</dt><dd>' + formatoMoneda(gastos) + '</dd></div>' +
        '<div class="destacado"><dt>Balance</dt><dd>' + formatoMoneda(entradas - gastos) + '</dd></div></dl>');
    }
  }
}

/* ---- Arranque: según la página en la que estamos ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  const vista = document.body.dataset.vista;
  if (vista === 'reportes-selector') selectorReporte();
  if (vista === 'reportes-resultado') resultadoReporte();
}
