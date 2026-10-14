# Flujos principales de navegación — TalleresPro Fase 2 (Deliverable 4)

> Diagramas fuente: `Fase 2/flujos_navegacion.puml` (FL-01 + índice),
> `Fase 2/flujos_atencion.puml` (FL-02–04), `Fase 2/flujos_operacion.puml`
> (FL-05–07) y `Fase 2/flujos_gestion.puml` (FL-08, FL-09 + secundarios);
> este documento detalla el paso a paso. Cada flujo usa solo páginas V-xx
> del sitemap y roles de Fase 1 Sección 8.4. Ningún rol ejecuta una acción que su
> CU no le asigna. Pendientes P-01/P-02/P-03 y reglas Sección 6.5/7.8 se marcan
> donde aparecen.

## Cómo leer cada ficha

- **Actor primario** (ejecuta) + secundarios (solo consultan, ◐).
- **Inicio / precondiciones** (incluye CU-01 como precondición, no como include).
- Pasos numerados usuario → respuesta del sistema.
- **Decisiones / alternos (A)** y **errores (E)** con su CU de origen.
- **Fin exitoso** + RF/CU/Esc.

---

## FL-01 — Autenticación y punto de partida

- **Actores:** Todos (Admin, Recepcionista, Técnico, Inventario, Admvo).
- **Refs:** RF-02 / CU-01 / pasos de Esc-1, Esc-4, Esc-7.
- **Inicio:** `[*]` (no autenticado). **Precondición:** cuenta registrada y activa.
- **Pasos:**
  1. Usuario abre el sistema → V-01 Login (correo + contraseña + [Ingresar]).
  2. Ingresa credenciales → [Ingresar].
  3. Sistema valida formato, credenciales y estado (CU-01 paso 4).
  4. Sistema crea sesión con rol → punto de partida:
     - Admin → V-02 Dashboard (confirmado, CU-15).
     - Otros → su módulo principal **[Propuesta provisional P-01]**:
       Recepcionista → V-04a/V-08a, Técnico → V-08a, Inventario → V-09a,
       Admvo → V-10b. Marcado P-01 en sitemap y prototipo.
- **Alternos:** A1 sesión activa → redirige sin pedir credenciales.
  A2 abandona → permanece en V-01 sin sesión.
- **Errores:** E1 credenciales incorrectas → mensaje en V-01 (RNF-02), sin sesión.
  E2 cuenta desactivada/sin acceso → deniega e informa.
  E3 campos vacíos/inválidos → indica qué corregir (RNF-02/RNF-11).
- **Fin:** sesión activa; funciones sensibles protegidas (RNF-04/RNF-05).

## FL-02 — Registrar y gestionar un cliente

- **Primario:** Recepcionista. **Secundario:** Administrador (◐).
- **Refs:** RF-05–RF-08 / CU-03 / Esc-1.
- **Inicio:** V-04a Lista. **Precondición:** sesión con acceso a V-04.
- **Pasos:**
  1. Recepcionista → V-04a, busca (RF-06) o [Registrar cliente].
  2. → V-04b Formulario, ingresa datos → [Guardar].
  3. Sistema valida (obligatorios, formato — RNF-11) → confirma
     "Cliente guardado" → V-04c Detalle (o V-04a).
  4. Desde V-04c: [Editar] → V-04b; [Desactivar] → diálogo → marca inactivo;
     [Agregar vehículo] → V-05b (FL-03).
- **Alternos:** A1 Desactivar con confirmación (no borra).
  A2 búsqueda sin coincidencias → "Sin coincidencias. [Registrar cliente]".
- **Errores:** E1 faltantes/inválidos → indica campo. E2 duplicado
  (documento/correo, regla exacta **[Pendiente]**) → advierte, no duplica.
  E3 cliente con órdenes activas al desactivar → **[Pendiente]**,
  debe advertir antes de confirmar (CU-03 E3).
- **Fin:** cliente disponible para vincular vehículos (CU-04) y órdenes (CU-07).

## FL-03 — Registrar vehículo y consultar historial

- **Primario:** Recepcionista. **Secundarios:** Admin (◐); Técnico lee vía orden.
- **Refs:** RF-09–RF-12 / CU-04 / Esc-2.
- **Inicio:** V-04c (desde cliente) o V-05a. **Precondición:** cliente activo.
- **Pasos:**
  1. Busca y selecciona cliente → [Agregar vehículo] → V-05b.
  2. Ingresa marca, modelo, año, placa y demás → [Guardar].
  3. Sistema valida (placa única **[Propuesta/pendiente]** — Sección 7.8 n.º 5) →
     V-05c Detalle vinculado al cliente.
  4. En V-05c: pestaña Historial lista sus órdenes (RF-12); [Crear orden] → FL-04.
- **Alternos:** A1 consulta directa V-05a sin registrar. A2 historial vacío →
  "Este vehículo aún no tiene reparaciones" (CU-04 A2).
- **Errores:** E1 placa duplicada/inválidos → rechaza e indica.
  E2 cliente inexistente/desactivado → no permite vincular.
- **Fin:** vehículo vinculado y consultable para citas y órdenes.

## FL-04 — Crear orden de reparación

- **Primario:** Recepcionista. **Secundario:** Admin (◐).
- **Refs:** RF-13–RF-15 / CU-07 / Esc-3.
- **Inicio:** V-05c, V-07a (desde cita) o V-08a. **Precondición:** cliente y
  vehículo registrados; catálogo disponible si se eligen servicios.
- **Pasos:**
  1. Selecciona cliente + vehículo (o viene precargado desde cita — CU-07 A1).
  2. → V-08b Crear orden: registra problema informado (RF-15, obligatorio),
     selecciona servicios (cuando apliquen) → [Guardar].
  3. Sistema valida coherencia cliente–vehículo (R6 **[Pendiente]**) y
     obligatorios → crea orden en "Recibido" → V-08c Detalle.
- **Alternos:** A1 desde cita: precarga cliente/vehículo/servicio.
  A2 sin servicios todavía: permitido, quedan para diagnóstico (FL-05).
- **Errores:** E1 cliente/vehículo no registrado → no crea.
  E2 problema vacío u obligatorio faltante → indica qué completar.
- **Fin:** ORD-xxx en "Recibido", vinculada a cliente+vehículo.

## FL-05 — Actualizar reparación (diagnóstico, tareas, estados)

- **Primario:** Técnico. **Secundarios (◐ solo lectura):** Recepcionista, Admin.
- **Refs:** RF-16–RF-18 / CU-08 / Esc-4.
- **Inicio:** V-08a. **Precondición:** orden existe (normalmente Recibido/En reparación).
- **Pasos:**
  1. Técnico → V-08a filtra "Mis asignadas" o busca → selecciona → V-08c.
  2. Registra/actualiza diagnóstico (RF-16) + agrega/actualiza tareas.
  3. Cambia estado (RF-17: Recibido/En reparación/Listo — catálogo
     **[Pendiente]** Sección 6.5 n.º 4) → [Guardar].
  4. Sistema valida (transición y cierre sin diagnóstico **[Pendiente]**
     CU-08 E2) → V-08c actualizado.
  5. Desde V-08c: [Cobrar] → FL-07; [Registrar salida] → FL-06 (asociada).
- **Alternos:** A1 solo consulta (Recep/Admin/Técnico): V-08a → V-08c sin editar.
  A2 actualización incremental en varias sesiones.
- **Errores:** E1 orden inexistente → lo indica. E2 transición inválida →
  valida e informa (regla pendiente, no inventada). E3 sin permiso → solo lectura.
- **Fin:** orden con diagnóstico/tareas/estado actualizados y consultable.

## FL-06 — Registrar movimiento y controlar stock

- **Primario:** Encargado de inventario. **Secundario:** Admin (◐ lectura).
- **Refs:** RF-19–RF-23 / CU-09 (catálogo), CU-10 (movimientos) / Esc-5 (salida).
- **Inicio:** V-09a o V-08c (salida asociada). **Precondición:** producto existe.
- **Pasos (salida asociada, Esc-5):**
  1. Busca producto → [Registrar salida] → V-09c (orden precargada si vino de V-08c).
  2. Ingresa cantidad (y orden cuando aplique) → [Confirmar].
  3. Sistema valida (cantidad > 0, stock suficiente — CU-10 E1/E2) →
     descuenta automáticamente (RF-22, R1) → registra movimiento.
  4. Si `stock ≤ stockMinimo` → muestra V-09d "Aviso de stock bajo" (RF-23, R3)
     e insignia en V-09a y V-02. Entrada: análogo pero suma (sin orden).
- **Alternos:** A1 salida general vs asociada a orden. A2 entrada por compra/ajuste.
- **Errores:** E1 cantidad ≤ 0 → rechaza. E2 stock insuficiente → no descuenta,
  informa disponible. E3 producto inexistente/desactivado → no registra.
- **Fin:** stock actualizado; aviso emitido cuando aplica.
- **Nota CU-09:** crear/editar producto (V-09a → V-09b, RF-19, stock inicial y
  mínimo) es paso previo independiente, sin escenario propio (matriz Sección C).

## FL-07 — Registrar cobro y generar factura interna

- **Primario:** Encargado administrativo. **Secundario:** Admin (◐ lectura).
- **Refs:** RF-29/RF-30 (CU-11) + RF-33 (CU-13 extend) / Esc-6.
- **Inicio:** V-08c → [Cobrar]. **Precondición:** orden con total definido.
- **Pasos:**
  1. → V-10a: muestra total + saldo pendiente (`total − suma(pagos)`, R4)
     → ingresa monto + método → [Confirmar pago].
  2. Sistema valida (monto > 0, método elegido; sobrepago **[Pendiente]**
     CU-11 E1 — propuesta: rechazar monto > saldo e informar) →
     registra pago, recalcula saldo → "Pago registrado. Saldo: …".
  3. **[Opcional]** [Generar factura] → V-10c: verifica datos → genera con
     consecutivo único → muestra factura (CU-13). Sin cobro previo → bloquea
     (CU-13 E1) con enlace a cobros.
- **Alternos:** A1 pago parcial (saldo restante pendiente) / A2 pago total
  (saldo cero). Factura: A1 consulta/reimpresión sin duplicar.
- **Errores:** E1 sobrepago (pendiente, ver arriba). E2 orden sin total/inexistente
  → no registra. E3 sin método → pide completarlo.
- **Fin:** pago registrado, saldo actualizado; factura asociada cuando se genera.
  Fuera de alcance: bancos y facturación gubernamental (Sección 1.5).

## FL-08 — Gestionar citas

- **Primario:** Recepcionista. **Secundario:** Admin.
- **Refs:** RF-26–RF-28 / CU-06 (sin escenario dedicado — matriz Sección C).
- **Inicio:** V-07a Agenda. **Precondición:** cliente/vehículo (+servicio opcional) existen.
- **Pasos:**
  1. → V-07a consulta agenda del día/filtros (RF-28).
  2. [Agendar] → V-07b: cliente + vehículo + servicio (opcional **[Pendiente]**
     Sección 7.8 n.º 7) + fecha/hora → [Guardar].
  3. Sistema valida (futura, sin traslape — regla **[Pendiente]** CU-06 E1) →
     confirma → V-07a actualizada.
  4. Editar/reprogramar o [Cancelar] (con confirmación, RF-27) → agenda actualizada.
  5. Desde cita: [Crear orden] → FL-04 (precarga).
- **Errores:** E1 traslape/fecha pasada → rechaza e indica. E2 inexistentes →
  no agenda. E3 cancelar atendida/cancelada → advierte, no duplica.
- **Fin:** cita agendada/modificada/cancelada; agenda coherente.

## FL-09 — Dashboard y reportes (seguimiento gerencial)

- **Actores:** Admin (dashboard + reportes); Admvo (reportes). **Solo lectura.**
- **Refs:** RF-34–RF-36 (CU-14) + RF-37/RF-38 (CU-15) / Esc-7.
- **Inicio:** V-02 (Admin) o V-11a. **Precondición:** sesión con permiso.
- **Pasos dashboard (Esc-7):**
  1. Admin → V-02: ve trabajos pendientes, citas del día, poco stock y totales.
  2. Clic en indicador → drill-down a su módulo (CU-15 A1).
  3. Sin datos → "cero / sin registros" (CU-15 E1); indicador que falla →
     lo señala sin ocultar los demás (E2).
- **Pasos reportes (CU-14):**
  1. → V-11a elige tipo (reparaciones/inventario/financiero) + filtros/fecha →
     [Generar].
  2. Sistema valida parámetros (E1) → V-11b muestra reporte.
  3. Sin datos → "Sin datos para estos filtros. [Ajustar filtros]" (E2).
  4. Exportación (PDF/CSV) **[Pendiente]** Sección 6.5 n.º 10: no se promete; solo ver.
- **Fin:** visión general obtenida; reporte visible con criterios aplicados.

## Flujos secundarios (cubiertos sin ficha extendida)

- **CU-02 Gestionar usuarios y roles (V-03, RF-01/03/04):** Admin → V-03a →
  V-03b (crear/editar + rol) → valida (correo único, rol válido) → confirma.
  Sin escenario (matriz Sección C). Incluido en wireframes WF-12 y prototipo.
- **CU-05 Catálogo de servicios (V-06, RF-24/25):** Admin → V-06a → V-06b
  (nombre + descripción + precio) → valida (precio > 0) → disponible para citas/órdenes.
  Responsable **[Pendiente P-02]**. Sin escenario. WF-12 + prototipo.
- **CU-09 Gestionar repuestos (V-09a/b, RF-19):** Inventario → V-09a → V-09b
  (stock + mínimo) → valida → disponible para movimientos. Sin escenario.
- **CU-12 Ingresos y gastos (V-10b, RF-31/32):** Admvo → V-10b elige tipo →
  concepto+monto+fecha → valida → disponible para reportes/dashboard.
  Sin escenario. WF-10 (pestaña) + prototipo.

## Matriz flujo → páginas → roles → respaldo

| Flujo | Páginas V-xx | Primario (●) / secundarios (◐) | RF / CU / Esc |
|---|---|---|---|
| FL-01 | V-01 → V-02 / inicio rol | Todos ● | RF-02 / CU-01 / Esc-1,4,7 (pasos) |
| FL-02 | V-04a → V-04b → V-04c | Recep ●, Admin ◐ | RF-05–08 / CU-03 / Esc-1 |
| FL-03 | V-04c/V-05a → V-05b → V-05c | Recep ●, Admin ◐ | RF-09–12 / CU-04 / Esc-2 |
| FL-04 | V-05c/V-07a/V-08a → V-08b → V-08c | Recep ● | RF-13–15 / CU-07 / Esc-3 |
| FL-05 | V-08a → V-08c (+V-10a/V-09c salidas) | Tec ●, Recep/Admin ◐ | RF-16–18 / CU-08 / Esc-4 |
| FL-06 | V-09a/V-08c → V-09c → V-09d | Inventario ●, Admin ◐ | RF-19–23 / CU-09,10 / Esc-5 |
| FL-07 | V-08c → V-10a → V-10c | Admvo ●, Admin ◐ | RF-29–30,33 / CU-11,13 / Esc-6 |
| FL-08 | V-07a ↔ V-07b → (V-08b) | Recep ● | RF-26–28 / CU-06 / — |
| FL-09 | V-02 (+drill-down), V-11a → V-11b | Admin ●, Admvo ● (reportes) | RF-34–38 / CU-14,15 / Esc-7 |
