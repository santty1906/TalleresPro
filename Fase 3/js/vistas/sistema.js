/* Páginas de sistema: sin permiso y no encontrado */
const paginaSistema = iniciarPagina();
if (paginaSistema !== null) {
  $('#volver-inicio').setAttribute('href', INICIO[paginaSistema.rol]);
}
