# Wireframes — TalleresPro Fase 2 (Deliverable 5)

> Baja fidelidad, sin estilos finales (eso es el prototipo). Cada wireframe
> tiene ID WF-xx, propósito, roles, RF/CU/Esc, layout ASCII, interacciones,
> destinos y estados. Etiquetas idénticas al sitemap y al prototipo
> (PT-xx ↔ WF-xx ↔ V-xx). Los datos son ficticios. Pendientes P-01/P-02/P-03
> y reglas §§6.5/7.8 se marcan donde aparecen. No se inventa ningún permiso.

## Convenciones

- `[...]` botón/acción · `(...)` campo · `#...#` región de avisos ·
  `>...` navegación · `(*) ` campo con error.
- Encabezado común: `TalleresPro | Usuario (rol) | [Salir]`.
- Navegación primaria: lista de módulos filtrada por rol; el activo `[x]`.
- Migas: `Módulo › Lista › Detalle`. Formularios: `[Guardar] [Cancelar]`.
- RNF-02/RNF-11: error junto al campo + resumen arriba; foco al primer error.
- RNF-03: mismo encabezado, menú y migas en todas las pantallas.
- RNF-09: lateral en desktop; menú plegable `[Menú]` en móvil (se indica).

---

## WF-01 — Login (V-01)

- **Propósito:** autenticarse (única puerta de entrada, RNF-04).
- **Roles:** todos. **Refs:** RF-02 / CU-01 / Esc-1,4,7 (pasos).
- **Layout:**
```
+--------------------------------------------------+
| TalleresPro (sin menú; no autenticado)            |
+--------------------------------------------------+
| INICIAR SESIÓN                                    |
|                                                   |
| #resumen-error (solo si E1/E2/E3)#                |
|                                                   |
| Correo:      (........................)           |
| Contraseña:  (........................) [ver]     |
|                                                   |
| [Ingresar]                                        |
|                                                   |
| Mensajes: "Correo o contraseña incorrectos."      |
| "Cuenta desactivada. Contacta al administrador."  |
| "Indica correo y contraseña."                     |
+--------------------------------------------------+
```
- **Interacciones:** [Ingresar] → valida → éxito: FL-01 (V-02 o inicio rol
  P-01); fallo: permanece en V-01 con mensaje (CU-01 E1–E3). Sin enlace de
  registro público (RF-01 es gestión del Admin en V-03, no autorregistro).
- **Destinos:** éxito → V-02 / inicio rol; fallo → V-01.
- **Estados:** error de credenciales, cuenta desactivada, campos vacíos.
  Sesión activa (A1) → no muestra login, redirige.
- **Prototipo:** PT-01.

## WF-02 — Dashboard (V-02)

- **Propósito:** resumen del taller (RF-37/38). **Roles:** Admin ● confirmado;
  resto — (P-01 pendiente). **Refs:** RF-37/38 / CU-15 / Esc-7.
- **Layout:**
```
| TalleresPro | Admin ficticio | [Salir] | [Menú-móvil]  |
| Nav: [x Dashboard] [Órdenes] [Citas] [Clientes]... |
| Dashboard › Resumen                                |
| +-------------+ +-------------+ +---------------+  |
| | Trabajos    | | Citas de hoy| | Poco stock    |  |
| | pendientes: | | N (> agenda)| | N (> invent.) |  |
| | N (> órdenes)| |             | |               |  |
| +-------------+ +-------------+ +---------------+  |
| | Totales: cobros S/.., ingresos.., gastos..      |  |
| +-----------------------------------------------+  |
| [P-01: otros roles ven aquí su módulo, no este   |  |
|  panel completo — pendiente de confirmación]     |  |
```
- **Interacciones:** clic en tarjeta → drill-down a V-08a/V-07a/V-09a/V-10b
  (CU-15 A1). Cada tarjeta muestra cero/"sin registros" si no hay datos (E1).
- **Estados:** vacío por indicador; error de un indicador (E2): lo señala y
  mantiene los demás + [Reintentar].
- **Prototipo:** PT-02.

## WF-03 — Lista genérica + búsqueda (patrón: V-04a, V-05a, V-08a, V-09a, V-03a, V-06a, V-07a)

- **Propósito:** ejemplo con Clientes (V-04a); el patrón se repite.
- **Roles (ejemplo):** Recep ●, Admin ◐. **Refs:** RF-06 / CU-03 / Esc-1 (pasos).
- **Layout:**
```
| Clientes › Lista                    [Registrar cliente] |
| Buscar: (........) [Buscar] [Limpiar]                    |
| #aviso: "Cliente guardado." / "Sin coincidencias..."#    |
| +----------------------------------------------------+  |
| | Nombre | Documento | Teléfono | Estado | [Ver]     |  |
| | ...    | ...       | ...      | Activo | [Ver]     |  |
| +----------------------------------------------------+  |
| Vacío: "Sin registros. [Registrar cliente]."             |
```
- **Interacciones:** [Buscar]/filtros → recarga lista; [Limpiar] → todos.
  [Ver] → V-04c; [Registrar cliente] → V-04b. Paginación simple si hay muchos
  (propuesta de presentación, no RF).
- **Estados:** vacío, sin coincidencias (ofrece registrar — CU-03 A2), carga
  ("Cargando…"), error de carga con [Reintentar].
- **Prototipo:** PT-03 (Clientes) y mismo patrón de lista en PT-04 (Vehículos), PT-05 (Órdenes), PT-07 (Inventario), PT-10 (Usuarios) y PT-12 (Servicios).

## WF-04 — Formulario genérico + validación (patrón: V-04b, V-05b, V-03b, V-06b, V-07b, V-09b)

- **Propósito:** ejemplo con Cliente (V-04b); mismo patrón en el resto.
- **Roles:** según módulo (aquí Recep ●). **Refs:** RF-05/07 / CU-03.
- **Layout:**
```
| Clientes › Nuevo (o Editar)                               |
| #resumen: "Revisa 2 campos: Documento, Correo."#          |
| Nombre (*):    (................) "Obligatorio."          |
| Documento:     (................)                         |
| Teléfono:      (................)                         |
| Correo:        (................) "Formato inválido."     |
| (*) Documento duplicado: "Ya existe (regla por confirmar)."|
| [Guardar] [Cancelar (→ lista/detalle sin guardar)]        |
```
- **Interacciones:** [Guardar] → valida (RNF-11) → éxito: aviso + V-04c/V-04a;
  fallo: permanece con errores y conserva lo válido. [Cancelar] → origen.
- **Campos mínimos confirmados (§7.4):** Cliente: nombre, documento, teléfono,
  correo, activo. Unicidad documento/correo **[Pendiente]** (§7.8 n.º 5).
- **Prototipo:** PT-03 (pestaña Nuevo/Editar simulada con validación demo).

## WF-05 — Detalle de cliente (V-04c)

- **Propósito:** ficha + vehículos + puerta a vehículo/orden.
- **Roles:** Recep ●, Admin ◐. **Refs:** RF-05–08 / CU-03 (+CU-04 para vehículos).
- **Layout:**
```
| Clientes › CLI-001 › Detalle                              |
| Datos: Nombre, Documento, Teléfono, Correo, Estado        |
| [Editar] [Desactivar (→ diálogo)]                         |
| Vehículos del cliente:                                    |
| | Placa | Marca/Modelo | [Ver] |                            |
| [Agregar vehículo (→ V-05b precargado)]                   |
| Diálogo Desactivar: "¿Desactivar? No se borra. [Confirmar/Cancelar]" |
| [P: con órdenes activas debe advertir — pendiente CU-03 E3]|
```
- **Destinos:** [Editar] → V-04b; [Agregar vehículo] → V-05b; [Ver] → V-05c.
- **Prototipo:** PT-03 (sección detalle simulada).

## WF-06 — Órdenes: lista y crear (V-08a, V-08b)

- **Propósito:** consultar órdenes (RF-18) y crear (RF-13–15).
- **Roles lista:** Recep ●, Admin ●, Tec ◐ (asignadas), Inventario ◐
  (asociar salida), Admvo ◐ (cobrar). **Crear:** Recep ● (primario CU-07). **Refs:** RF-13–RF-15, RF-18 (consulta en lista) / CU-07 / Esc-3. El detalle y la edición (diagnóstico, tareas, estados) corresponden a WF-07 / CU-08.
- **Layout lista (V-08a):**
```
| Órdenes › Lista     [Nueva orden]  Filtro: (estado) (texto) |
| | Nro | Cliente | Vehículo | Estado | Saldo | [Ver] |          |
```
- **Layout crear (V-08b):**
```
| Órdenes › Nueva                                           |
| Cliente: (buscar/seleccionar)  Vehículo: (del cliente)    |
| Problema informado (*): (texto amplio) "Obligatorio."     |
| Servicios: [x] Afinamiento  [ ] Frenos  (+ precio foto*)  |
| *precio copiado del catálogo; cambios no recalculan [P]   |
| [Guardar (→ Detalle en Recibido)] [Cancelar]              |
| Origen contextual: "Desde cita CIT-004 / vehículo ABC-123"|
```
- **Errores:** sin cliente/vehículo (E1), problema vacío (E2), coherencia
  cliente–vehículo R6 **[Pendiente]**.
- **Prototipo:** PT-05.

## WF-07 — Detalle de orden: diagnóstico, tareas, estados (V-08c)

- **Propósito:** corazón operativo del taller (pantalla del técnico).
- **Roles:** Tec ● edita; Recep/Admin/Admvo ◐ leen. **Refs:** RF-16–18 / CU-08 / Esc-4.
- **Layout:**
```
| Órdenes › ORD-001 › Detalle   Estado: [En reparación v]   |
| Resumen: Cliente, Vehículo, Problema, Servicios, Total, Saldo |
| Diagnóstico: (texto)  [Guardar diagnóstico]               |
| Tareas: [ ] Cambio aceite [x] Revisión frenos [+ Agregar] |
| Relacionados: [Cobrar → V-10a] [Facturar → V-10c]         |
|               [Registrar salida → V-09c asociada]         |
| Solo lectura (◐): sin [Guardar]/estado editable; aviso    |
| "Solo lectura según tu rol."                              |
| [P-03: Admin edita o solo lee — pendiente]                |
```
- **Interacciones:** técnico guarda incremental (A2); cambio de estado valida
  transición **[Pendiente]** (E2: inválida o cierre sin diagnóstico).
- **Estados:** orden inexistente (E1), transición inválida, guardado con aviso
  "Orden actualizada".
- **Prototipo:** PT-06.

## WF-08 — Inventario: lista, producto, movimiento, aviso (V-09a–d)

- **Propósito:** catálogo + entradas/salidas + stock automático + alerta.
- **Roles:** Inventario ●; Admin ◐ lee. **Refs:** RF-19–23 / CU-09, CU-10 / Esc-5.
- **Layout lista (V-09a):**
```
| Inventario › Productos   [Nuevo producto] [Registrar movimiento] |
| Buscar: (...)  Insignia: "! Bajo stock (N)" (→ filtrado)         |
| | Producto | Stock | Mínimo | Estado | [Ver] [Entrada/Salida] |  |
```
- **Movimiento (V-09c):**
```
| Inventario › Registrar salida (o entrada)                        |
| Producto: (...)  Cantidad: (N)  Orden asociada: (ORD-001 opcional)|
| Stock actual: N → quedará: N−cantidad                             |
| [Confirmar] [Cancelar]                                            |
| Errores: "Cantidad > 0." / "Stock disponible: N." (E1/E2)         |
```
- **Aviso (V-09d, derivada):** tras confirmar, si `stock ≤ mínimo`:
  "#Aviso: stock bajo en X (quedan N, mínimo M).#" + insignia en lista y
  Dashboard (RF-23). No es formulario.
- **Formulario producto (V-09b):** nombre, stock inicial, mínimo (≥ 0),
  activo. Stock solo vía movimientos (R1) — no editable directo.
- **Prototipo:** PT-07.

## WF-09 — Finanzas: cobro, ingresos/gastos, factura (V-10a–c)

- **Propósito:** cobros con saldo + movimientos generales + factura interna.
- **Roles:** Admvo ●; Admin ◐ lee. **Refs:** RF-29, RF-30, RF-31, RF-32, RF-33 / CU-11, CU-12, CU-13 / Esc-6.
- **Layout cobro (V-10a):**
```
| Finanzas › Cobrar ORD-001 (desde orden)                   |
| Total: S/ ...  Cobrado: ...  Saldo: ... (total−pagos)     |
| Monto recibido (*): (...)  Método: (Efectivo/Tarjeta/...) |
| [Confirmar pago] [Volver a orden]                         |
| E: "Monto > 0." / "Elige método." /                       |
|    "Supera el saldo (S/ ..). Ajusta. [P-sobrepago]"       |
| Éxito: "Pago registrado. Saldo: S/ ..."                   |
```
- **Ingresos/gastos (V-10b):** pestañas Ingresos | Gastos; lista + [Registrar]:
  concepto (*), monto (> 0), fecha. Sin vínculo a orden (confirma §7.8 n.º 12).
- **Factura (V-10c):** [Generar factura] solo si hay cobro (E1 si no);
  muestra consecutivo único + total coherente + [Reimprimir]. Interna simple,
  sin alcance gubernamental/bancario (§1.5). Cardinalidad 0..1 **[Pendiente]**,
  moneda/impuestos **[Pendiente]**.
- **Prototipo:** PT-08.

## WF-10 — Citas: agenda y formulario (V-07a–b)

- **Propósito:** agendar/editar/cancelar y ver agenda.
- **Roles:** Recep ●, Admin sec. **Refs:** RF-26–28 / CU-06 (sin escenario).
- **Layout agenda (V-07a):**
```
| Citas › Agenda (2026-10-15) [Agendar cita]                |
| Filtros: fecha (....-..-..) estado (todas/...)            |
| | Hora | Cliente | Vehículo | Servicio | Estado | [Ver/Cancelar] ||
```
- **Formulario (V-07b):** cliente + vehículo + servicio (opcional **[P]**) +
  fecha/hora + [Guardar]/[Cancelar]; cancelar cita pide confirmación; cita
  atendida/cancelada no se duplica (E3). Traslape/duración **[Pendiente]**.
  [Crear orden desde cita] → V-08b precargada (CU-07 A1).
- **Prototipo:** PT-11 (Citas, vista propia).

## WF-11 — Reportes: selector y resultado (V-11a–b)

- **Propósito:** reportes de reparaciones/inventario/financiero.
- **Roles:** Admin ●, Admvo ●. **Refs:** RF-34–36 / CU-14 (sin escenario).
- **Layout:**
```
| Reportes › Selector                                       |
| Tipo: (Reparaciones/Inventario/Financiero)                |
| Desde (....) Hasta (....)  Filtros (...)  [Generar]       |
| --- Resultado (V-11b) ---                                 |
| Criterios aplicados + tabla + [Ajustar filtros]           |
| Sin datos: "Sin datos para estos filtros. [Ajustar]."     |
| [Exportar PDF/CSV — PENDIENTE, no prometido §6.5 n.º 10]  |
```
- **Prototipo:** PT-09.

## WF-12 — Usuarios y servicios (V-03a–b, V-06a–b)

- **Propósito:** admin: cuentas/roles y catálogo con precios.
- **Roles:** Admin ●; Recep ◐ en servicios **[P-02]**. **Refs:**
  RF-01/03/04 (CU-02), RF-24/25 (CU-05). Sin escenario.
- **Layout usuarios:** lista (nombre, correo, rol, activo) + formulario
  (datos + rol + [Guardar]); errores: correo duplicado, rol inválido (E1/E2);
  bloquear aplica al siguiente ingreso (A1).
- **Layout servicios:** catálogo (nombre, descripción, precio) + formulario
  (nombre único propuesto, descripción opcional, precio > 0). Moneda/impuestos **[Pendiente]**.
  Recepcionista: **[P-02]** solo usa en citas/órdenes hasta confirmación.
- **Prototipo:** PT-10 (Usuarios, vista propia) y PT-12 (Servicios, vista propia con Descripción).

## WF-13 — Estados transversales (vacío / error / 403 / confirmación)

- **Propósito:** patrón único para no repetir en cada WF (RNF-02).
- **Refs:** RNF-02, RNF-04, RNF-05, RNF-07, RNF-11 + excepciones CU-01 a CU-15.
- **Incluye:** lista vacía, sin coincidencias, historial vacío, carga
  ("Cargando…"), error con [Reintentar], 403 "Sin permiso.
  [Volver a mi inicio]", sesión requerida (→ V-01), confirmaciones
  (desactivar, cancelar cita, confirmar pago/movimiento). Ver tabla en
  arquitectura_informacion.md §10. Cada WF indica cuáles aplica.
- **Prototipo:** barra de demostración "Estados" en cada pantalla
  (botones: Simular vacío / error / 403 / confirmación) — claramente
  etiquetados como demo, no datos reales.

## Cobertura WF → V → RF/CU/Esc

| WF | V-xx | RF | CU / Esc |
|---|---|---|---|
| WF-01 | V-01 | RF-02 | CU-01 / Esc-1,4,7 |
| WF-02 | V-02 | RF-37,38 | CU-15 / Esc-7 |
| WF-03 | V-04a (patrón listas) | RF-06 (análogos) | CU-03 / Esc-1 |
| WF-04 | V-04b (patrón formularios) | RF-05,07 | CU-03 |
| WF-05 | V-04c | RF-05–08 | CU-03 |
| WF-06 | V-08a, V-08b (+V-05c/V-07a orígenes) | RF-13–15,18 | CU-07 / Esc-3 |
| WF-07 | V-08c | RF-16–18 | CU-08 / Esc-4 |
| WF-08 | V-09a–d | RF-19–23 | CU-09,10 / Esc-5 |
| WF-09 | V-10a–c | RF-29–33 | CU-11,12,13 / Esc-6 |
| WF-10 | V-07a–b | RF-26–28 | CU-06 / — |
| WF-11 | V-11a–b | RF-34–36 | CU-14 / — |
| WF-12 | V-03a–b, V-06a–b | RF-01,03,04,24,25 | CU-02,05 / — |
| WF-13 | Transversal | RNF-02/04/05/07/11 | Todos (excepciones) |

Vehículos (V-05a–c: RF-09–12 / CU-04 / Esc-2) se cubren con el patrón
WF-03+WF-04 más WF-05 (detalle+historial) y el origen en WF-06; no se crea un
WF separado para no duplicar el patrón. Citas sin escenario e ingresos/gastos
sin escenario se cubren igual (matriz §C: tienen CU+vista, solo falta escenario).
