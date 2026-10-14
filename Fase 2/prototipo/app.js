/* TalleresPro Fase 2 — lógica del prototipo (demo, sin backend; nada persiste) */
const pantallas = {
  login: 'pantalla-login', dashboard: 'pantalla-dashboard', clientes: 'pantalla-clientes',
  vehiculos: 'pantalla-vehiculos', citas: 'pantalla-citas', ordenes: 'pantalla-ordenes',
  'orden-detalle': 'pantalla-orden-detalle', inventario: 'pantalla-inventario',
  finanzas: 'pantalla-finanzas', reportes: 'pantalla-reportes', usuarios: 'pantalla-usuarios',
  servicios: 'pantalla-servicios'
};
const nombres = { admin: 'Ana (Admin)', recep: 'Rosa (Recepcionista)', tec: 'Luis (Técnico)', inv: 'Pedro (Inventario)', admvo: 'María (Admvo)' };
const migas = document.getElementById('migas');
const toast = document.getElementById('toast');
const nav = document.getElementById('nav');
let rol = 'admin';

function aviso(msg, ms = 2600) {
  toast.textContent = msg; toast.hidden = false;
  clearTimeout(aviso.t); aviso.t = setTimeout(() => toast.hidden = true, ms);
}
function ir(destino, miga) {
  document.querySelectorAll('.pantalla').forEach(s => s.classList.remove('activa'));
  const id = pantallas[destino] || 'pantalla-login';
  document.getElementById(id).classList.add('activa');
  document.querySelectorAll('#nav button[data-go]').forEach(b =>
    b.classList.toggle('active', b.dataset.go === destino));
  if (miga) migas.textContent = miga;
  nav.classList.remove('abierto');
  document.getElementById('contenido').focus({ preventScroll: true });
  window.scrollTo({ top: 0 });
}
function filtrarPorRol() {
  document.querySelectorAll('#nav button[data-go]').forEach(b => {
    const ok = (b.dataset.roles || '').split(' ').includes(rol);
    b.style.display = ok ? '' : 'none';
  });
  // Acciones dentro de cada pantalla: solo visibles para los roles
  // confirmados en la matriz Fase 1 Sección 8.4 / B1 (● gestiona). Los roles
  // de solo lectura (◐) y los pendientes (P-02/P-03) no las ven.
  document.querySelectorAll('[data-solo]').forEach(el => {
    const ok = (el.dataset.solo || '').split(' ').includes(rol);
    el.style.display = ok ? '' : 'none';
  });
  // Si la pantalla actual quedó sin permiso -> 403 demo
  const activo = document.querySelector('#nav button.active');
  if (activo && activo.style.display === 'none') {
    ir('login', '403 · Sin permiso (demo)');
    aviso('403 demo: tu rol no ve esa sección. [Volver a tu inicio]. Nada persiste.');
  }
  document.getElementById('usuarioDemo').textContent = nombres[rol];
}
document.addEventListener('click', e => {
  const go = e.target.closest('[data-go]');
  if (go) { ir(go.dataset.go, go.dataset.crumb || go.textContent.trim()); return; }
  const d = e.target.closest('[data-demo]');
  if (!d) return;
  const k = d.dataset.demo;
  // Demos de estados y acciones simuladas (siempre avisan que no persiste)
  const demo = {
    'login-error': () => { const m = document.getElementById('loginMsg'); m.hidden = false; m.className = 'alert err'; m.textContent = 'Correo o contraseña incorrectos (demo CU-01 E1). Nada persiste.'; },
    'login-vacio': () => { const m = document.getElementById('loginMsg'); m.hidden = false; m.className = 'alert err'; m.textContent = 'Indica correo y contraseña (demo CU-01 E3).'; },
    'dash-vacio': () => aviso('Demo: indicadores en “0 / sin registros” (CU-15 E1).'),
    'dash-error': () => { document.getElementById('dashError').hidden = false; },
    'dash-ok': () => { document.getElementById('dashError').hidden = true; aviso('Demo: indicador recargado.'); },
    'cli-buscar': () => aviso('Demo: búsqueda “rosa” → 1 coincidencia. Sin coincidencias ofrecería [Registrar].'),
    'cli-limpiar': () => { document.getElementById('cliVacio').hidden = true; aviso('Demo: filtros limpios.'); },
    'cli-nuevo': () => aviso('Demo: iría a V-04b Formulario. Nada persiste.'),
    'cli-detalle': () => aviso('Demo: detalle V-04c con vehículos + [Agregar vehículo].'),
    'cli-editar': () => aviso('Demo: edición V-04b con validación RNF-11.'),
    'cli-desactivar': () => confirm('Demo: ¿Desactivar cliente? No borra (RF-08). Con órdenes activas debe advertir [P].') && aviso('Demo: cliente desactivado (no persiste).'),
    'cli-cancelar': () => aviso('Demo: Cancelar descarta sin guardar → origen.'),
    'veh-historial': () => aviso('Demo: historial = órdenes del vehículo (RF-12).'),
    'cita-nueva': () => aviso('Demo: iría a V-07b Formulario (cliente + vehículo + fecha/hora). Nada persiste.'),
    'cita-cancelar': () => confirm('Demo: ¿Cancelar cita? (RF-27). Atendida/cancelada no se duplica.') && aviso('Demo: cita cancelada (no persiste).'),
    'ord-nueva': () => aviso('Demo: V-08b con cliente+vehículo precargados; guarda en “Recibido”.'),
    'ord-guardar': () => aviso('Demo: orden actualizada (diagnóstico/tareas/estado). Transición validada [P].'),
    'tarea-add': () => aviso('Demo: tarea agregada a la orden (no persiste).'),
    'mov-salida': () => aviso('Demo: salida con orden precargada; valida stock (CU-10 E2).'),
    'mov-entrada': () => aviso('Demo: entrada suma stock (RF-20/22).'),
    'factura': () => { document.getElementById('facturaBox').textContent = 'Demo: Factura F-0007 · Consecutivo único · Total S/ 200 · Reimprimible. Interna simple (CU-13). Nada persiste.'; aviso('Demo: factura generada (no persiste).'); }
  };
  if (demo[k]) demo[k]();
});
document.getElementById('btnMenu').addEventListener('click', e => {
  const abierto = nav.classList.toggle('abierto');
  e.currentTarget.setAttribute('aria-expanded', abierto);
});
document.getElementById('selRol').addEventListener('change', e => {
  rol = e.target.value; filtrarPorRol();
  aviso('Demo: rol “' + nombres[rol] + '”. Menú filtrado por rol (RF-04). Nada persiste.');
  if (rol !== 'admin') ir('ordenes', 'Mi módulo (demo P-01)');
  else ir('dashboard', 'Dashboard › Resumen');
});
// Formularios demo: validan de frente y avisan que nada persiste
document.getElementById('formLogin').addEventListener('submit', e => {
  e.preventDefault();
  const c = document.getElementById('correo').value, p = document.getElementById('clave').value;
  const m = document.getElementById('loginMsg');
  if (!c || !p) { m.hidden = false; m.className = 'alert err'; m.textContent = 'Indica correo y contraseña (demo RNF-02).'; return; }
  if (c === 'demo@taller.test' && p === 'demo1234') { m.hidden = true; ir('dashboard', 'Dashboard › Resumen'); aviso('Demo: sesión iniciada como ' + nombres[rol] + '. Nada persiste.'); }
  else { m.hidden = false; m.className = 'alert err'; m.textContent = 'Correo o contraseña incorrectos (demo). Prueba demo@taller.test / demo1234.'; }
});
document.getElementById('formCli').addEventListener('submit', e => { e.preventDefault(); aviso('Demo: validación RNF-11 — corrige el correo. Nada persiste.'); });
document.getElementById('formOrd').addEventListener('submit', e => { e.preventDefault(); ir('orden-detalle', 'Órdenes › ORD-003 › Detalle'); aviso('Demo: orden creada en “Recibido” (no persiste).'); });
document.getElementById('formMov').addEventListener('submit', e => {
  e.preventDefault();
  const cant = Number(document.getElementById('movCant').value), err = document.getElementById('eMov');
  if (!(cant > 0)) { err.hidden = false; err.textContent = 'La cantidad debe ser mayor que cero (demo CU-10 E1).'; return; }
  if (cant > 2) { err.hidden = false; err.textContent = 'Stock disponible: 2. Reduce la cantidad (demo CU-10 E2). No se descontó.'; return; }
  err.hidden = true; aviso('Demo: salida registrada, stock 2 → ' + (2 - cant) + '. Aviso de stock bajo si ≤ mínimo (no persiste).');
});
document.getElementById('formPago').addEventListener('submit', e => {
  e.preventDefault();
  const monto = Number(document.getElementById('pagoMonto').value), met = document.getElementById('pagoMet').value, err = document.getElementById('ePago');
  if (!(monto > 0)) { err.hidden = false; err.textContent = 'El monto debe ser mayor que cero (demo CU-11).'; return; }
  if (!met) { err.hidden = false; err.textContent = 'Elige el método de pago (demo CU-11 E3).'; return; }
  if (monto > 150) { err.hidden = false; err.textContent = 'Supera el saldo (S/ 150). Ajusta el monto. Regla de sobrepago [P] (demo CU-11 E1).'; return; }
  err.hidden = true; aviso('Demo: pago registrado. Nuevo saldo S/ ' + (150 - monto) + '. Nada persiste.');
});
document.getElementById('formRep').addEventListener('submit', e => { e.preventDefault(); aviso('Demo: reporte generado con esos filtros. Sin datos mostraría “Ajustar filtros” (CU-14 E2).'); });
filtrarPorRol();
