# Matriz de trazabilidad — TalleresPro Fase 1 (Deliverable 9)

Fuente de IDs y redacción: `Fase 1/README_Fase_1.md` (Sección 1–8), `diagrama_casos_uso.puml`, `diagrama_clases.puml`, `diagrama_navegacion.puml`. No se crean identificadores, requisitos ni relaciones nuevas. La trazabilidad describe relaciones en la documentación; no prueba implementación ni pruebas del software.

## 0. Notación

* **●** primario: ejecuta, inicia o es responsable. **◐** secundario / solo lectura / uso parcial. **—** sin relación documentada. **P** pendiente de confirmación (ver Sección 8.7 de este archivo y Sección 6.5/7.8/8.7 del documento).
* Escenarios (nombres exactos del documento): **Esc-1** Registrar un cliente · **Esc-2** Registrar un vehículo · **Esc-3** Crear una orden de reparación · **Esc-4** Actualizar una reparación · **Esc-5** Registrar salida de inventario · **Esc-6** Registrar un pago · **Esc-7** Consultar el dashboard.
* Estado de trazabilidad: **Trazado** (cadena completa) · **Parcial** (falta escenario u otro eslabón) · **Pendiente** (decisión del equipo bloquea la confirmación).
* Clases (Sección 7): Rol, Usuario, Cliente, Vehiculo, Servicio, OrdenReparacion, DetalleOrden, Tarea, Cita, Producto, MovimientoInventario, Pago, Ingreso, Gasto, FacturaInterna.
* Vistas (Sección 8): V-01 Login · V-02 Dashboard · V-03 Usuarios · V-04 Clientes · V-05 Vehículos · V-06 Servicios · V-07 Citas · V-08 Órdenes · V-09 Inventario · V-10 Finanzas · V-11 Reportes.

## A. Objetivo → requisitos

Objetivo general documentado (Sección 1.4, texto exacto): *"Desarrollar un sistema web que permita gestionar de manera centralizada las principales operaciones de un taller de reparación y mantenimiento, facilitando el seguimiento de las reparaciones, el control de inventario y la administración de la información financiera."* No existen sub-objetivos numerados. Las filas TEMP-Ox son identificadores temporales de organización (no requisitos nuevos) para cada pilar del propio objetivo.

| Objetivo (temporal) | RF que lo soportan | RNF transversales |
|---|---|---|
| TEMP-O1 Seguimiento de reparaciones | RF-05–RF-18, RF-24–RF-28 | RNF-01–RNF-05, RNF-07–RNF-11 |
| TEMP-O2 Control de inventario | RF-19–RF-23 | RNF-01–RNF-05, RNF-07–RNF-11 |
| TEMP-O3 Administración financiera | RF-29–RF-33 | RNF-01–RNF-05, RNF-07–RNF-11 |
| TEMP-O4 Base transversal (acceso, reportes, dashboard) | RF-01–RF-04, RF-34–RF-38 | RNF-01–RNF-12 |

## B1. RF → roles (● primario, ◐ secundario/lectura)

| RF | Administrador | Recepcionista | Técnico | Enc. inventario | Enc. administrativo |
|---|---|---|---|---|---|
| RF-01 Registrar usuarios | ● | — | — | — | — |
| RF-02 Iniciar sesión | ● | ● | ● | ● | ● |
| RF-03 Asignar roles | ● | — | — | — | — |
| RF-04 Acceso por rol | ● | — | — | — | — |
| RF-05 Guardar clientes | ◐ | ● | — | — | — |
| RF-06 Buscar/ver clientes | ◐ | ● | — | — | — |
| RF-07 Editar cliente | ◐ | ● | — | — | — |
| RF-08 Desactivar clientes | ◐ | ● | — | — | — |
| RF-09 Registrar vehículos | ◐ | ● | — | — | — |
| RF-10 Ver vehículos | ◐ | ● | — | — | — |
| RF-11 Editar vehículo | ◐ | ● | — | — | — |
| RF-12 Historial del vehículo | ◐ | ● | ◐ (vía CU-08) | — | — |
| RF-13 Crear órdenes | ◐ | ● | — | — | — |
| RF-14 Vincular orden-cliente-auto | ◐ | ● | — | — | — |
| RF-15 Problema reportado | ◐ | ● | — | — | — |
| RF-16 Diagnóstico y tareas | ◐ | ◐ | ● | — | — |
| RF-17 Cambiar estado | ◐ | ◐ | ● | — | — |
| RF-18 Consultar órdenes | ◐ | ◐ | ● | ◐ (asociar salida) | ◐ (cobrar) |
| RF-19 Registrar repuestos | ◐ | — | — | ● | — |
| RF-20 Entradas | — | — | — | ● | — |
| RF-21 Salidas | — | — | — | ● | — |
| RF-22 Stock automático (regla) | — | — | — | ● | — |
| RF-23 Aviso stock bajo | ◐ (vía Dashboard) | — | — | ● | — |
| RF-24 Catálogo servicios | ● | ◐ (P: usa; gestión pendiente) | — | — | — |
| RF-25 Precio servicios | ● | ◐ (P) | — | — | — |
| RF-26 Agendar citas | ◐ | ● | — | — | — |
| RF-27 Editar/cancelar citas | ◐ | ● | — | — | — |
| RF-28 Ver agenda | ◐ | ● | — | — | — |
| RF-29 Cobros de órdenes | ◐ | — | — | — | ● |
| RF-30 Saldo pendiente | ◐ | — | — | — | ● |
| RF-31 Otros ingresos | ◐ | — | — | — | ● |
| RF-32 Gastos | ◐ | — | — | — | ● |
| RF-33 Facturas internas | ◐ | — | — | — | ● |
| RF-34 Reporte reparaciones | ● | — | — | — | ● |
| RF-35 Reporte inventario | ● | — | — | — | ● |
| RF-36 Reporte financiero | ● | — | — | — | ● |
| RF-37 Panel resumen | ● | — | — | — | — |
| RF-38 Contenido del panel | ● | — | — | — | — |

## B2. RNF → alcance

| RNF | Alcance / grupos |
|---|---|
| RNF-01 Interfaz comprensible | Transversal; los 5 roles |
| RNF-02 Formularios y mensajes | Transversal; todas las vistas con formulario |
| RNF-03 Navegación consistente | Transversal; V-01–V-11 |
| RNF-04 Funciones sensibles con login | Todos los roles; CU-01 precondición |
| RNF-05 Restricción por rol | Usuario + Rol; matriz Sección 8.4 |
| RNF-06 Contraseñas seguras | Usuario (hash, nunca en claro) |
| RNF-07 Rendimiento razonable | Transversal; sin métrica (pendiente de cuantificar) |
| RNF-08 Chrome/Edge/Firefox | Transversal; sin clase asociada |
| RNF-09 Responsive (PC/tablet/móvil) | Transversal; V-01–V-11 |
| RNF-10 Integridad referencial | Cliente, Vehiculo, OrdenReparacion, Producto y asociados |
| RNF-11 Validación de datos | Transversal; formularios y guardados |
| RNF-12 Código modular | Implementación; sin clase de dominio directa |

## C. RF → escenarios y casos de uso

Base verificada: Sección 6.4. Escenario presente solo cuando el flujo documentado lo recorre; en otro caso se marca **—** (cubierto por su CU, sin escenario). Ningún RF queda sin CU.

| RF | Escenarios | CU | Estado |
|---|---|---|---|
| RF-01 | — | CU-02 | Parcial (sin escenario dedicado) |
| RF-02 | (pasos de login en Esc-1/4/7, sin escenario propio) | CU-01 | Parcial |
| RF-03, RF-04 | — | CU-02 | Parcial |
| RF-05 | Esc-1 | CU-03 | Trazado |
| RF-06, RF-07, RF-08 | — | CU-03 | Parcial |
| RF-09 | Esc-2 | CU-04 | Trazado |
| RF-10, RF-11, RF-12 | — | CU-04 | Parcial |
| RF-13, RF-14, RF-15 | Esc-3 | CU-07 | Trazado |
| RF-16, RF-17 | Esc-4 | CU-08 | Trazado |
| RF-18 | Esc-4 (consulta en flujo) | CU-08 | Trazado |
| RF-19 | — | CU-09 | Parcial |
| RF-20 | — (entradas no escenificadas) | CU-10 | Parcial |
| RF-21, RF-22 | Esc-5 (salida; el sistema actualiza) | CU-10 | Trazado |
| RF-23 | — (alerta no escenificada) | CU-10 | Parcial |
| RF-24, RF-25 | — | CU-05 | Parcial |
| RF-26, RF-27, RF-28 | — | CU-06 | Parcial |
| RF-29, RF-30 | Esc-6 | CU-11 | Trazado |
| RF-31, RF-32 | — | CU-12 | Parcial |
| RF-33 | — | CU-13 | Parcial |
| RF-34, RF-35, RF-36 | — | CU-14 | Parcial |
| RF-37, RF-38 | Esc-7 | CU-15 | Trazado |

Conteo: **RF→CU 38/38**; **RF con escenario 14/38** (RF-05, 09, 13–18, 21, 22, 29, 30, 37, 38); **sin CU: 0**.

## D1. RF → clases (solo responsabilidad significativa)

| RF | Clases | Nota |
|---|---|---|
| RF-01 | Usuario | Creación de cuentas |
| RF-02 | Usuario, Rol | Credenciales + rol de la sesión |
| RF-03, RF-04 | Usuario, Rol | Asignación y permisos |
| RF-05–RF-08 | Cliente | CRUD y desactivación |
| RF-09–RF-11 | Vehiculo, Cliente | Vehículo vinculado al cliente |
| RF-12 | Vehiculo, OrdenReparacion | Historial = órdenes del vehículo |
| RF-13 | OrdenReparacion, DetalleOrden | Orden + líneas de servicio |
| RF-14 | OrdenReparacion, Cliente, Vehiculo | Doble referencia + invariante R6 |
| RF-15 | OrdenReparacion | problemaReportado |
| RF-16 | OrdenReparacion, Tarea | diagnostico + tareas |
| RF-17 | OrdenReparacion | estado (transiciones pendientes) |
| RF-18 | OrdenReparacion | Consulta |
| RF-19 | Producto | Catálogo + mínimo |
| RF-20, RF-21 | MovimientoInventario, Producto | Entrada/salida |
| RF-22 | Producto, MovimientoInventario | Regla: el movimiento actualiza el stock |
| RF-23 | Producto, MovimientoInventario | Regla: aviso si stock ≤ mínimo |
| RF-24, RF-25 | Servicio | Catálogo + precio |
| RF-26–RF-28 | Cita, Cliente, Vehiculo, Servicio | Reserva (servicio opcional) |
| RF-29 | Pago, OrdenReparacion | Cobro aplicado a la orden |
| RF-30 | Pago, OrdenReparacion | Derivado: total − suma(pagos) |
| RF-31 | Ingreso | — |
| RF-32 | Gasto | — |
| RF-33 | FacturaInterna, Pago, OrdenReparacion | Factura tras el cobro |
| RF-34 | OrdenReparacion, Tarea, DetalleOrden | Insumos del reporte |
| RF-35 | Producto, MovimientoInventario | Insumos del reporte |
| RF-36 | Pago, Ingreso, Gasto, OrdenReparacion | Insumos del reporte |
| RF-37, RF-38 | (lectura de OrdenReparacion, Cita, Producto, Pago, Ingreso, Gasto) | Vista derivada, sin clase propia |

Conteo: **RF con clase 38/38** (RF-37/38 solo lectura, ver nota).

## D2. RNF → clases/componentes

RNF-05 → Usuario, Rol (+ vistas Sección 8.4). RNF-06 → Usuario. RNF-10 → Cliente, Vehiculo, OrdenReparacion, Producto y asociados. RNF-01–RNF-04, RNF-07–RNF-09, RNF-11 → transversales (vistas/formularios), sin clase directa única. RNF-12 → implementación, sin clase de dominio. Explicación: los RNF de calidad/compatibilidad no se trazan a una clase porque describen comportamiento global, no responsabilidad de una entidad.

## E. RF → vistas (ver Sección 8.3/Sección 8.6)

| RF | Vistas | Nota |
|---|---|---|
| RF-01, RF-03, RF-04 | V-03 | Lista + formulario + rol |
| RF-02 | V-01 | Login |
| RF-05–RF-08 | V-04 | Lista, formulario, detalle |
| RF-09–RF-12 | V-05 | Formulario + detalle/historial |
| RF-13–RF-15 | V-08 (V-08b) | Crear; precarga desde V-05c/V-07a |
| RF-16, RF-17 | V-08c | Detalle: diagnóstico/tareas/estados |
| RF-18 | V-08a, V-08c | Lista + detalle |
| RF-19 | V-09 (V-09a/b) | Lista + formulario |
| RF-20, RF-21 | V-09c | Formulario de movimiento |
| RF-22 | V-09c (regla de fondo), V-09a | La vista registra; el sistema calcula |
| RF-23 | V-09d, V-02 | Aviso derivado + indicador |
| RF-24, RF-25 | V-06 | Catálogo + formulario |
| RF-26–RF-28 | V-07 | Agenda + formulario |
| RF-29, RF-30 | V-10a (desde V-08c) | Cobro con saldo; cálculo de fondo |
| RF-31, RF-32 | V-10b | Registro + consulta |
| RF-33 | V-10c (desde V-10a) | Generar/ver; exige cobro |
| RF-34–RF-36 | V-11 | Selector + resultado |
| RF-37, RF-38 | V-02 | Indicadores + drill-down |

Conteo: **RF con vista 38/38**; RF-22/RF-23/RF-30 son reglas de fondo que la vista muestra, no formularios propios (ver nota).

## F. Resumen extremo a extremo (por grupo de capacidad)

| Grupo | RF | Usuarios | Esc | CU | Clases | Vistas | Estado |
|---|---|---|---|---|---|---|---|
| Acceso y roles | 01–04 | Admin + todos (login) | — | 01, 02 | Rol, Usuario | V-01, V-03 | Parcial (sin escenario dedicado) |
| Clientes | 05–08 | Recep (+Admin) | Esc-1 (RF-05) | 03 | Cliente | V-04 | Parcial |
| Vehículos | 09–12 | Recep (+Admin; Tec lee vía orden) | Esc-2 (RF-09) | 04 | Vehiculo, Cliente, Orden | V-05 | Parcial |
| Órdenes | 13–18 | Recep crea; Tec actualiza; resto consulta | Esc-3, Esc-4 | 07, 08 | Orden, Detalle, Tarea, Cliente, Vehiculo, Servicio | V-08 | Trazado |
| Inventario | 19–23 | Inventario (+Admin lee) | Esc-5 (salida) | 09, 10 | Producto, Movimiento | V-09, V-02 | Parcial |
| Servicios/Citas | 24–28 | Admin (catálogo); Recep (citas) | — | 05, 06 | Servicio, Cita | V-06, V-07 | Parcial |
| Finanzas | 29–33 | Administrativo (+Admin lee) | Esc-6 (cobro) | 11, 12, 13 | Pago, Ingreso, Gasto, Factura, Orden | V-10 | Parcial |
| Reportes/Dashboard | 34–38 | Admin + Admvo (reportes); Admin (panel) | Esc-7 (panel) | 14, 15 | Insumos Sección D1; sin clase propia | V-11, V-02 | Parcial |

## G. Huecos y trazabilidad débil (reportados, no ocultos)

1. Sin escenario dedicado (24 RF): RF-01–04, 06–08, 10–12, 19, 20, 23–28, 31–36. Todos tienen CU + clase + vista; el hueco es solo de escenificación.
2. Reglas de fondo sin vista propia: RF-22 (cálculo), RF-23 (aviso derivado V-09d), RF-30 (saldo derivado). Trazadas a la vista que las muestra.
3. Lectura sin gestión: RF-12 para el Técnico (vía CU-08), RF-18/RF-23/V-09M/V-10* para roles secundarios (Sección B1). Marcadas ◐, no ●.
4. RNF sin clase directa (Sección D2): calidad/compatibilidad transversales; RNF-07 sin métrica.
5. Sin requisitos huérfanos: **0 RF sin CU, 0 RF sin clase, 0 RF sin vista**. Sin clases sin RF (todas en Sección 7.3). Sin vistas sin CU/RF (Sección 8.6).

## H. Decisiones pendientes que afectan la trazabilidad (Sección 6.5/7.8/8.7 vigentes)

P-02 (gestión de V-06 por Recepcionista) afecta a RF-24/25 ◐; P-01 (punto de partida) afecta a V-02 para no administradores; P-03 (edición de V-08D por Admin) afecta a RF-16/17 ◐; cardinalidad de factura (0..1 propuesta), fórmula del total y sobrepago afectan a RF-30/33; transiciones de estado afectan a RF-17; traslapes y estados de cita afectan a RF-26–28; unicidades y permisos finos afectan a RF-04 y validaciones. Nada se resolvió aquí: las celdas P permanecen pendientes.
