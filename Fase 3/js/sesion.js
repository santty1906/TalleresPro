/* TalleresPro — sesión y permisos por rol (matriz rol–vista de las Fases 1 y 2).
   En la Fase 4 la sesión y los permisos pasan al servidor (PHP). */

const ROLES = {
  admin: 'Administrador',
  recep: 'Recepcionista',
  tec: 'Técnico',
  inv: 'Encargado de inventario',
  admvo: 'Encargado administrativo'
};

/* Página donde llega cada rol después de iniciar sesión */
const INICIO = {
  admin: 'dashboard.html',
  recep: 'ordenes.html',
  tec: 'ordenes.html',
  inv: 'inventario.html',
  admvo: 'finanzas.html'
};

/* Roles que pueden gestionar (crear y editar) cada módulo  ● */
const GESTION = {
  dashboard: ['admin'],
  usuarios: ['admin'],
  clientes: ['recep'],
  vehiculos: ['recep'],
  servicios: ['admin'],
  citas: ['admin', 'recep'],
  ordenes: ['admin', 'recep'],
  'orden-detalle': ['tec'],
  inventario: ['inv'],
  finanzas: ['admvo'],
  reportes: ['admin', 'admvo']
};

/* Roles que solo pueden consultar cada módulo  ◐ */
const LECTURA = {
  clientes: ['admin'],
  vehiculos: ['admin'],
  servicios: ['recep'],
  ordenes: ['tec', 'inv', 'admvo'],
  'orden-detalle': ['admin', 'recep', 'admvo'],
  inventario: ['admin'],
  finanzas: ['admin']
};

function puedeGestionar(modulo, rol) {
  const roles = GESTION[modulo] || [];
  return roles.includes(rol);
}

function puedeVer(modulo, rol) {
  const roles = LECTURA[modulo] || [];
  return puedeGestionar(modulo, rol) || roles.includes(rol);
}

/* Devuelve los datos de la persona con sesión iniciada, o null si no hay */
function obtenerSesion() {
  const texto = sessionStorage.getItem('tp_sesion');
  if (texto === null) return null;
  return JSON.parse(texto);
}

/* Revisa correo y contraseña. Devuelve un texto con el motivo si falla, o null si todo va bien. */
function iniciarSesion(correo, clave) {
  let usuario = null;
  for (let i = 0; i < datos.usuarios.length; i++) {
    if (datos.usuarios[i].correo.toLowerCase() === correo.trim().toLowerCase()) {
      usuario = datos.usuarios[i];
    }
  }
  if (usuario === null || usuario.clave !== clave) return 'credenciales';
  if (!usuario.activo) return 'desactivada';
  sessionStorage.setItem('tp_sesion', JSON.stringify({ id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }));
  return null;
}

function cerrarSesion() {
  sessionStorage.removeItem('tp_sesion');
}
