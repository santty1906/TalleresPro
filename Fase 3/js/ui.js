/* TalleresPro — utilidades de pantalla: formato, avisos, confirmaciones, tablas y formularios */

/* ---------- Atajos para buscar elementos ---------- */
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

/* ---------- Formato de textos ---------- */

/* 1234.5 -> "B/. 1,234.50" */
function formatoMoneda(numero) {
  return 'B/. ' + Number(numero).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* "2026-11-14" -> "14/11/2026" */
function formatoFecha(fechaIso) {
  if (!fechaIso) return '';
  const partes = fechaIso.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

/* Evita que un texto escrito por la persona se interprete como HTML */
function escapar(texto) {
  return String(texto === undefined || texto === null ? '' : texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Lee un valor de la dirección. Ejemplo: en "cliente-detalle.html?id=CLI-001", parametro('id') da "CLI-001" */
function parametro(nombre) {
  return new URLSearchParams(location.search).get(nombre) || '';
}

/* Etiqueta de color para un estado (Recibido, Activo, Entrada...) */
function insignia(estado) {
  const clases = {
    'Recibido': 'insignia-info',
    'En reparación': 'insignia-aviso',
    'Espera de repuestos': 'insignia-aviso',
    'Listo': 'insignia-ok',
    'Entregado': 'insignia-ok',
    'Cancelada': 'insignia-gris',
    'Activo': 'insignia-ok',
    'Inactivo': 'insignia-gris',
    'Agendada': 'insignia-info',
    'Entrada': 'insignia-ok',
    'Salida': 'insignia-aviso'
  };
  return '<span class="insignia ' + (clases[estado] || '') + '">' + escapar(estado) + '</span>';
}

/* ---------- Avisos (mensajes arriba de la página) ---------- */

/* tipo: 'exito', 'aviso', 'error' o 'info' */
function mostrarAviso(tipo, texto, titulo) {
  const iconos = { exito: '✔', aviso: '⚠', error: '✖', info: 'ℹ' };
  const zona = $('#avisos');
  let negrita = '';
  if (titulo) negrita = '<strong>' + escapar(titulo) + '</strong>';
  zona.innerHTML =
    '<p class="aviso aviso-' + tipo + '">' +
    '<span aria-hidden="true">' + iconos[tipo] + '</span>' +
    '<span class="aviso-texto">' + negrita + escapar(texto) + '</span>' +
    '<button type="button" class="aviso-cerrar" aria-label="Cerrar aviso">×</button></p>';
  zona.querySelector('.aviso-cerrar').addEventListener('click', function () {
    zona.innerHTML = '';
  });
}

/* Guarda un aviso para mostrarlo en la página siguiente (después de guardar y cambiar de página) */
function avisarDespues(tipo, texto, titulo) {
  sessionStorage.setItem('tp_aviso', JSON.stringify({ tipo: tipo, texto: texto, titulo: titulo }));
}

function mostrarAvisoPendiente() {
  const texto = sessionStorage.getItem('tp_aviso');
  if (texto === null) return;
  sessionStorage.removeItem('tp_aviso');
  const aviso = JSON.parse(texto);
  mostrarAviso(aviso.tipo, aviso.texto, aviso.titulo);
}

/* ---------- Ventana de confirmación ---------- */

/* Muestra una ventana con dos botones. Si la persona acepta, se ejecuta alAceptar(). */
function confirmar(titulo, mensaje, textoBoton, esPeligro, alAceptar, textoCancelar) {
  if (!textoCancelar) textoCancelar = 'Cancelar';
  const claseBoton = esPeligro ? 'btn-peligro-solido' : 'btn-primario';

  const ventana = document.createElement('dialog');
  ventana.setAttribute('aria-labelledby', 'dlg-titulo');
  ventana.innerHTML =
    '<h2 id="dlg-titulo">' + escapar(titulo) + '</h2>' +
    '<p>' + escapar(mensaje) + '</p>' +
    '<p class="formulario-acciones">' +
    '<button type="button" class="btn btn-secundario" id="dlg-no">' + escapar(textoCancelar) + '</button>' +
    '<button type="button" class="btn ' + claseBoton + '" id="dlg-si">' + escapar(textoBoton) + '</button></p>';
  document.body.appendChild(ventana);

  function cerrar() {
    ventana.close();
    ventana.remove();
  }
  ventana.querySelector('#dlg-no').addEventListener('click', cerrar);
  ventana.querySelector('#dlg-si').addEventListener('click', function () {
    cerrar();
    alAceptar();
  });
  /* La tecla Escape también cierra la ventana */
  ventana.addEventListener('cancel', function (e) {
    e.preventDefault();
    cerrar();
  });
  ventana.showModal();
  ventana.querySelector('#dlg-no').focus();
}

/* ---------- Tablas ---------- */

/* columnas: lista de { titulo, clase, fila, sinTitulo }
     fila: true      -> la celda funciona como encabezado de su fila
     sinTitulo: true -> el título se oculta (solo lo leen los lectores de pantalla)
   filas: lista de listas con el HTML de cada celda
   htmlVacio: lo que se muestra si no hay filas */
function dibujarTabla(idContenedor, titulo, columnas, filas, htmlVacio) {
  const contenedor = $(idContenedor);
  if (filas.length === 0) {
    contenedor.innerHTML = '<section class="vacio">' + htmlVacio + '</section>';
    return;
  }

  let encabezados = '';
  for (let i = 0; i < columnas.length; i++) {
    const col = columnas[i];
    const clase = col.clase ? ' class="' + col.clase + '"' : '';
    const texto = col.sinTitulo ? '<span class="solo-lectores">' + col.titulo + '</span>' : col.titulo;
    encabezados += '<th scope="col"' + clase + '>' + texto + '</th>';
  }

  let cuerpo = '';
  for (let f = 0; f < filas.length; f++) {
    cuerpo += '<tr>';
    for (let c = 0; c < columnas.length; c++) {
      const col = columnas[c];
      const etiqueta = col.sinTitulo ? '' : ' data-label="' + col.titulo + '"';
      const clase = col.clase ? ' class="' + col.clase + '"' : '';
      if (col.fila) {
        cuerpo += '<th scope="row"' + etiqueta + '>' + filas[f][c] + '</th>';
      } else {
        cuerpo += '<td' + etiqueta + clase + '>' + filas[f][c] + '</td>';
      }
    }
    cuerpo += '</tr>';
  }

  contenedor.innerHTML =
    '<table><caption>' + titulo + '</caption>' +
    '<thead><tr>' + encabezados + '</tr></thead>' +
    '<tbody>' + cuerpo + '</tbody></table>';
}

/* Columna de botones que se repite en muchas tablas */
const COLUMNA_ACCIONES = { titulo: 'Acciones', sinTitulo: true, clase: 'acciones-fila' };

/* ---------- Buscadores de las listas ---------- */

/* Conecta el formulario de búsqueda (#form-buscar) con la función que dibuja la tabla */
function conectarBuscador(dibujar) {
  const formulario = $('#form-buscar');
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    dibujar();
  });
  formulario.addEventListener('reset', function () {
    setTimeout(dibujar, 0);
  });
}

/* Conecta el botón "Limpiar" que aparece cuando la búsqueda no encuentra nada */
function conectarLimpiar(dibujar) {
  const boton = $('#v-limpiar');
  if (boton) {
    boton.addEventListener('click', function () {
      $('#form-buscar').reset();
      dibujar();
    });
  }
}

/* Texto en minúsculas para comparar sin importar mayúsculas */
function contieneTexto(textos, busqueda) {
  for (let i = 0; i < textos.length; i++) {
    if (textos[i].toLowerCase().includes(busqueda)) return true;
  }
  return false;
}

/* ---------- Listas desplegables ---------- */

/* Llena un <select>. opciones: lista de [valor, texto]. textoVacio: primera opción sin valor (puede ser null). */
function llenarSelect(select, textoVacio, opciones, seleccionado) {
  let html = '';
  if (textoVacio !== null) html += '<option value="">' + escapar(textoVacio) + '</option>';
  for (let i = 0; i < opciones.length; i++) {
    const marcada = opciones[i][0] === seleccionado ? ' selected' : '';
    html += '<option value="' + escapar(opciones[i][0]) + '"' + marcada + '>' + escapar(opciones[i][1]) + '</option>';
  }
  select.innerHTML = html;
}

/* ---------- Validación de formularios ---------- */

/* formulario: el elemento <form>
   reglas: { nombreDelCampo: function (valor) { return 'mensaje de error' o '' } }
   alEnviar: función que se ejecuta cuando todo está correcto */
function activarFormulario(formulario, reglas, alEnviar) {
  formulario.setAttribute('novalidate', '');
  const resumen = formulario.querySelector('.resumen-errores');
  const campos = formulario.querySelectorAll('input, select, textarea');

  /* Revisa un campo, muestra su error (si tiene) y devuelve el mensaje */
  function revisarCampo(campo) {
    const valor = campo.value;
    let mensaje = '';

    if (campo.required && campo.type !== 'checkbox' && valor.trim() === '') {
      mensaje = 'Este campo es obligatorio.';
    }
    if (mensaje === '' && campo.type === 'email' && valor !== '') {
      const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!formatoCorreo.test(valor.trim())) {
        mensaje = 'Escribe un correo válido, por ejemplo nombre@correo.com.';
      }
    }
    if (mensaje === '' && campo.type === 'number' && valor !== '') {
      const numero = Number(valor);
      if (campo.min !== '' && numero < Number(campo.min)) {
        mensaje = 'El valor debe ser ' + campo.min + ' o mayor.';
      }
    }
    if (mensaje === '' && reglas && reglas[campo.name]) {
      mensaje = reglas[campo.name](valor) || '';
    }

    const zonaError = document.getElementById(campo.id + '-error');
    if (zonaError) {
      zonaError.textContent = mensaje;
      zonaError.hidden = (mensaje === '');
    }
    if (mensaje === '') {
      campo.removeAttribute('aria-invalid');
    } else {
      campo.setAttribute('aria-invalid', 'true');
    }
    return mensaje;
  }

  /* Los errores aparecen al enviar. Después se actualizan mientras la persona corrige. */
  function revisarSiTieneError(e) {
    if (e.target.hasAttribute('aria-invalid')) revisarCampo(e.target);
  }
  for (let i = 0; i < campos.length; i++) {
    campos[i].addEventListener('input', revisarSiTieneError);
    campos[i].addEventListener('change', revisarSiTieneError);
  }

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    const errores = [];
    for (let i = 0; i < campos.length; i++) {
      if (!campos[i].name) continue;
      const mensaje = revisarCampo(campos[i]);
      if (mensaje !== '') {
        const etiqueta = document.querySelector('label[for="' + campos[i].id + '"]');
        const rotulo = etiqueta ? etiqueta.childNodes[0].textContent.trim() : campos[i].name;
        errores.push({ campo: campos[i], rotulo: rotulo, mensaje: mensaje });
      }
    }

    if (errores.length > 0) {
      if (resumen) {
        let html = '<strong>Revisa ' + (errores.length === 1 ? '1 campo' : errores.length + ' campos') + ' antes de guardar:</strong><ul>';
        for (let i = 0; i < errores.length; i++) {
          html += '<li><a href="#' + errores[i].campo.id + '">' + escapar(errores[i].rotulo) + '</a>: ' + escapar(errores[i].mensaje) + '</li>';
        }
        resumen.innerHTML = html + '</ul>';
        resumen.hidden = false;
        resumen.focus();
      }
      return;
    }

    if (resumen) resumen.hidden = true;
    alEnviar();
  });

  /* Al pulsar un error del resumen, el foco va al campo */
  if (resumen) {
    resumen.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        document.getElementById(e.target.getAttribute('href').slice(1)).focus();
      }
    });
  }
}
