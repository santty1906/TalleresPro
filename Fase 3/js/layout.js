/* TalleresPro — parte común de todas las páginas internas:
   control de acceso, menú según el rol, botón de salir y menú del celular. */

/* Se llama al inicio de cada página. Devuelve { rol, sesion, gestiona },
   o null si la persona no puede estar en esta página (ya la redirigió). */
function iniciarPagina() {
  const cuerpo = document.body;
  const modulo = cuerpo.dataset.modulo;

  /* 1. ¿Hay sesión iniciada? */
  const sesion = obtenerSesion();
  if (sesion === null) {
    avisarDespues('info', 'Inicia sesión para continuar.');
    location.replace('login.html');
    return null;
  }
  const rol = sesion.rol;

  /* 2. ¿Este rol puede ver la página? (las páginas "sesion" las ve cualquiera con sesión) */
  if (cuerpo.dataset.acceso !== 'sesion') {
    let permitido = puedeVer(modulo, rol);
    if (cuerpo.dataset.requiere === 'gestion' && !puedeGestionar(modulo, rol)) permitido = false;
    if (!permitido) {
      location.replace('sin-permiso.html');
      return null;
    }
  }
  const gestiona = puedeGestionar(modulo, rol);

  /* 3. Cabecera: nombre y rol de la persona */
  $('#usuario-nombre').textContent = sesion.nombre;
  $('#usuario-rol').textContent = ROLES[rol];
  $('.marca').setAttribute('href', INICIO[rol]);

  /* 4. Menú: se quitan los módulos que este rol no puede ver */
  const enlacesMenu = $$('.menu a[data-modulo]');
  for (let i = 0; i < enlacesMenu.length; i++) {
    if (!puedeVer(enlacesMenu[i].dataset.modulo, rol)) enlacesMenu[i].closest('li').remove();
  }
  const gruposMenu = $$('.menu-grupo');
  for (let i = 0; i < gruposMenu.length; i++) {
    if (!gruposMenu[i].querySelector('li')) gruposMenu[i].remove();
  }
  const moduloActivo = cuerpo.dataset.menu || modulo;
  const enlaceActivo = $('.menu a[data-modulo="' + moduloActivo + '"]');
  if (enlaceActivo) enlaceActivo.setAttribute('aria-current', 'page');

  /* 5. Botones de crear/editar: se quitan si el rol solo puede consultar */
  const botonesGestion = $$('[data-gestion]');
  for (let i = 0; i < botonesGestion.length; i++) {
    if (!puedeGestionar(botonesGestion[i].dataset.gestion, rol)) botonesGestion[i].remove();
  }
  const soloRoles = $$('[data-roles]');
  for (let i = 0; i < soloRoles.length; i++) {
    if (!soloRoles[i].dataset.roles.split(' ').includes(rol)) soloRoles[i].remove();
  }

  /* 6. Cerrar sesión */
  $('#btn-salir').addEventListener('click', cerrarSesion);

  /* 7. Menú del celular */
  const botonMenu = $('#btn-menu');
  const menu = $('#menu-principal');
  const fondo = $('#menu-fondo');

  function abrirMenu(abrir) {
    menu.classList.toggle('abierto', abrir);
    fondo.hidden = !abrir;
    botonMenu.setAttribute('aria-expanded', String(abrir));
    botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    if (abrir) menu.querySelector('a').focus();
    else botonMenu.focus();
  }
  botonMenu.addEventListener('click', function () {
    abrirMenu(!menu.classList.contains('abierto'));
  });
  fondo.addEventListener('click', function () {
    abrirMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('abierto')) abrirMenu(false);
  });

  mostrarAvisoPendiente();
  return { rol: rol, sesion: sesion, gestiona: gestiona };
}
