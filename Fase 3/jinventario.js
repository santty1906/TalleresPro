s/vistas//* Vistas V-09 — Inventario: lista, producto, movimientos y aviso de stock bajo */

/* Html de la etiqueta "Bajo stock" o "Stock normal" */
function estadoStock(producto) {
  if (stockBajo(producto)) return '<span class="insignia insignia-error">⚠ Bajo stock</span>';
  return '<span class="insignia insignia-ok">Stock normal</span>';
}

/* ---- V-09a Lista de productos ---- */
function listaInventario(gestiona) {
  const casillaBajo = $('#solo-bajo');
  casillaBajo.checked = (parametro('filtro') === 'bajo');

  /* Aviso con los productos que están en el mínimo o por debajo */
  const bajos = [];
  for (let i = 0; i < datos.productos.length; i++) {
    if (datos.productos[i].activo && stockBajo(datos.productos[i])) bajos.push(datos.productos[i].nombre);
  }
  if (bajos.length > 0) {
    const aviso = $('#aviso-stock');
    aviso.innerHTML = '<span aria-hidden="true">⚠</span><span class="aviso-texto"><strong>Aviso de stock bajo</strong>' +
      bajos.length + (bajos.length === 1 ? ' producto está' : ' productos están') +
      ' en o por debajo del stock mínimo: ' + escapar(bajos.join(', ')) + '.</span>';
    aviso.hidden = false;
  }

  function dibujar() {
    const busqueda = $('#q').value.trim().toLowerCase();

    const filas = [];
    for (let i = 0; i < datos.productos.length; i++) {
      const p = datos.productos[i];
      if (busqueda !== '' && !p.nombre.toLowerCase().includes(busqueda)) continue;
      if (casillaBajo.checked && !stockBajo(p)) continue;

      const nombre = escapar(p.nombre);
      const fila = [
        nombre,
        stockBajo(p) ? '<span class="bajo-stock">' + p.stock + '</span>' : p.stock,
        p.minimo,
        estadoStock(p)
      ];
      if (gestiona) {
        fila.push(
          '<a class="btn btn-secundario btn-pequeno" href="movimiento.html?tipo=Entrada&producto=' + p.id + '">Entrada<span class="solo-lectores"> de ' + nombre + '</span></a> ' +
          '<a class="btn btn-secundario btn-pequeno" href="movimiento.html?tipo=Salida&producto=' + p.id + '">Salida<span class="solo-lectores"> de ' + nombre + '</span></a> ' +
          '<a class="btn btn-secundario btn-pequeno" href="producto-form.html?id=' + p.id + '">Editar<span class="solo-lectores"> ' + nombre + '</span></a>'
        );
      }
      filas.push(fila);
    }

    const columnas = [
      { titulo: 'Producto', fila: true },
      { titulo: 'Stock', clase: 'numero' },
      { titulo: 'Mínimo', clase: 'numero' },
      { titulo: 'Estado' }
    ];
    if (gestiona) columnas.push(COLUMNA_ACCIONES);

    let htmlVacio = '<p>Sin registros.</p>';
    if (gestiona) htmlVacio += '<p class="acciones"><a class="btn btn-primario" href="producto-form.html">Registrar producto</a></p>';
    if (busqueda !== '' || casillaBajo.checked) {
      htmlVacio = '<p>Sin coincidencias con los filtros elegidos.</p>' +
        '<p class="acciones"><button type="button" class="btn btn-secundario" id="v-limpiar">Limpiar filtros</button></p>';
    }

    dibujarTabla('#tabla', 'Productos', columnas, filas, htmlVacio);
    conectarLimpiar(dibujar);
  }

  conectarBuscador(dibujar);
  casillaBajo.addEventListener('change', dibujar);
  dibujar();

  /* Últimos movimientos: los 8 más recientes */
  const filasMov = [];
  for (let i = datos.movimientos.length - 1; i >= 0 && filasMov.length < 8; i--) {
    const m = datos.movimientos[i];
    const producto = buscar('productos', m.productoId);
    filasMov.push([
      formatoFecha(m.fecha),
      escapar(producto ? producto.nombre : '—'),
      insignia(m.tipo),
      m.cantidad,
      escapar(m.ordenId || '—')
    ]);
  }
  dibujarTabla('#tabla-mov', 'Últimas entradas y salidas', [
    { titulo: 'Fecha' },
    { titulo: 'Producto', fila: true },
    { titulo: 'Tipo' },
    { titulo: 'Cantidad', clase: 'numero' },
    { titulo: 'Orden' }
  ], filasMov, '<p>Aún no hay movimientos registrados.</p>');
}

/* Dice si un texto es un número entero (por ejemplo "5") */
function esEntero(texto) {
  return Number.isInteger(Number(texto));
}

/* ---- V-09b Formulario de producto ---- */
function formularioProducto() {
  const id = parametro('id');
  const producto = id ? buscar('productos', id) : null;
  if (id && producto === null) {
    location.replace('no-encontrado.html');
    return;
  }

  if (producto !== null) {
    $('#titulo-pagina').textContent = 'Editar producto';
    $('#miga-actual').textContent = 'Editar';
    $('#nombre').value = producto.nombre;
    $('#minimo').value = producto.minimo;
    /* El stock no se escribe a mano: solo cambia con las entradas y salidas */
    $('#stock').value = producto.stock;
    $('#stock').readOnly = true;
    $('#stock').removeAttribute('required');
    $('label[for="stock"]').innerHTML = 'Stock actual';
    $('#nota-stock').hidden = false;
  }

  const reglas = {
    nombre: function (valor) {
      for (let i = 0; i < datos.productos.length; i++) {
        const otro = datos.productos[i];
        if (otro.nombre.toLowerCase() === valor.trim().toLowerCase() && otro.id !== id) {
          return 'Ya existe un producto con ese nombre.';
        }
      }
      return '';
    },
    stock: function (valor) {
      if (valor !== '' && !esEntero(valor)) return 'Escribe un número entero.';
      return '';
    },
    minimo: function (valor) {
      if (valor !== '' && !esEntero(valor)) return 'Escribe un número entero.';
      return '';
    }
  };

  activarFormulario($('#form'), reglas, function () {
    const nombre = $('#nombre').value.trim();
    const minimo = Number($('#minimo').value);

    if (producto !== null) {
      producto.nombre = nombre;
      producto.minimo = minimo;
    } else {
      datos.productos.push({
        id: siguienteId('productos', 'PRD'),
        nombre: nombre,
        minimo: minimo,
        stock: Number($('#stock').value),
        activo: true
      });
    }
    guardar();
    avisarDespues('exito', producto !== null ? 'Producto actualizado.' : 'Producto guardado.');
    location.href = 'inventario.html';
  });
}

/* ---- V-09c Registrar entrada o salida de inventario ---- */
function formularioMovimiento() {
  const selectProducto = $('#productoId');
  const selectOrden = $('#ordenId');
  const campoCantidad = $('#cantidad');

  /* "Entrada" o "Salida", según el botón de opción marcado */
  function tipoElegido() {
    return $('input[name="tipo"]:checked').value;
  }

  const opcionesProductos = [];
  for (let i = 0; i < datos.productos.length; i++) {
    if (datos.productos[i].activo) opcionesProductos.push([datos.productos[i].id, datos.productos[i].nombre]);
  }
  llenarSelect(selectProducto, 'Elige un producto', opcionesProductos, parametro('producto'));

  const opcionesOrdenes = [];
  for (let i = 0; i < datos.ordenes.length; i++) {
    const o = datos.ordenes[i];
    opcionesOrdenes.push([o.id, o.id + ' · ' + nombreCliente(o.clienteId)]);
  }
  llenarSelect(selectOrden, 'Sin orden asociada', opcionesOrdenes, '');

  const tipoEnLaDireccion = parametro('tipo');
  if (tipoEnLaDireccion === 'Entrada' || tipoEnLaDireccion === 'Salida') {
    $('input[name="tipo"][value="' + tipoEnLaDireccion + '"]').checked = true;
  }

  /* Muestra el stock actual y cuánto quedará */
  function actualizarVista() {
    const esSalida = (tipoElegido() === 'Salida');
    /* La orden asociada solo se pide en las salidas */
    selectOrden.closest('.campo').hidden = !esSalida;
    if (!esSalida) selectOrden.value = '';

    const producto = buscar('productos', selectProducto.value);
    const cantidad = Number(campoCantidad.value);
    const texto = $('#vista-stock');
    if (producto === null) {
      texto.textContent = 'Elige un producto.';
    } else if (campoCantidad.value !== '' && cantidad > 0) {
      const nuevo = esSalida ? producto.stock - cantidad : producto.stock + cantidad;
      texto.textContent = 'Actual: ' + producto.stock + ' → quedará: ' + nuevo;
    } else {
      texto.textContent = 'Actual: ' + producto.stock;
    }
  }
  selectProducto.addEventListener('input', actualizarVista);
  campoCantidad.addEventListener('input', actualizarVista);
  const opcionesTipo = $$('input[name="tipo"]');
  for (let i = 0; i < opcionesTipo.length; i++) opcionesTipo[i].addEventListener('change', actualizarVista);
  actualizarVista();

  const reglas = {
    cantidad: function (valor) {
      if (valor === '') return '';
      const numero = Number(valor);
      if (!Number.isInteger(numero) || numero <= 0) return 'La cantidad debe ser un número entero mayor que 0.';
      const producto = buscar('productos', selectProducto.value);
      if (producto !== null && tipoElegido() === 'Salida' && numero > producto.stock) {
        return 'Stock disponible: ' + producto.stock + '. Reduce la cantidad.';
      }
      return '';
    }
  };

  activarFormulario($('#form'), reglas, function () {
    const producto = buscar('productos', selectProducto.value);
    const cantidad = Number(campoCantidad.value);
    const esSalida = (tipoElegido() === 'Salida');

    if (esSalida) producto.stock = producto.stock - cantidad;
    else producto.stock = producto.stock + cantidad;

    datos.movimientos.push({
      id: siguienteId('movimientos', 'MOV'),
      fecha: HOY,
      productoId: producto.id,
      tipo: tipoElegido(),
      cantidad: cantidad,
      ordenId: esSalida ? selectOrden.value : ''
    });
    guardar();

    if (stockBajo(producto)) {
      avisarDespues('aviso', 'Stock bajo en ' + producto.nombre + ': quedan ' + producto.stock + ', el mínimo es ' + producto.minimo + '.', 'Movimiento registrado');
    } else {
      avisarDespues('exito', tipoElegido() + ' registrada. Stock de ' + producto.nombre + ': ' + producto.stock + '.');
    }
    location.href = 'inventario.html';
  });
}

/* ---- Arranque: según la página en la que estamos ---- */
const pagina = iniciarPagina();
if (pagina !== null) {
  const vista = document.body.dataset.vista;
  if (vista === 'inventario-lista') listaInventario(pagina.gestiona);
  if (vista === 'producto-form') formularioProducto();
  if (vista === 'movimiento') formularioMovimiento();
}
