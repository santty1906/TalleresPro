# Arquitectura de información — TalleresPro Fase 2 (Deliverable 1)

> Fuente de verdad: `Fase 1/README_Fase_1.md` (§§1–8), `Fase 1/matriz_trazabilidad.md`,
> `Fase 1/diagrama_navegacion.puml`. Este documento propone organización,
> etiquetas y reglas de acceso. **No crea requisitos nuevos.** Todo lo que sea
> propuesta o esté pendiente se marca explícitamente como tal.

## 1. Propósito y alcance

Transformar los RF-01 a RF-38, RNF-01 a RNF-12, CU-01 a CU-15, Esc-1 a Esc-7,
V-01 a V-11 y las 15 clases de Fase 1 en una propuesta concreta de cómo se
organiza la información, cómo se nombra y cómo se accede a ella.

No es un diseño visual (eso es Fase 2 Deliverables 5–6) ni implementación.
Define: dominios, jerarquías, etiquetas, mecanismos de acceso, relaciones,
visibilidad por rol, elementos globales y estados del sistema.

Convención de este documento:

- **Confirmado:** existe un RF / CU / Esc / RNF que lo respalda (se cita).
- **[Propuesta]:** decisión de diseño razonable, necesita aprobación del equipo.
- **[Pendiente]:** ambigüedad heredada de Fase 1 (§§6.5/7.8/8.7, matriz §H).
  No se resolvió en silencio.

## 2. Dominios de información y tipos de contenido

Se conservan los 8 grupos de capacidad de la matriz Fase 1 §F (nada se
renombra sin motivo; los nombres coinciden con el sitemap y el prototipo):

| Dominio | Contenido principal | Clases (Fase 1 §7) | RF / CU base |
|---|---|---|---|
| Acceso y administración | Cuentas, roles, sesiones | Usuario, Rol | RF-01–RF-04 / CU-01, CU-02 |
| Clientes | Fichas de cliente (persona/empresa), estado activo/inactivo | Cliente | RF-05–RF-08 / CU-03 / Esc-1 |
| Vehículos | Ficha de vehículo + historial de reparaciones | Vehiculo, OrdenReparacion (lectura) | RF-09–RF-12 / CU-04 / Esc-2 |
| Taller — servicios | Catálogo de servicios con precio | Servicio | RF-24–RF-25 / CU-05 |
| Taller — citas | Reservas con fecha/hora, cliente, vehículo, servicio opcional | Cita (+Cliente, Vehiculo, Servicio) | RF-26–RF-28 / CU-06 |
| Taller — órdenes | Orden de trabajo: problema, diagnóstico, tareas, estado, total derivado | OrdenReparacion, DetalleOrden, Tarea | RF-13–RF-18 / CU-07, CU-08 / Esc-3, Esc-4 |
| Inventario | Productos + movimientos (entradas/salidas) + aviso de stock bajo | Producto, MovimientoInventario | RF-19–RF-23 / CU-09, CU-10 / Esc-5 |
| Finanzas | Cobros de órdenes, saldo derivado, otros ingresos/gastos, factura interna | Pago, Ingreso, Gasto, FacturaInterna | RF-29–RF-33 / CU-11, CU-12, CU-13 / Esc-6 |
| Seguimiento gerencial | Reportes por tipo + dashboard de indicadores (vistas derivadas, sin clase propia — Fase 1 §7.7) | Lectura de órdenes, citas, inventario, finanzas | RF-34–RF-38 / CU-14, CU-15 / Esc-7 |

Tipos de contenido (patrones que se repiten en todos los dominios):

- **Lista:** tabla buscable con filtros (ej. V-04a, V-08a, V-09a).
- **Detalle:** ficha de un registro + sus relacionados (ej. V-04c, V-05c, V-08c).
- **Formulario:** creación/edición con validación (ej. V-04b, V-08b, V-09c).
- **Derivada:** valor calculado o aviso del sistema, no formulario
  (ej. V-09d aviso de stock bajo, saldos RF-30, totales RF-38).
- **Selector + resultado:** elige tipo/filtros y luego muestra (V-11a → V-11b).
- **Confirmación / mensaje:** diálogos y avisos (desactivar, cancelar cita,
  pago registrado, errores de validación — RNF-02).

## 3. Agrupaciones y categorías (navegación primaria)

La navegación primaria conserva los 11 módulos V-01–V-11 de Fase 1 §8.3
(no se renombra ningún módulo; ver matriz de coherencia). Agrupación
propuesta para el menú, solo visual — **[Propuesta]** el agrupamiento en
secciones plegables; los módulos y sus RF no cambian:

- **Principal:** Dashboard (V-02), Órdenes (V-08), Citas (V-07).
- **Registros:** Clientes (V-04), Vehículos (V-05), Servicios (V-06).
- **Recursos:** Inventario (V-09), Finanzas (V-10).
- **Gestión:** Reportes (V-11), Usuarios (V-03).

Justificación: los tres grupos reflejan los pilares del objetivo (§1.4):
seguimiento de reparaciones, control de inventario, administración
financiera; más la base transversal (acceso, reportes, dashboard).
Ningún RF cambia de módulo.

## 4. Jerarquía módulo → sección → lista → detalle → formulario

Regla general (confirmada por Fase 1 §8.3): cada módulo sigue el patrón
**Lista → (Detalle) → Formulario**, salvo donde Fase 1 documenta otra cosa:

- V-01 Login: sin subvistas (página única).
- V-02 Dashboard: sin formulario; sus indicadores enlazan (drill-down) a los
  módulos de detalle — CU-15 A1 (confirmado).
- V-03 Usuarios: V-03a Lista → V-03b Formulario (crear/editar + rol).
- V-04 Clientes: V-04a Lista/buscar → V-04c Detalle → V-04b Formulario.
  Acción Desactivar (RF-08) vive en lista y detalle, con confirmación.
- V-05 Vehículos: V-05a Lista → V-05c Detalle+historial → V-05b Formulario.
- V-06 Servicios: V-06a Catálogo → V-06b Formulario.
- V-07 Citas: V-07a Agenda → V-07b Formulario (agendar/editar/cancelar).
- V-08 Órdenes: V-08a Lista → V-08b Crear → V-08c Detalle
  (diagnóstico/tareas/estados). El detalle concentra las acciones:
  cambiar estado, agregar tareas, cobrar (→ V-10a), facturar (→ V-10c),
  salida asociada (→ V-09c). Confirmado en §8.3.
- V-09 Inventario: V-09a Lista → V-09b Formulario producto → V-09c Movimiento
  (entrada/salida) → V-09d Aviso (derivada, no formulario).
- V-10 Finanzas: V-10a Cobrar (se alcanza desde V-08c) → V-10c Factura;
  V-10b Ingresos/gastos (lista + registro). Confirmado en §8.3.
- V-11 Reportes: V-11a Selector → V-11b Resultado.

**[Propuesta]:** el formulario siempre ofrece Guardar / Cancelar / Volver;
el detalle ofrece Editar / Volver; la lista ofrece Nuevo / Ver / Buscar.
No se crea ninguna subvista fuera de las listadas en Fase 1 §8.3.

## 5. Etiquetas y terminología

Se conserva literalmente el vocabulario de Fase 1 para no confundir al
usuario ni al evaluador (RNF-01, RNF-03 — consistencia):

- "Registrar cliente", "Agregar vehículo", "Crear orden", "Agendar cita",
  "Registrar entrada/salida", "Registrar cobro", "Generar factura interna",
  "Generar reporte", "Dashboard".
- Estados de orden: "Recibido, En reparación, Listo, etc." — tal cual RF-17.
  **[Pendiente P-estados]:** el catálogo cerrado y las transiciones válidas
  no existen en Fase 1 (§6.5 n.º 4, §7.8 n.º 6). En wireframes y prototipo se
  muestran esos tres valores de ejemplo y se marca que falta definir el resto.
- "Saldo pendiente", "Total", "Stock mínimo", "Aviso de stock bajo",
  "Consecutivo" — tal cual RF-30, RF-23, CU-13.
- Roles con sus nombres exactos (§2): Administrador, Recepcionista, Técnico,
  Encargado de inventario, Encargado administrativo. No se abrevian en la UI
  salvo falta de espacio (entonces con título completo en `title`).

**[Propuesta]:** mensajes de validación en lenguaje del usuario, no técnico
(RNF-02): ej. "La placa ya está registrada" en vez de "violación UQ".
Los textos exactos de error para unicidades están **[Pendientes]**
(ver §9 de este documento y matriz §H).

## 6. Mecanismos de acceso (búsqueda, filtros, atajos)

Solo se documenta lo que Fase 1 respalda. Nada de lo siguiente inventa un RF:

| Mecanismo | Dónde | Respaldo | Estado |
|---|---|---|---|
| Buscar clientes / vehículos / productos / usuarios / órdenes | V-04a, V-05a, V-09a, V-03a, V-08a | RF-06, RF-10, CU-09, CU-02, CU-08 paso 1 | Confirmado |
| Filtrar agenda por día / estado | V-07a | RF-28 / CU-06 paso 6 | Confirmado |
| Filtrar reportes por tipo + rango de fechas | V-11a | CU-14 pasos 2–3 | Confirmado |
| Buscar orden a cobrar / a asociar salida | V-08a (uso secundario) | CU-11 pasos 1–2, CU-10 A1 | Confirmado (lectura ◐) |
| Drill-down Dashboard → módulo | V-02 → V-08a / V-07a / V-09a / V-10b | CU-15 A1 | Confirmado |
| Crear orden desde detalle de vehículo | V-05c → V-08b (precarga cliente+vehículo) | CU-07 / §8.5 F2 | Confirmado |
| Crear orden desde cita | V-07a → V-08b (precarga cliente+vehículo+servicio) | CU-07 A1 | Confirmado |
| Agregar vehículo desde detalle de cliente | V-04c → V-05b | CU-04 / §8.5 F2 | Confirmado |
| Filtros avanzados combinados, guardados o búsqueda global | — | Sin RF | **No propuesto.** No existe en Fase 1; no se incluye |
| Exportar reportes (PDF/CSV) | V-11b | Sin RF | **[Pendiente]** (Fase 1 §6.5 n.º 10). Se muestra solo "Generar/ver"; la exportación se marca pendiente, no se promete |
| Notificaciones push / campana global | — | Sin RF (RF-23 es aviso contextual, no bandeja) | **[Pendiente]** (Fase 1 §8.7 n.º 4). Se propone insignia contextual, no bandeja global |

## 7. Relaciones entre registros (navegación cruzada)

Derivan de las relaciones del modelo de clases (§7.5) y los flujos §8.5.
Todas confirmadas:

- Cliente 1—* Vehículo: el detalle del cliente lista sus vehículos y permite
  agregar uno (V-04c → V-05b). RF-09/CU-04.
- Cliente + Vehículo → Orden: crear orden exige ambos preexistentes y el
  sistema debe validar la coherencia (invariante R6: el vehículo debe
  pertenecer al cliente). **[Pendiente R6]:** la invariante está propuesta
  pero no confirmada (§7.8 n.º 8). En el diseño se valida y se informa,
  pero se marca pendiente.
- Vehículo → Historial: el detalle del vehículo muestra sus órdenes
  (RF-12). Solo lectura del historial; no edita órdenes desde ahí.
- Orden → DetalleOrden (servicios) + Tarea: el detalle de la orden muestra
  líneas de servicio (con precio del momento — foto, **[Pendiente]** §7.8
  n.º 4) y tareas del técnico. RF-13/CU-07, RF-16/CU-08.
- Orden → Movimiento (salida asociada, Esc-5/CU-10 A1) y Orden → Pago →
  Factura (CU-11 → CU-13 extend). La factura exige cobro previo (CU-13 E1).
  Cardinalidad de factura 1—0..1 **[Pendiente]** (§7.8 n.º 1).
- Cita → Orden: la cita precarga la orden pero no la crea automáticamente
  (CU-07 A1). La cita y la orden son registros distintos.
- Producto → Movimientos: el producto muestra su historial de movimientos;
  el stock solo cambia vía movimiento (R1, RF-22). Prohibido editar stock
  directo.

**[Propuesta]:** cada detalle muestra una sección "Relacionados" con enlaces
a los registros vinculados (ej. orden → cliente, vehículo, pagos, factura,
salidas asociadas). Es solo navegación, no duplica datos.

## 8. Visibilidad y acceso por rol (estricto Fase 1)

Base: §2 (roles), §8.4 (matriz rol–vista), matriz B1. Símbolos: ● gestiona,
◐ solo consulta/uso parcial, — sin acceso, P pendiente. No se otorga ningún
permiso que Fase 1 no documente.

| Vista | Admin | Recep. | Técnico | Inventario | Admvo. |
|---|---|---|---|---|---|
| V-01 Login | ● | ● | ● | ● | ● |
| V-02 Dashboard | ● | — (P-01) | — (P-01) | — (P-01) | — (P-01) |
| V-03 Usuarios | ● | — | — | — | — |
| V-04 Clientes | ● sec (◐) | ● | — | — | — |
| V-05 Vehículos+historial | ● sec (◐) | ● | — (solo vía orden) | — | — |
| V-06 Servicios | ● | ◐ (P-02: usa; gestión pendiente) | — | — | — |
| V-07 Citas | ● | ● | — | — | — |
| V-08 Lista/crear (CU-07) | ● | ● | ◐ (sus asignadas) | ◐ (asociar salida) | ◐ (buscar a cobrar) |
| V-08 Detalle edición (CU-08) | ◐ (P-03: ¿edita o solo lee?) | ◐ (solo lee) | ● | — | ◐ (solo lee) |
| V-09 Productos (CU-09) | ● sec | — | — | ● | — |
| V-09 Movimientos+alerta (CU-10) | ◐ (lee) | — | — | ● | — |
| V-10 Cobros (CU-11) | ◐ (lee) | — | — | — | ● |
| V-10 Ingresos/gastos (CU-12) | ◐ (lee) | — | — | — | ● |
| V-10 Facturas (CU-13) | ◐ (lee) | — | — | — | ● |
| V-11 Reportes (CU-14) | ● | — | — | — | ● |

Reglas que el diseño respeta:

1. Menú filtrado por rol: cada rol solo ve los módulos donde tiene ● o ◐.
   **[Propuesta]:** el ítem oculto no es navegable por URL directa:
   el sistema muestra 403 "Sin permiso" (RNF-05, RF-04).
2. ◐ nunca muestra botones de edición/guardado; muestra "Solo lectura"
   donde aplique (ej. técnico no registra salidas; administrativo no edita
   órdenes). Confirmado por CU-08 E3, CU-10 (actor inventario).
3. **[Pendiente P-01]:** punto de partida no-administrador. Fase 1 §8.7 n.º 1
   no lo define. Propuesta provisional (no definitiva): cada rol aterriza en
   su módulo principal (Recepcionista → Clientes/Órdenes, Técnico → Órdenes,
   Inventario → Inventario, Admvo → Finanzas) con retorno al Dashboard solo
   si tiene permiso. Se marca P-01 en sitemap, navegación y prototipo.
4. **[Pendiente P-02]:** Recepcionista en V-06. Solo usa el catálogo en
   citas/órdenes; la gestión (crear/editar/precio) es solo Admin hasta
   confirmación.
5. **[Pendiente P-03]:** Admin en V-08D. Solo lectura hasta confirmación;
   la edición es del Técnico (CU-08).

Nota sobre V-07 y V-08L: Fase 1 §8.4 asigna al Administrador ● (sin
calificador "sec") en Citas y en Lista/crear órdenes, igual que a la
Recepcionista. Esto refleja el acceso general del Administrador a todo el
sistema (Fase 1 §2). No se añade ninguna restricción: el rol primario
operativo diario es la Recepcionista (CU-06/CU-07), mientras que el
Administrador conserva su acceso general. Donde otro CU asigna un primario
distinto para la edición (V-08D → Técnico, CU-08), el Administrador figura
como ◐ (P-03) hasta confirmación del equipo.

## 9. Elementos globales de la interfaz

**[Propuesta]** (patrón consistente exigido por RNF-01/RNF-03; los elementos
existen en wireframes y prototipo, no son RF nuevos):

- **Encabezado:** nombre "TalleresPro", rol y usuario actual (ficticio en
  prototipo), botón Salir (cierra sesión → V-01). En prototipo el usuario es
  seleccionable para demostrar el filtrado por rol.
- **Navegación primaria:** barra lateral (desktop) / menú plegable (móvil)
  con los módulos permitidos al rol. El módulo activo se resalta.
- **Migas (breadcrumbs):** ej. Órdenes › Lista › ORD-001 › Detalle.
  Ayudan a volver (RNF-03). En formularios: Módulo › Lista › Nuevo/Editar.
- **Acciones contextuales:** en lista (Nuevo, Buscar), en detalle (Editar,
  Cobrar, Facturar, Registrar salida), en formulario (Guardar, Cancelar).
  Los botones fuera de permiso no se muestran (no solo deshabilitados).
- **Región de avisos:** mensajes de éxito ("Cliente guardado"), validación
  (RNF-02, RNF-11), aviso de stock bajo (RF-23) y saldo (RF-30). Cada mensaje
  indica qué corregir y dónde volver.
- **Sin campana global ni buscador global:** no tienen RF; no se incluyen
  (ver §6). El aviso de stock aparece donde Fase 1 lo exige: tras el
  movimiento (V-09c → V-09d) y como indicador del Dashboard (V-02).

## 10. Estados: vacío, carga, error, confirmación, sin permiso

Exigidos por RNF-02/RNF-11 y los flujos alternos/excepciones de los CU.
Todos los listados tienen respaldo; los textos son **[Propuesta]** de
redacción, no requisitos:

| Estado | Dónde | Respaldo | Texto propuesto |
|---|---|---|---|
| Lista vacía | V-04a, V-05a, V-08a, V-09a, V-07a, V-11b | CU-03 A2, CU-04 A2, CU-09 A1, CU-14 E2 | "Sin registros. [Registrar …] o [Limpiar filtros]." |
| Historial vacío | V-05c | CU-04 A2 | "Este vehículo aún no tiene reparaciones." |
| Sin resultados de búsqueda | Listas con buscar | CU-02 A2, CU-03 A2 | "Sin coincidencias para '…'. [Limpiar búsqueda]." |
| Carga | Todas las listas/detalles | RNF-07 (razonable) | Esqueleto o "Cargando…" manteniendo el layout (no pantalla en blanco) |
| Error de carga de indicador | V-02 | CU-15 E2 | "No se pudo cargar este indicador. Los demás siguen disponibles. [Reintentar]." |
| Validación de formulario | Todos los formularios | RNF-02, RNF-11, CU-02–CU-13 E1 | Mensaje junto al campo + resumen arriba; el foco va al primer error |
| Confirmación destructiva | Desactivar cliente (RF-08), cancelar cita (RF-27) | CU-03 A1, CU-06 | Diálogo "¿Confirmar? Esta acción … [Confirmar / Cancelar]". Desactivar no borra |
| Sin permiso (403) | URL directa sin rol | RF-04, RNF-05, CU-02 E3 | "Sin permiso para ver esta sección. [Volver a mi inicio]." |
| Sesión requerida | Vistas sensibles sin login | RNF-04 | Redirige a V-01 con "Inicia sesión para continuar." |
| Credenciales inválidas / cuenta desactivada | V-01 | CU-01 E1–E2 | "Correo o contraseña incorrectos." / "Cuenta desactivada. Contacta al administrador." (no se revela cuál campo falló) |
| Stock insuficiente | V-09c salida | CU-10 E2 | "Stock disponible: N. Reduce la cantidad." (no descuenta) |
| Sobrepago | V-10a | CU-11 E1 **[Pendiente]** | Validación propuesta: "El monto supera el saldo (S/ …). Ajusta el monto." Regla definitiva pendiente (§7.8 n.º 3) |
| Factura sin cobro | V-10c | CU-13 E1 | "Registra un cobro antes de generar la factura. [Ir a cobros]." |
| Reporte sin datos | V-11b | CU-14 E2 | "Sin datos para estos filtros. [Ajustar filtros]." (no tabla vacía sin explicación) |

## 11. Trazabilidad IA → Fase 1 (resumen; detalle en matriz de coherencia)

| Decisión de IA | Respaldo Fase 1 | Estado |
|---|---|---|
| 11 módulos V-01–V-11 + subvistas V-03a…V-11b | §8.3, §8.6, matriz §E | Confirmado |
| Patrones lista/detalle/formulario/derivada/selector | §8.3 (jerarquía por vista) | Confirmado |
| Drill-down Dashboard → módulos | CU-15 A1, §8.5 F7 | Confirmado |
| Cruzadas: cliente→vehículo, vehículo→orden, cita→orden, orden→cobro→factura, orden→salida | §8.5 F2–F5, CU-04/07/10/11/13 | Confirmado |
| Menú por rol (●/◐/—) + 403 + solo lectura | §2, §8.4, matriz B1, RF-04/RNF-05 | Confirmado |
| Búsqueda/filtros por módulo, agenda por día, reportes por tipo+fecha | RF-06/10/28, CU-06/14 | Confirmado |
| Aviso stock bajo tras movimiento + indicador Dashboard | RF-22/RF-23, CU-09/10, §8.3 V-09d | Confirmado (umbral = stock mínimo) |
| Saldo = total − suma(pagos); factura exige cobro | R4/R5 §7.6, CU-11/13 | Confirmado (fórmula del total y sobrepago pendientes) |
| Agrupación visual del menú en 4 secciones | — (solo presentación) | [Propuesta] |
| Encabezado, migas, región de avisos, botones Guardar/Cancelar/Volver | RNF-01/02/03 (exigen consistencia, no el widget exacto) | [Propuesta] |
| Punto de partida por rol no-admin | CU-01 "página inicial según rol" sin detallar (§8.7 P-01) | [Pendiente P-01] |
| Gestión de servicios por Recepcionista | §6.5 n.º 1 (P-02) | [Pendiente P-02] |
| Edición de orden por Admin | CU-08 vs §2 acceso general (P-03) | [Pendiente P-03] |
| Invariante cliente–vehículo–orden, foto de precio, cardinalidad factura, catálogo de estados, traslapes de cita, unicidades, moneda/impuestos, exportación reportes | §§6.5/7.8/8.7, matriz §H | [Pendientes] — ver matriz de coherencia |
| Buscador global, campana de notificaciones, filtros guardados, exportación prometida | Sin RF | No incluido (no inventar alcance) |

## 12. Lo que este documento no decide

1. Colores, tipografías ni estilos (eso es Deliverable 6, prototipo).
2. Campos exactos de cada formulario más allá de los atributos §7.4
   (los wireframes listan campos mínimos confirmados + pendientes).
3. Ninguna regla de negocio pendiente (§6.5/7.8/8.7): se heredan como
   pendientes y se señalan en cada artefacto donde aparecen.
4. Ningún archivo de Fase 1 fue modificado para este documento
   (ver README_Fase_2.md y matriz de coherencia).
