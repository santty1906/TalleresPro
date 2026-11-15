/* TalleresPro — datos de ejemplo (Fase 3: todavía no hay base de datos).
   En la Fase 4 estos arreglos se reemplazan por consultas a MySQL. */

/* Fecha "de hoy" fija para que los ejemplos siempre se vean igual */
const HOY = '2026-11-14';

/* Cada lista es un arreglo de objetos, como una tabla de la base de datos */
let datos = {
  clientes: [
    { id: 'CLI-001', nombre: 'Rosa Pérez', documento: '8-745-1203', telefono: '6612-3401', correo: 'rosa.perez@correo.com', activo: true },
    { id: 'CLI-002', nombre: 'Juan Torres', documento: '4-188-921', telefono: '6788-1120', correo: 'juan.torres@correo.com', activo: true },
    { id: 'CLI-003', nombre: 'Transportes Amigo, S.A.', documento: '155612345-2-2019', telefono: '263-0101', correo: 'contacto@transportesamigo.com', activo: false },
    { id: 'CLI-004', nombre: 'Carmen Ortega', documento: '3-120-554', telefono: '6234-9087', correo: 'carmen.ortega@correo.com', activo: true }
  ],

  vehiculos: [
    { id: 'VEH-001', placa: 'AB1234', marca: 'Toyota', modelo: 'Corolla', anio: 2019, color: 'Blanco', clienteId: 'CLI-001' },
    { id: 'VEH-002', placa: 'CD5678', marca: 'Nissan', modelo: 'Versa', anio: 2021, color: 'Gris', clienteId: 'CLI-002' },
    { id: 'VEH-003', placa: 'EF9012', marca: 'Hyundai', modelo: 'Accent', anio: 2017, color: 'Rojo', clienteId: 'CLI-001' },
    { id: 'VEH-004', placa: 'GH3456', marca: 'Kia', modelo: 'Picanto', anio: 2022, color: 'Azul', clienteId: 'CLI-004' },
    { id: 'VEH-005', placa: 'JK7788', marca: 'Toyota', modelo: 'Hilux', anio: 2020, color: 'Negro', clienteId: 'CLI-003' }
  ],

  servicios: [
    { id: 'SRV-001', nombre: 'Afinamiento', descripcion: 'Mantenimiento preventivo básico', precio: 120 },
    { id: 'SRV-002', nombre: 'Revisión de frenos', descripcion: 'Inspección y ajuste del sistema de frenos', precio: 80 },
    { id: 'SRV-003', nombre: 'Cambio de aceite y filtro', descripcion: 'Aceite 10W-30 y filtro nuevo', precio: 45 },
    { id: 'SRV-004', nombre: 'Alineación y balanceo', descripcion: 'Alineación de las cuatro ruedas', precio: 60 }
  ],

  citas: [
    { id: 'CIT-001', fecha: '2026-11-14', hora: '09:00', clienteId: 'CLI-001', vehiculoId: 'VEH-003', servicioId: 'SRV-001', estado: 'Agendada' },
    { id: 'CIT-002', fecha: '2026-11-14', hora: '11:30', clienteId: 'CLI-002', vehiculoId: 'VEH-002', servicioId: 'SRV-002', estado: 'Agendada' },
    { id: 'CIT-003', fecha: '2026-11-14', hora: '14:00', clienteId: 'CLI-004', vehiculoId: 'VEH-004', servicioId: '', estado: 'Agendada' },
    { id: 'CIT-004', fecha: '2026-11-14', hora: '16:00', clienteId: 'CLI-001', vehiculoId: 'VEH-001', servicioId: 'SRV-004', estado: 'Cancelada' },
    { id: 'CIT-005', fecha: '2026-11-16', hora: '08:30', clienteId: 'CLI-001', vehiculoId: 'VEH-001', servicioId: 'SRV-004', estado: 'Agendada' }
  ],

  ordenes: [
    {
      id: 'ORD-001', fecha: '2026-11-10', clienteId: 'CLI-001', vehiculoId: 'VEH-001', estado: 'En reparación',
      problema: 'Los frenos chirrean al frenar.', serviciosIds: ['SRV-001', 'SRV-002'], tecnicoId: 'USR-002',
      diagnostico: 'Pastillas desgastadas; rectificar discos.',
      tareas: [{ texto: 'Cambiar pastillas', hecha: true }, { texto: 'Rectificar discos', hecha: false }]
    },
    {
      id: 'ORD-002', fecha: '2026-11-13', clienteId: 'CLI-002', vehiculoId: 'VEH-002', estado: 'Recibido',
      problema: 'Se enciende la luz de revisión del motor.', serviciosIds: ['SRV-001', 'SRV-003'], tecnicoId: 'USR-002',
      diagnostico: '', tareas: []
    },
    {
      id: 'ORD-003', fecha: '2026-11-11', clienteId: 'CLI-004', vehiculoId: 'VEH-004', estado: 'Listo',
      problema: 'Cambio de aceite según kilometraje.', serviciosIds: ['SRV-003'], tecnicoId: 'USR-006',
      diagnostico: 'Servicio completado sin novedades.',
      tareas: [{ texto: 'Cambiar aceite y filtro', hecha: true }]
    },
    {
      id: 'ORD-004', fecha: '2026-11-12', clienteId: 'CLI-001', vehiculoId: 'VEH-003', estado: 'En reparación',
      problema: 'El aire acondicionado no enfría.', serviciosIds: ['SRV-001'], tecnicoId: 'USR-006',
      diagnostico: 'Posible fuga de gas refrigerante.',
      tareas: [{ texto: 'Revisar compresor', hecha: false }]
    }
  ],

  productos: [
    { id: 'PRD-001', nombre: 'Pastillas de freno delanteras', stock: 2, minimo: 5, activo: true },
    { id: 'PRD-002', nombre: 'Aceite 10W-30 (litro)', stock: 20, minimo: 4, activo: true },
    { id: 'PRD-003', nombre: 'Filtro de aceite', stock: 12, minimo: 6, activo: true },
    { id: 'PRD-004', nombre: 'Bujías (juego)', stock: 3, minimo: 8, activo: true },
    { id: 'PRD-005', nombre: 'Líquido de frenos', stock: 9, minimo: 3, activo: true },
    { id: 'PRD-006', nombre: 'Batería 12V', stock: 1, minimo: 2, activo: true }
  ],

  movimientos: [
    { id: 'MOV-001', fecha: '2026-11-08', productoId: 'PRD-002', tipo: 'Entrada', cantidad: 24, ordenId: '' },
    { id: 'MOV-002', fecha: '2026-11-11', productoId: 'PRD-002', tipo: 'Salida', cantidad: 4, ordenId: 'ORD-003' },
    { id: 'MOV-003', fecha: '2026-11-11', productoId: 'PRD-003', tipo: 'Salida', cantidad: 1, ordenId: 'ORD-003' }
  ],

  pagos: [
    { id: 'PAG-001', fecha: '2026-11-10', ordenId: 'ORD-001', monto: 50, metodo: 'Efectivo' },
    { id: 'PAG-002', fecha: '2026-11-14', ordenId: 'ORD-003', monto: 45, metodo: 'Tarjeta' }
  ],

  facturas: [
    { id: 'FAC-0001', fecha: '2026-11-14', ordenId: 'ORD-003' }
  ],

  finanzas: [
    { id: 'FIN-001', tipo: 'Ingreso', fecha: '2026-11-05', concepto: 'Alquiler de cochera', monto: 300 },
    { id: 'FIN-002', tipo: 'Gasto', fecha: '2026-11-07', concepto: 'Compra de repuestos', monto: 450 },
    { id: 'FIN-003', tipo: 'Gasto', fecha: '2026-11-09', concepto: 'Pago de electricidad', monto: 180 },
    { id: 'FIN-004', tipo: 'Ingreso', fecha: '2026-11-11', concepto: 'Venta de chatarra', monto: 75 }
  ],

  usuarios: [
    { id: 'USR-001', nombre: 'Ana Morales', correo: 'admin@talleres.test', rol: 'admin', activo: true, clave: 'Taller2026!' },
    { id: 'USR-002', nombre: 'Luis Batista', correo: 'tecnico@talleres.test', rol: 'tec', activo: true, clave: 'Taller2026!' },
    { id: 'USR-003', nombre: 'Karen Díaz', correo: 'recepcion@talleres.test', rol: 'recep', activo: true, clave: 'Taller2026!' },
    { id: 'USR-004', nombre: 'Pedro Samaniego', correo: 'inventario@talleres.test', rol: 'inv', activo: true, clave: 'Taller2026!' },
    { id: 'USR-005', nombre: 'Elena Cedeño', correo: 'finanzas@talleres.test', rol: 'admvo', activo: true, clave: 'Taller2026!' },
    { id: 'USR-006', nombre: 'Marcos Quintero', correo: 'tecnico2@talleres.test', rol: 'tec', activo: true, clave: 'Taller2026!' },
    { id: 'USR-007', nombre: 'Diana Vega', correo: 'diana.vega@talleres.test', rol: 'recep', activo: false, clave: 'Taller2026!' }
  ]
};

/* Estados que puede tener una orden */
const estadosOrden = ['Recibido', 'En reparación', 'Espera de repuestos', 'Listo', 'Entregado', 'Cancelada'];

/* A qué estados se puede pasar desde cada estado.
   Una orden solo llega a "Listo" desde "En reparación". */
const transiciones = {
  'Recibido': ['En reparación', 'Cancelada'],
  'En reparación': ['Espera de repuestos', 'Listo', 'Cancelada'],
  'Espera de repuestos': ['En reparación', 'Cancelada'],
  'Listo': ['Entregado', 'En reparación'],
  'Entregado': [],
  'Cancelada': []
};

/* Una orden está "activa" mientras el taller todavía trabaja en ella */
function ordenActiva(orden) {
  return orden.estado === 'Recibido' || orden.estado === 'En reparación' || orden.estado === 'Espera de repuestos';
}

/* Los cambios hechos en pantalla se guardan en sessionStorage mientras la pestaña esté abierta.
   Al cerrarla se vuelve a los datos de ejemplo. */
const datosGuardados = sessionStorage.getItem('tp_datos');
if (datosGuardados) {
  datos = JSON.parse(datosGuardados);
}

function guardar() {
  sessionStorage.setItem('tp_datos', JSON.stringify(datos));
}

/* Crea el siguiente código de una lista. Ejemplo: siguienteId('clientes', 'CLI') -> 'CLI-005' */
function siguienteId(lista, prefijo, digitos) {
  if (digitos === undefined) digitos = 3;
  let mayor = 0;
  for (let i = 0; i < datos[lista].length; i++) {
    const numero = parseInt(datos[lista][i].id.split('-')[1], 10);
    if (numero > mayor) mayor = numero;
  }
  return prefijo + '-' + String(mayor + 1).padStart(digitos, '0');
}

/* Busca un registro por su id. Devuelve null si no existe. */
function buscar(lista, id) {
  for (let i = 0; i < datos[lista].length; i++) {
    if (datos[lista][i].id === id) return datos[lista][i];
  }
  return null;
}

/* Suma de los precios de los servicios de una orden */
function totalOrden(orden) {
  let total = 0;
  for (let i = 0; i < orden.serviciosIds.length; i++) {
    const servicio = buscar('servicios', orden.serviciosIds[i]);
    if (servicio) total = total + servicio.precio;
  }
  return total;
}

/* Suma de los pagos de una orden */
function cobrado(ordenId) {
  let total = 0;
  for (let i = 0; i < datos.pagos.length; i++) {
    if (datos.pagos[i].ordenId === ordenId) total = total + datos.pagos[i].monto;
  }
  return total;
}

function saldo(orden) {
  return totalOrden(orden) - cobrado(orden.id);
}

function stockBajo(producto) {
  return producto.stock <= producto.minimo;
}

function nombreCliente(id) {
  const cliente = buscar('clientes', id);
  return cliente ? cliente.nombre : '—';
}

function rotuloVehiculo(id) {
  const v = buscar('vehiculos', id);
  return v ? v.placa + ' · ' + v.marca + ' ' + v.modelo + ' ' + v.anio : '—';
}
