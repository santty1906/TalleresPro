/* Vista V-02 — Dashboard */

/* Suma el campo "monto" de una lista de registros */
function sumarMontos(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) total = total + lista[i].monto;
  return total;
}

function mostrarDashboard() {
  $('#fecha-hoy').textContent = formatoFecha(HOY);

  /* Indicador 1: órdenes en las que el taller todavía trabaja */
  let trabajosPendientes = 0;
  for (let i = 0; i < datos.ordenes.length; i++) {
    if (ordenActiva(datos.ordenes[i])) trabajosPendientes++;
  }

  /* Indicador 2: citas agendadas para hoy */
  let citasHoy = 0;
  for (let i = 0; i < datos.citas.length; i++) {
    if (datos.citas[i].fecha === HOY && datos.citas[i].estado === 'Agendada') citasHoy++;
  }

  /* Indicador 3: productos con stock bajo */
  let productosBajos = 0;
  for (let i = 0; i < datos.productos.length; i++) {
    if (stockBajo(datos.productos[i])) productosBajos++;
  }

  /* Indicador 4: lo cobrado hoy */
  const pagosHoy = [];
  for (let i = 0; i < datos.pagos.length; i++) {
    if (datos.pagos[i].fecha === HOY) pagosHoy.push(datos.pagos[i]);
  }

  /* Cada indicador es un enlace a la página donde se ve el detalle */
  function indicador(valor, nombre, enlace, textoEnlace, clase) {
    return '<li><a class="indicador ' + clase + '" href="' + enlace + '">' +
      '<span class="indicador-valor">' + valor + '</span>' +
      '<span class="indicador-nombre">' + nombre + '</span>' +
      '<span class="indicador-enlace">' + textoEnlace + ' →</span></a></li>';
  }

  $('#indicadores').innerHTML =
    indicador(trabajosPendientes, 'Trabajos pendientes', 'ordenes.html', 'Ver órdenes', '') +
    indicador(citasHoy, 'Citas de hoy', 'citas.html?fecha=' + HOY, 'Ver agenda', '') +
    indicador(
      productosBajos > 0 ? '⚠ ' + productosBajos : productosBajos,
      'Productos con poco stock', 'inventario.html?filtro=bajo', 'Ver inventario',
      productosBajos > 0 ? 'indicador-alerta' : ''
    ) +
    indicador(formatoMoneda(sumarMontos(pagosHoy)), 'Cobrado hoy', 'finanzas.html', 'Ver finanzas', 'indicador-ok');

  /* Totales generales */
  const ingresos = [];
  const gastos = [];
  for (let i = 0; i < datos.finanzas.length; i++) {
    if (datos.finanzas[i].tipo === 'Ingreso') ingresos.push(datos.finanzas[i]);
    else gastos.push(datos.finanzas[i]);
  }
  $('#totales').innerHTML =
    '<div><dt>Cobros de órdenes</dt><dd>' + formatoMoneda(sumarMontos(datos.pagos)) + '</dd></div>' +
    '<div><dt>Otros ingresos</dt><dd>' + formatoMoneda(sumarMontos(ingresos)) + '</dd></div>' +
    '<div><dt>Gastos del taller</dt><dd>' + formatoMoneda(sumarMontos(gastos)) + '</dd></div>';
}

/* ---- Arranque ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  mostrarDashboard();
}
